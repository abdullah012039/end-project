import React, { useEffect, useState } from 'react';
import { getIncomingMovies } from '../../services/tmdbApi';
import Slider from 'react-slick';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import useWatchList from '../../features/hooks/useWatchlist';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../../styles/components/IncomingMoviesList.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WatchListIcon from '../common/watchlisticon';

function IncomingMoviesList() {
    const { addItem, watchList } = useWatchList();
    const [movies, setLocalMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await getIncomingMovies();
            setLocalMovies(response.results);
        };
        fetchMovies();
    }, []);

    const handelMovieDetails = (movie) => {
        navigate(`/movie/${movie.id}`);
    };



    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 7,  // Number of cards to show at once
        slidesToScroll: 7,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Slider {...sliderSettings}>
                {movies.map(movie => (
                    <Card
                        key={movie.id}
                        className={styles.card}
                        onClick={() => handelMovieDetails(movie)}
                    >
                        <div className={styles.cardMediaContainer}>
                            <CardMedia
                                component="img"
                                className={styles.cardMedia}
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        <WatchListIcon movie={movie} />
                        </div>
                        <CardContent className={styles.movieDetails}>  {/* Hidden by default */}
                            <Typography gutterBottom variant="h6" component="div">
                                <div className={styles.movieTitle}>{movie.title}</div>
                            </Typography>
                            <Typography variant="body2" color="inherit">
                                {movie.overview.length > 20
                                    ? movie.overview.substring(0, 20) + "..."
                                    : movie.overview}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Slider>
        </Box>
    );
}

export default IncomingMoviesList;