import React from "react";
import Logo from '../svg/spotify.svg';
import '../CSS/Styles.css'
import { useEffect } from 'react';
import { useDispatch, useSelector, } from "react-redux";
import { tokening, artist } from "../actions"
import { useLocation, useNavigate } from "react-router-dom";


function Login () {

    //Spotify Credentials from spotify app
    const CLIENT_ID = "8c1d66b00a004f9b98cf287ab9cfe3ba"
    const REDIRECT_URI = "http://localhost:3000/ArtistSearch"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    // for accessing url parameters location
    const location = useLocation()
    // for updating redux state
    const dispatch = useDispatch()
    // for getting token state from redux
    const tokenss = useSelector((state) => state.tokening)
    
    
    //for declaring the redux artist state
    dispatch(artist({artists:[], searchKey:""}))

    //to navigate between pages
    const navigate = useNavigate()

    //to rerender on tokenss value change
    useEffect(() => {
    const hash = location.hash
    let token = tokenss

    // getToken()
    if(tokenss){
        navigate('/ArtistSearch')
    }

    if (!tokenss && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        location.hash = ""
        dispatch(tokening(token))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [tokenss])

return(
    <div className='center'>
        <a className='middle' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}><p className='buttonName'>Login</p><img className='logo' src={Logo} alt="Woocomerce" /> </a>
    </div>
)
}
export default Login