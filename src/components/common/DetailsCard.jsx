import React, { useState, useEffect } from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from '../../styles/components/DetailsCard.module.css'; // Import the CSS module
import WatchListIcon from './watchlisticon';
import { useNavigate } from 'react-router-dom';
const DetailsCard = ({ id, poster, title, releaseDate, rating, overview }) => {
  const [animatedRating, setAnimatedRating] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let start = 0;
    const end = rating * 10;
    const duration = 1000; // duration of the animation in ms
    const increment = end / (duration / 10); // increment value

    const animate = () => {
      start += increment;
      if (start < end) {
        setAnimatedRating(start);
        setTimeout(animate, 10);
      } else {
        setAnimatedRating(end);
      }
    };

    animate();
  }, [rating]);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.poster}>
          {poster && (
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              alt={title}
              className={styles.posterImage}
            />
          )}
          <CircularProgressbar
            value={animatedRating}
            text={`${(animatedRating / 10).toFixed(1)}`}
            className={styles.ratingCircle}
          />
          <WatchListIcon movie={releaseDate} />
        </div>
        <div className={styles.info}>
          <h1>{title}({releaseDate.split('-')[0]})</h1>
          {!overview && <p className={styles.details} onClick={() => navigate(`/movie/${id}`)}>{">"}</p>}

          {overview && <p><strong>Plot:</strong> {overview}</p>}
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;