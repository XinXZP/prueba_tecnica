import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import "./Home.scss";
import { Show } from '../interfaces/show.ts';

const API_URL = "https://api.themoviedb.org/3/tv/popular";

const Home: React.FC = () => {

    const [page, setPage] = useState(1);
    const [language] = useState("en-US");
    const [results, setResults] = useState<Show[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const fetchSeries = (page: number) => {
        setIsLoading(true);
        fetch(`${API_URL}?language=${language}&page=${page}&api_key=c6aeee577586ba38e487b74dfede5deb`)
            .then((res) => res.json())
            .then((data) => {
                setResults(prevResults => [...prevResults, ...data.results]);
                setTotalPages(data.total_pages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar las series:", error);
                setIsLoading(false);
            });
    };


    useEffect(() => {
        fetchSeries(page);
    }, [page]);


    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight &&
                !isLoading &&
                page < totalPages
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, page, totalPages]);


    return (
        <div className="home-container">
            {results.length !== 0 ? (
                <div className="series-grid">
                    {results.map((show) => (
                        <div className="series" key={show.id}>
                            <Link to={`/show/${show.id}`} state={{show: show}}>
                                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                            </Link>
                        </div>
                    ))}
                </div>
            ):(
                <p>No hay resultados de series</p>
            )}
            {isLoading && <p>Cargando más series...</p>}
        </div>
    );
};

export default Home;