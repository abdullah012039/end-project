// src/hooks/useMovieInfo.js

import { useState, useEffect } from 'react';
import { getMovieTrailer, getMovieDetails } from '../../services/tmdbApi';

const useMovieInfo = (id) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const trailer = await getMovieTrailer(id);
        const details = await getMovieDetails(id);
        setTrailerUrl(trailer);
        setMovieDetails(details);
      } catch (error) {
        console.error('Failed to fetch movie data:', error);
        setError('Failed to load movie data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  return { trailerUrl, movieDetails, loading, error };
};

export default useMovieInfo;
