import { Typography, Button } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        onClick={handlePrev}
        className="my-[30px] mx-[2px]"
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className="my-0 mx-[20px]" color="textPrimary">
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        className="my-[30px] mx-[2px]"
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
