import React, {useEffect} from "react";
import "./InfoShow.scss";
import { Show } from '../interfaces/show.ts';
import {useLocation} from "react-router-dom";

const InfoShow: React.FC = () => {
    const location = useLocation();
    const { show } = location.state as Show;

    const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formattedDate = new Date(show.first_air_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="info-show-container">
            <div className="backdrop" style={{ backgroundImage: `url(${backdropUrl})` }}>
                <img src={posterUrl} alt={show.name}/>
            </div>

            <div className="content">
                <h1>{show.name}</h1>
                <p>
                    <strong>Overview: </strong>
                    {show.overview}
                </p>
                <div className="columns-container">
                    <div className="left-column">
                        <p>
                            <strong>First air date: </strong>
                            {formattedDate}
                        </p>
                        <p>
                            <strong>Genre ids: </strong>
                            {show.genre_ids.join(', ')}
                        </p>
                        <p>
                            <strong>Votes: </strong>
                            {show.vote_average} ({show.vote_count} votes)
                        </p>
                    </div>
                    <div className="right-column">
                        <p>
                            <strong>Origin country: </strong>
                            {show.origin_country.join(', ')}
                        </p>
                        <p>
                            <strong>Origin language: </strong>
                            {show.original_language}
                        </p>
                        <p>
                            <strong>Popularity: </strong>
                            {show.popularity}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoShow;