import { useState, useEffect } from 'react';
import { SearchBar} from "./SearchBar/SearchBar";
import { AppBox } from "./App.styled";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { fetchImages } from "API/API";
import Notiflix from 'notiflix';


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      return;         
    }
    
    async function getImages() {
      try{
        const foundImages = await fetchImages(query, page);
        const imageMapper = imgList => {
          return imgList.map(({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, alt: tags };
          });
        };
        setImages(prevImg => [...prevImg, ...imageMapper(foundImages.hits)]);   
        if (foundImages.total === 0) {
          Notiflix.Notify.failure(`We cant find anything for you.`)
        }

      } catch (error) {
        Notiflix.Notify.failure(`Sorry, try again - ${error.message} `);
        setIsLoading(false);
      } 
      
    }
    getImages();
    
  }, [query, page]);




  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const toggleLargeMode = largeImg => {
    setLargeImg(largeImg);
  };

    return (
      <AppBox>
        <SearchBar onSubmit={onChangeQuery} />
        {isLoading ? <Loader /> : null}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            toggleLargeMode={toggleLargeMode}
            />
        )}
        {!isLoading && images.length / page === 12 && <Button onClick={loadMore}/>}
        {largeImg && (
        <Modal largeImg={largeImg.url} alt={query} onClose={toggleLargeMode} />
      )}
      </AppBox>
    );

}  