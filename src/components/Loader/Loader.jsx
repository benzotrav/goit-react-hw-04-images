import { CgSearchLoading } from '@react-icons/all-files/cg/CgSearchLoading';
import { LoaderContainer } from './Loader-styled';

export const Loader = () => {
  return (
    <LoaderContainer>
      <CgSearchLoading
        color="#1100ff"
        height={100}
        width={100}
        timeout={3000}
        size={300}
      />
    </LoaderContainer>
  );
}