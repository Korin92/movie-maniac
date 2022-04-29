import React from "react";
import { Routes, Route } from "react-router-dom";


//Pages
import Home from "../pages/home/component";
import NowPlayingMoviesPage from "../pages/now-playing-movies/component";
import ProfilePage from "../pages/profile/component";


export default function routes() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/now-playing-movies" element={<NowPlayingMoviesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
