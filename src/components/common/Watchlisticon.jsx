import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regular } from '@fortawesome/free-regular-svg-icons';
import useWatchList from '../../features/hooks/useWatchlist';
import Modal from './Modal';
import styles from '../../styles/components/WatchListIcon.module.css';

function WatchListIcon({ movie }) {
    const { addItem, watchList, deleteItem, markDone } = useWatchList();
    const [isOnWatchList, setIsOnWatchList] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingMovie, setPendingMovie] = useState(null);

    useEffect(() => {
        setIsOnWatchList(watchList.some((item) => item.items.some((i) => i.id === movie.id)));
    }, [watchList, movie.id]);

    const handleWatchlist = (event, movie) => {
        event.stopPropagation();
        if (isOnWatchList) {
            deleteItem(movie.id);
        } else {
            setPendingMovie({ ...movie, done: false });
            setIsModalOpen(true);
        }
    };

    const handleConfirmAdd = (watchlistId) => {
        if (pendingMovie) {
            // Find the selected watchlist
            const watchlist = watchList.find((list) => list.id == watchlistId);
            if (watchlist) {
                // Add the movie to the selected watchlist's items

                addItem({
                    ...watchlist,
                    items: [...watchlist.items, pendingMovie],
                });
            }
            setPendingMovie(null);
            setIsModalOpen(false);
        }
    };

    const handleCloseModal = () => {
        setPendingMovie(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={styles.watchlisticon} onClick={(event) => handleWatchlist(event, movie)}>
                <FontAwesomeIcon
                    icon={isOnWatchList ? solid : regular}
                    className={styles.bookmarkIcon}
                />
                <FontAwesomeIcon icon={solid} className={styles.solidbookmarkIcon} />
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAdd}
                message={`Are you sure you want to add "${pendingMovie?.title}" to your watchlist?`}
            />
        </>
    );
}

export default WatchListIcon;
