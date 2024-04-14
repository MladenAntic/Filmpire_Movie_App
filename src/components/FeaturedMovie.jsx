/* eslint-disable react/prop-types */
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className="mb-[20px] flex justify-center h-[490px] mx-[2em] max-sm:mx-0"
    >
      <Card className="w-full flex justify-end flex-col relative">
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title ? movie.title : movie.name}
          className="absolute top-0 right-0 h-full w-full bg-[rgba(0,0,0,0.5)] bg-blend-darken"
        />
        <Box padding="20px">
          <CardContent className="text-white w-[40%] max-sm:w-full relative bg-transparent">
            <Typography variant="h5" gutterBottom>
              {movie.title ? movie.title : movie.name}
            </Typography>
            <Typography variant="body2">
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
