/* eslint-disable react/prop-types */
import { Typography, Box } from "@mui/material";
import { Movie } from ".";

const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box className="flex flex-wrap container">
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;
