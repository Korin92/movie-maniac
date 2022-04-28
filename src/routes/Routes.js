import React from "react";
import { Routes, Route } from "react-router-dom";


//Pages
import Home from "../components/pages/home/component";
import NowPlayingMoviesPage from "../components/pages/now-playing-movies/component";
import Auth from "../components/pages/auth/component";

export default function routes() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/now-playing-movies" element={<NowPlayingMoviesPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
