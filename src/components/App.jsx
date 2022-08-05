import { Searchbar } from "./Searchbar/Searchbar";
import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { AppBox } from "./App-styled";
import * as API from '../API/API';
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import Notiflix from "notiflix";


export class App extends Component { 
  state = {
    isLoading: false,
    page: 1,
    data: [],
    total: 0,
    pages: 0,
    error: '',
    query: '',
    showLargePic: false,
    picData: {},
  };

  async componentDidUpdate(prevProps, prevState) { 
    const { query, page } = this.state; 
    const { query: prevQuery, page: prevPage } = prevState; 

    if (query !== prevQuery || (page !== prevPage && page !== 1)) { 
      API.params.page = query !== prevQuery ? 1 : page;
      API.params.q = query;
      try {
        this.setState({ isLoading: true });
        const data = await API.getData(API.params);
        const { total, hits } = data;

        const properStructHits = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
              id,
              largeImageURL,
              webformatURL,
              tags,
            }))

        if (query !== prevQuery) {
          this.setState({
            data: [...properStructHits],
            page: API.params.page,
            total: total,
            pages: Math.ceil(total / API.params.per_page),
            isLoading: false,
          });
        } else {
          this.setState(p => ({
            data: [
              ...p.data,
              ...properStructHits,
            ],
            page: API.params.page,
            isLoading: false,
          }));
        }
        if (total === 0) {
        return Notiflix.Notify.failure('Sorry, we cant find anything for you')
        };
      } 
      catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
        Notiflix.Notify.failure(`Sorry, try again - ${error.message} `);
      }
    }
  }

  setQuery = value => {
    if (value.trim() !== '') {
    this.setState({ query: value });
  }; 
  this.setState({ status: 'rejected', items: [] });
;}

  toggleLargeMode = picData => {
    this.setState(({ showLargePic }) => ({
      showLargePic: !showLargePic,
      picData,
    }));
  };

  handleLoadMore = () => {
    this.setState(p => ({ page: p.page + 1 }));
  };

  render() {
    const { data, isLoading, page, pages, showLargePic, picData } = this.state;
  
      return (
        <AppBox>
        <Searchbar onSubmit={this.setQuery} />
        {data.length > 0 && (
          <ImageGallery data={data} toggleLargeMode={this.toggleLargeMode} />
        )}
        {isLoading && <Loader />}
        {data.length > 0 && page < pages && (
          <Button type="button" onClick={this.handleLoadMore}>
            Load more
          </Button>
        )}
        {showLargePic && (
          <Modal onClose={this.toggleLargeMode}>
            <img alt={picData.alt} src={picData.url} />
          </Modal>
        )}
      </AppBox>
    );
  }
}
