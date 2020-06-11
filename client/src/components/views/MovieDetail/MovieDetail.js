import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import axios from 'axios';
import ReactPlayer from 'react-player';

import Comments from './Comments'
import LikeDislikes from './LikeDislikes';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../GridCards';
import MainImage from '../../views/MainImage';
import MovieInfo from './MovieInfo';
import Favorite from './Favorite';

function MovieDetail(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)

    const [Videos, setVideos] = useState([])
    const [VideosToggle, setVideosToggle] = useState(false)
    const [LoadingForVideos, setLoadingForVideos] = useState(true)
    
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {

        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)
        
        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                if (response.data.success) {
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])


    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const toggleVideoView = () => {
        setVideosToggle(!VideosToggle)
    }

    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setCasts(result.cast)
                    })

                let endpointForVideos = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
                fetch(endpointForVideos)
                    .then(result => result.json())
                    .then(result => {
                        console.log(result)
                        setVideos(result.results)
                    })

                setLoadingForCasts(false)
                setLoadingForVideos(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>


                {/* Movie Info */}
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br />
                {/* Video Player*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button type="primary" onClick={toggleVideoView}>Toggle Videos </Button>
                </div>

                {VideosToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForVideos ? Videos.map((video, index) => (
                                video.key &&
                                <Col lg={6}>
                                    <div style={{ position: 'relative' }}>
                                        <ReactPlayer width={300} height={200} url={`https://www.youtube.com/watch?v=${video.key}`} />
                                    </div>
                                </Col>
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }

                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button type="primary" onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards actor image={cast.profile_path} characterName={cast.characterName} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                }
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes movie movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} movieId={movieId} refreshFunction={updateComment} />

            </div>

        </div>
    )
}

export default MovieDetail