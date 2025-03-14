import React, {useEffect, useState} from "react";
import "./Home.scss";
import { Show } from '../interfaces/show.ts';

const API_URL = "https://api.themoviedb.org/3/tv/popular";

const Home: React.FC = () => {

    const [page] = useState(1);
    const [language] = useState("en-US");
    const [results, setResults] = useState<Show[]>([]);

    useEffect(() => {
        fetch(`${API_URL}?language=${language}&page=${page}&api_key=c6aeee577586ba38e487b74dfede5deb`)
            .then((res) => res.json())
            .then((data) => {
                setResults(data.results);
            })
            .catch((error) => console.error("Error al cargar las series:", error));
    }, []);

    return (
        <div className="lista-series">

            {results.length !== 0 ? (
                results.map((show) => (
                    <div className="serie" key={show.id}>
                        <h2>{show.name}</h2>
                        <p>{show.poster_path}</p>
                        <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
                    </div>
                ))

            ):(
                <p>No hay resultados de series</p>
            )}
        </div>
    );
};

export default Home;