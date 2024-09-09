import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getMovieCredits } from '../../services/tmdbApi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/components/CastSlider.module.css'; // Assuming you're using CSS modules

const CastSlider = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await getMovieCredits(movieId);
        setCast(response.cast);
      } catch (error) {
        console.error('Failed to fetch cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.castSliderContainer}>
      <Slider {...settings}>
        {cast.map((member) => (
          <div key={member.id} className={styles.castCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
              alt={member.name}
              className={styles.castImage}
            />
            <div className={styles.castCardContent}>
              <h6>{member.name}</h6>
              <p>{member.character}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CastSlider;