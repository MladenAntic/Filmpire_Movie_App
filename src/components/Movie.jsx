/* eslint-disable react/prop-types */
import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="p-[10px]">
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          className="flex items-center font-bold flex-col hover:cursor-pointer"
          to={`/movie/${movie.id}`}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.movienewz.com/img/films/poster-holder.jpg"
            }
            alt={movie.title}
            className="rounded-[20px] h-[300px] mb-[10px] hover:transform hover:scale-105 transition duration-300 ease-in-out"
          />
          <Typography
            variant="h5"
            className="overflow-ellipsis w-[230px] whitespace-nowrap overflow-hidden mt-[10px] mb-0 text-center"
            color="textPrimary"
          >
            {movie.title ? movie.title : movie.name}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
