/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Movie } from ".";

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid
      container
      className="flex flex-wrap justify-between overflow-auto max-sm:justify-center"
    >
      {movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
        <Movie key={index} movie={movie} i={index} />
      ))}
    </Grid>
  );
};

export default MovieList;
