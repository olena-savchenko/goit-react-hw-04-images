import { Component } from 'react';
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

const WARNING_MSG = 'Sorry, there are no images matching your search query';
const ERROR_MSG = 'Something was wrong, please try again!';
const INFO_MSG =
  'You just entered this search name. Click the "LoadMore" button below';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    total: 0,
    loading: false, //флаг для лоадера
    showModal: false, // флаг показати / сховати модалку
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    // якщо змінився пошуковий запит, або номер сторінки
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ loading: true }); // для завантаження лоадера

        // запит на pixabay-api
        const data = await getImages(searchQuery, page);
        const images = data.hits;

        if (images.length === 0) {
          return toast.info(WARNING_MSG);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page,
          total: data.total,
        }));
      } catch (error) {
        toast.error(ERROR_MSG);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  // передаємо значення пошукового запиту при сабміті форми з класу Searchbar в state App,
  // якщо попередній і новий запит не співпадають,
  // для кожного нового запиту очищується масив картинок, page=1

  handleSearch = searchQuery => {
    this.setState(prevState => {
      // if (prevState.searchQuery !== searchQuery) {
      //   return { searchQuery, images: [], page: 1, total: 0, loading: false };
      // } else {
      //   toast.info(INFO_MSG);
      // }

      if (prevState.searchQuery === searchQuery) {
        toast.info(INFO_MSG);
        console.log('Повторний ввод пошукового слова');
        return;
      }

      return { searchQuery, images: [], page: 1, total: 0, loading: false };
    });
  };

  // міняє значення showModal в state на протилежне
  toggleModal = (largeImageURL, alt) => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageURL,
      alt,
    }));
  };

  // викликається при натисканні кнопки "Load more".
  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { showModal, images, largeImageURL, alt, loading, total, page } =
      this.state;
    const isLoadMore = total / 12 > page;

    return (
      <StyledApp>
        {/* serchForm */}
        <Searchbar handleSearch={this.handleSearch} />

        {/* Контейнер для повідомлень про помилку запиту */}
        <ToastContainer autoClose={3000} transition={Flip} position="right" />

        {/* Loader */}
        {loading && (
          <StyledLoader>
            <Loader />
          </StyledLoader>
        )}

        {/* ImageGallery */}
        <ImageGallery images={images} toggleModal={this.toggleModal} />

        {/* LoadMore button */}
        {isLoadMore && (
          <Button onClickLoadMore={this.onClickLoadMore}>load more</Button>
        )}

        {/* рендер модалки по умові */}
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            {<img src={largeImageURL} alt={alt} loading="lazy" />}
          </Modal>
        )}
      </StyledApp>
    );
  }
}
