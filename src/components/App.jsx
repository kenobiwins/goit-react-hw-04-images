import { useEffect, useState } from 'react';
import { PER_PAGE, getImages } from 'service/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { PER_PAGE as paginationLimit } from 'service/API';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { STATUS } from 'constants/status.constants';

export const App = () => {
  const [q, setQ] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(STATUS.idle);
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // useEffect(() => {
  //   if (isFirstLoad) {
  //     return;
  //   }
  // }, [isFirstLoad]);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    setStatus(STATUS.pending);
    getImages({ page, q })
      .then(({ totalHits, hits }) => {
        if (hits.length === 0) {
          throw new Error('We have nothing for this query');
        }
        if (page > 1) {
          const totalPages = Math.ceil(totalHits / PER_PAGE);

          setImages(prevImages => {
            return [
              ...prevImages,
              ...hits.map(({ id, webformatURL, largeImageURL, tags }) => {
                return { id, webformatURL, largeImageURL, tags };
              }),
            ];
          });
          setStatus(STATUS.resolved);
          if (totalPages === page) {
            throw new Error('You loaded all images');
          }
          return;
        }

        setImages(
          hits.map(({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          })
        );
        setStatus(STATUS.resolved);
        return;
      })
      .catch(error => {
        console.log(error);
        setStatus(STATUS.rejected);
      });
    return;
  }, [q, page, isFirstLoad]);

  const handleSubmit = async searchQuery => {
    if (q === searchQuery) {
      return;
    }
    setIsFirstLoad(false);
    setQ(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setStatus(STATUS.pending);
    setPage(page + 1);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Searchbar onSubmit={handleSubmit} />

      {!isFirstLoad && images.length > 0 && <ImageGallery images={images} />}

      {images.length === 0 && status === STATUS.rejected && (
        <div>
          <img
            src="https://media.tenor.com/lndtLWwXZC0AAAAj/%D1%87%D1%82%D0%BE.gif"
            alt="what?"
          />
        </div>
      )}

      {!isFirstLoad &&
        images.length >= paginationLimit &&
        status === STATUS.resolved && <Button loadMore={handleLoadMore} />}

      {!isFirstLoad && status === STATUS.pending && <Loader />}
    </>
  );
};
