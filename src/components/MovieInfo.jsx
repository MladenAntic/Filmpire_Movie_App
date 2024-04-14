import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetListQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "../services/TMDB";
import genreIcons from "../assets/genres";
import { useTheme } from "@mui/material/styles";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { MovieList } from ".";
import { useEffect, useState } from "react";
import axios from "axios";
import { userSelector } from "../features/auth";

const MovieInfo = () => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  // eslint-disable-next-line no-unused-vars
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      list: "/recommendations",
      movie_id: id,
    });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  if (isFetching) {
    return (
      <Box className="flex justify-center pt-[2em]">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="flex justify-center pt-[2em]">
        <Link to="/" className="underline">Something went wrong. Go back.</Link>
      </Box>
    );
  }

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  return (
    <Grid
      container
      className={`flex justify-around my-[10px] mx-0 max-sm:flex-col max-sm:flex-wrap ${
        theme.palette.mode === "dark" ? "bg-black" : "bg-white"
      } pt-[2em] pl-[2em]`}
    >
      <Grid item sm={12} lg={4} style={{ marginBottom: "30px" }}>
        <img
          className="rounded-[20px] shadow-3xl w-[80%] image-sm image-md block max-sm:mb-7"
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title ? data?.title : data?.name}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          color="textPrimary"
        >
          {data?.title ? data?.title : data?.name} (
          {data?.release_date.split("-")[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          color="textPrimary"
        >
          {data?.tagline}
        </Typography>

        <Grid
          item
          className="flex justify-around my-[10px] mx-0 max-sm:flex-col max-sm:flex-wrap"
        >
          <Box display="flex" align="center" className="max-sm:justify-center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: "10px" }}
              color="textPrimary"
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>

          <Typography
            variant="h6"
            align="center"
            gutterBottom
            color="textPrimary"
          >
            {data?.runtime}min /{" "}
            {data?.spoken_languages.length > 0
              ? data?.spoken_languages[0].name
              : ""}
          </Typography>
        </Grid>
        <Grid item className="my-[10px] mx-0 flex justify-around flex-wrap">
          {data?.genres.map((genre) => (
            <Link
              key={genre.name}
              className="flex gap-2 justify-center items-center max-sm:py-[0.5rem] max-sm:mx-[1rem]"
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                alt="Genre Icon"
                className={`${
                  theme.palette.mode === "dark" ? "dark" : "invert-1"
                }`}
                height={30}
                width={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>

        <Typography
          variant="h5"
          gutterBottom
          style={{ marginBottom: "10px" }}
          color="textPrimary"
        >
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }} color="textPrimary">
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom color="textPrimary">
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (actor, i) =>
                  actor.profile_path && (
                    <Grid
                      key={i}
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${actor.id}`}
                    >
                      <img
                        className="w-full max-w-[7em] h-[8em] object-cover rounded-[10px]"
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.name}
                      />
                      <Typography color="textPrimary">{actor?.name}</Typography>
                      <Typography color="textSecondary">
                        {actor.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: "2rem" }}>
          <div className="flex justify-between max-sm:flex-col">
            <Grid item xs={12} sm={6} className="">
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  href="#"
                  endIcon={<Theaters />}
                  onClick={() => setOpen(true)}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6} className="">
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  sx={{ borderColor: "primary.main" }}
                  component={Link}
                  to="/"
                  endIcon={<ArrowBack />}
                >
                  <Typography color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box marginTop="5rem" width="100%">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          color="textPrimary"
        >
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found...</Box>
        )}
      </Box>

      <Modal
        closeAfterTransition
        className="flex justify-center items-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className="w-1/2 h-1/2 max-sm:w-[90%] max-sm:h-[90%]"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInfo;
