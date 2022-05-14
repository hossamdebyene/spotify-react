import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login"
import ArtistPage from "./Components/ArtistPage"


export default function AppRouter() {

return (
    <Routes>
        <Route index element={<Login />} />
        <Route path="/ArtistSearch" element={<HomePage />} />
        <Route path="/ArtistAlbums" element={<ArtistPage />} />
    </Routes>
    
  );
}