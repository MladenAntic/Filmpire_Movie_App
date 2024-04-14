import alanBtn from "@alan-ai/alan-sdk-web";
import { useContext, useEffect } from "react";

import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils/";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectGenreOrCategory, searchMovies } from "../features/currentGenreOrCategory";

const useAlanAI = () => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: `${import.meta.env.VITE_ALANAI_API_KEY}`,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith("top")
              ? "top_rated"
              : genreOrCategory;
            navigate("/");
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === "changeMode" && mode) {
          toggleColorMode();
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          window.location.href = "/";
        } else if (command === "search") {
          dispatch(searchMovies(query))
        }
      },
    });
  }, []);
};

export default useAlanAI;
