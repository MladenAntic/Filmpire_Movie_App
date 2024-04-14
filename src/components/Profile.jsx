import { useSelector } from "react-redux";
import { userSelector } from "../features/auth";
import { Box, Typography, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../services/TMDB";
import { RatedCards } from ".";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

const Profile = () => {
  const { user } = useSelector(userSelector);
  const theme = useTheme();

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Box
      className={`${
        theme.palette.mode === "dark" ? "bg-black" : "bg-white"
      } pt-[2em] pl-[2em]`}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom color="textPrimary">
          My Profile
        </Typography>
        <Button
          color="inherit"
          onClick={logout}
          className={`${theme.palette.mode === "dark" ? "invert" : ""}`}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant="h5" color="textPrimary">
          Add favorites or watchlist some movies to see them here.
        </Typography>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
