import React, { Routes, Route } from 'react-router-dom'

// Pages
import Home from '../pages/home/component'
import NowPlayingMoviesPage from '../pages/now-playing-movies/component'
import ProfilePage from '../pages/profile/component'
import DetailsPage from '../pages/details/component'

export default function routes(props) {
  const { user, setReloadApp } = props

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/now-playing-movies" element={<NowPlayingMoviesPage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} setReloadApp={setReloadApp} />} />
        <Route path="/details/:movieId" element={<DetailsPage user={user} />} />
      </Routes>
    </div>
  )
}
