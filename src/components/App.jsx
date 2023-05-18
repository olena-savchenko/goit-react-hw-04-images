import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from 'service/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { StyledApp } from './App.styled';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { StyledLoader } from './Loader/Loader.styled';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// глобальні змінні для попереджень
const WARNING_MSG = 'Sorry, there are no images matching your search query';
const ERROR_MSG = 'Something was wrong, please try again!';
const INFO_MSG =
  'You just entered this search name. Click the "LoadMore" button below';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  

 
  useEffect(() => {
    // початкове значення searchQuery: '', useEffect перший раз при монтуванні компонента здійснює запит з порожнім рядком
    // забороняємо це перевіркою на не пустий рядок.
    if (!searchQuery) {
      return;
    }

    async function getData() {
      try {
        setLoading(true); //для завантаження лоадера

        // запит на pixabay-api
        const data = await getImages(searchQuery, page);
        // масив з об'єктами картинок
        const images = data.hits;

        // якщо запит повернув порожній масив(нічого не знайдено), виводимо повідомлення
        if (images.length === 0) {
          return toast.info(WARNING_MSG);
        }

        // якщо перша сторінка, перезаписуємо масив картинок, якщо не перша, додаємо до попередніх
        page === 1
          ? setImages(images)
          : setImages(prevState => [...prevState, ...images]);

        setTotal(data.total);
      } catch (error) {
        toast.error(ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [searchQuery, page]);


  // передаємо значення пошукового запиту при сабміті форми з класу Searchbar
  const handleSearch = searchName => {
    // якщо пошукове слово нового і попереднього запиту співпадають, виходимо повідомлення
    if (searchName === searchQuery) {
     return toast.info(INFO_MSG);
    }

    setSearchQuery(searchName);
    setPage(1);
  };


  // при onClick LoadMoreButton блільшуємо сторінку + 1 
   const onClickLoadMore = () => {
     setPage(prevState => prevState + 1);
   };


  // міняє значення showModal в state на протилежне
  const toggleModal = (largeImageURL) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  // константа для перевірки чи показувати кнопку LoadMore
  const isLoadMore = total / 12 > page;

  return (
    <StyledApp>
      {/* serchForm */}
      <Searchbar handleSearch={handleSearch} />

      {/* Контейнер для повідомлень про помилку запиту */}
      <ToastContainer autoClose={3000} transition={Flip} position="right" />

      {/* Loader */}
      {loading && (
        <StyledLoader>
          <Loader />
        </StyledLoader>
      )}

      {/* ImageGallery */}
      <ImageGallery images={images} toggleModal={toggleModal} />

      {/* LoadMore button */}
      {isLoadMore && (
        <Button onClickLoadMore={onClickLoadMore}>load more</Button>
      )}

      {/* рендер модалки по умові */}
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {<img src={largeImageURL} alt={searchQuery} loading="lazy" />}
        </Modal>
      )}
    </StyledApp>
  );
};

