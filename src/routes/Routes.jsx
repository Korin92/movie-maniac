/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React, { Routes, Route, useState } from 'react-router-dom'

// Pages
import Home from '../pages/home/component'
import NowPlayingMoviesPage from '../pages/now-playing-movies/component'
import ProfilePage from '../pages/profile/component'
import DetailsPage from '../pages/details/component'
import TopRatedPage from '../pages/top-rated/component'

export default function routes(props) {
  const {
    user, setReloadApp, searchText,
  } = props

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} searchText={searchText} setReloadApp={setReloadApp} />} />
        <Route path="/now-playing-movies" element={<NowPlayingMoviesPage user={user} searchText={searchText} />} />
        <Route path="/profile" element={<ProfilePage user={user} setReloadApp={setReloadApp} searchText={searchText} />} />
        <Route path="/details/:movieId" element={<DetailsPage user={user} searchText={searchText} />} />
        <Route path="/top-rated" element={<TopRatedPage user={user} searchText={searchText} />} />
      </Routes>
    </div>
  )
}
