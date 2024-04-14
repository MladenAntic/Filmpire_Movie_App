import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import redLogo from "../assets/red-logo.png";
import blueLogo from "../assets/blue-logo.png";
import { categories } from "../constants";
import { useGetGenresQuery } from "../services/TMDB";
import genreIcons from "../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  useEffect(() => {
    setMobileOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreIdOrCategoryName])

  return (
    <>
      <Link to="/" className="flex justify-center py-[10%] px-0">
        <img
          className="w-[70%]"
          src={theme.palette.mode === "light" ? blueLogo : redLogo}
          alt="Filmpire Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  alt="Genre Icon"
                  className={`${theme.palette.mode === "dark" ? "invert" : ""}`}
                  height={30}
                  width={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    alt="Genre Icon"
                    className={`${
                      theme.palette.mode === "dark" ? "invert" : ""
                    }`}
                    height={30}
                    width={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
