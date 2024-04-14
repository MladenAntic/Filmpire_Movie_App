import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  useMediaQuery,
  IconButton,
  Button,
  Avatar,
  Drawer,
} from "@mui/material";
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { Sidebar, Search } from ".";
import { fetchToken, createSessionId, moviesApi } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../features/auth";
import { ColorModeContext } from "../utils/ToggleColorMode";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );

          dispatch(setUser(userData));
        } else {
          const sessionToken = await createSessionId();

          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionToken}`
          );

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="h-[80px] flex justify-between ml-[240px] max-sm:ml-0 max-sm:flex-wrap">
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className="mr-10 sm:hidden"
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className="hover:text-white!"
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      <div>
        <nav className="sm:w-[240px] flex-shrink-0">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className="w-[240px]"
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer className="w-[240px]" variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
