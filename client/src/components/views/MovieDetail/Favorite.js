import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const FavoriteIcon = require('../../../images/Favorite.png');
const NotFavoriteIcon = require('../../../images/NotFavorite.png');

function Favorite(props) {
    const user = useSelector(state => state.user)

    const movieId = props.movieId;
    const userId = props.userId;
    const movieTitle = props.movieInfo.title;
    const movieImage = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [Favorited, setFavorited] = useState(false);
    const variables = {
        movieId: movieId,
        userId: userId,
        movieTitle: movieTitle,
        movieImage: movieImage,
        movieRunTime: movieRunTime
    };

    const onClickFavorite = () => {

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        if (Favorited) {
            //when we are already subscribed 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not subscribed yet

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }

    useEffect(() => {

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.subcribed)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })

    }, [])


    return (
        <>
            <a  onClick={onClickFavorite} > 
            {Favorited ? 
                <img src={FavoriteIcon} alt="Favorite" title="Favorite" /> :
                <img src={NotFavoriteIcon} alt="Not Favorite" title="Not Favorite"/>
                } </a>
        </>
    )
}

export default Favorite