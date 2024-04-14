import { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { useGetMoviesQuery } from "../services/TMDB";
import { MovieList } from ".";

import { Pagination } from ".";
import FeaturedMovie from "./FeaturedMovie";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.only("lg"));

  const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match your search.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) return "An error has occured: " + error.message;

  return (
    <div className={`${theme.palette.mode === "dark" ? "bg-black" : "bg-white"} pt-[2em]`}>
      <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data.total_pages}
      />
    </div>
  );
};

export default Movies;