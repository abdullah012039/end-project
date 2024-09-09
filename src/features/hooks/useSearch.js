// src/hooks/useSearch.js

import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/tmdbApi';

const useSearch = (query, category, currentPage) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query && category) {
      setLoading(true);
      const fetchMovies = async () => {
        try {
          const data = await searchMovies(query, category, currentPage);
          setResults(data.results);
          setTotalPages(data.total_pages);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchMovies();
    }
  }, [query, category, currentPage]);

  return { results, loading, totalPages };
};

export default useSearch;
