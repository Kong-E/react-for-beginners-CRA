import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      <img src={movie.large_cover_image} />
      <h1>{movie.title_long}</h1>
      <div>{movie.rating}</div>
      {movie.genres?.map((genre) => (
        <span key={genre}>{genre} </span>
      ))}
      <div>{movie.description_intro}</div>
    </div>
  );
}
export default Detail;
