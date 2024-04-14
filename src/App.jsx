import { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import "./globals.css";
import { Actors, MovieInfo, Movies, Navbar, Profile } from "./components";
import useAlanAI from "./components/AlanAI";

const App = () => {
  const alanBtnContainer = useRef();

  useAlanAI();

  return (
    <main className="flex h-screen w-full">
      <Navbar />
      <div className="flex-1">
        <div className="h-[70px]" />
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>

      <div ref={alanBtnContainer} />
    </main>
  );
};

export default App;
