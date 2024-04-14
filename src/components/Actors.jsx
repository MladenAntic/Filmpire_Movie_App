import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

import {
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../services/TMDB";

import { MovieList, Pagination } from ".";
import { useState } from "react";

import { useTheme } from "@mui/material/styles";

const Actors = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <div
      className={`${theme.palette.mode === "dark" ? "bg-black" : "bg-white"} px-[2em] pt-[2em]`}
    >
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className="max-w-[90%] rounded-[20px] object-cover shadow-3xl"
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" gutterBottom color="textPrimary">
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom color="textPrimary">
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            align="justify"
            paragraph
            color="textPrimary"
          >
            {data?.biography || "Sorry, no biography available."}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB Profile
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
          color="textPrimary"
        >
          Movies
        </Typography>
        {movies && <MovieList movies={movies} numberOfMovies={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </div>
  );
};

export default Actors;
