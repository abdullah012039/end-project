import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/components/SearchBar.module.css';

function SearchBar() {
    const API_KEY = '1f9419b0c6c524a637ea725cbdd45857';
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('movie'); // Default category
    const navigate = useNavigate();


    const handleSearch = () => {
        if (search) {
            navigate(`/search?query=${search}&category=${category}`);
        } else {
            navigate('/');
        }
    };

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCategory(newCategory);
        if (search.length > 0) {
            navigate(`/search?query=${search}&category=${newCategory}`);
        }
    };

    return (
        <div className={styles.searchBar}>
            <select
                value={category}
                onChange={handleCategoryChange}
                className={styles.categorySelect}
            >
                <option value="movie">Movies</option>
                <option value="person">People</option>
                <option value="tv">TV Shows</option>
                <option value="company">Companies</option>
                <option value="keyword">Keywords</option>
                <option value="collection">Collections</option>
                <option value="network">Networks</option>
            </select>
            <div className={styles.searchWrapper}>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.target.value.length > 0) navigate(`/search?query=${e.target.value}&category=${category}`);
                        else navigate('/');
                    }}
                    placeholder="Search..."
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                {loading && <div className={styles.loading}>Loading...</div>}
            </div>

        </div>
    );
}

export default SearchBar;
