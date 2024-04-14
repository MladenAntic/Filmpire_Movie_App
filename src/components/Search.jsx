import { useState} from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { searchMovies } from "../features/currentGenreOrCategory";

const Search = () => {
  const [query, setQuery] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation()

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovies(query));
    }
  };

  if (location.pathname !== "/") return null

  return (
    <div className="max-sm:flex max-sm:justify-center max-sm:w-full">
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        className={`mb-[10px] ${
          theme.palette.mode === "light" && "text-white invert"
        }`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
