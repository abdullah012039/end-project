import React from 'react';
import { useSwipeable } from 'react-swipeable';
import FeaturedListState from '../../features/hooks/useFeaturedList';
import styles from '../../styles/components/Movies.module.css';
import MovieCard from '../common/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FeaturedMoviesList = ({ setMovies }) => {
  const {
    movies,
    loading,
    error,
    currentIndex,
    movetoLeft,
    movetoRight,
    setShowTrailer,
  } = FeaturedListState(setMovies);

  const handlers = useSwipeable({
    onSwipedLeft: () => movetoRight(),
    onSwipedRight: () => movetoLeft(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const previousIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

  return (
    <div
      {...handlers}
      onMouseEnter={() => setShowTrailer(true)}
      onMouseLeave={() => setShowTrailer(false)}
      className={styles.slider}
    >
      <div className={styles.rows}>
        <>
          <MovieCard
            key={movies[previousIndex].id}
            movie={movies[previousIndex]}
            className={styles.previous}
          />
          <MovieCard
            key={movies[currentIndex].id}
            movie={movies[currentIndex]}
            isHidden={false}
            className={styles.current}
          />
          <MovieCard
            key={movies[nextIndex].id}
            movie={movies[nextIndex]}
            className={styles.next}
          />
        </>
      </div>
      <button onClick={movetoLeft} className={styles.leftButton}><FontAwesomeIcon icon={faChevronLeft} /></button>
      <button onClick={movetoRight} className={styles.rightButton}><FontAwesomeIcon icon={faChevronRight} /></button>
    </div>
  );
};

export default FeaturedMoviesList;