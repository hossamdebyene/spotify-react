import React from 'react'
import '../CSS/HomePage.css'
import defaultImage from '../Images/defaultImage.jpg'
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, } from "react-redux";
import axios from "axios"
import { AiOutlineSearch } from 'react-icons/ai'
import { Card } from 'react-bootstrap'
import { Rate } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { tokening, artist } from "../actions"





function HomePage() {
    //for getting states from redux artist and token
    const tokenss = useSelector((state) => state.tokening)
    const Artistss = useSelector((state) => state.artist)

    // to access url parameters location
    const location = useLocation()
    // to update redux state
    const dispatch = useDispatch()
    // to navigate between pages in react
    const navigate = useNavigate()

    // to track the value of state
    const [searchKey, setSearchKey] = useState( Artistss.searchKey )
    const [artists, setArtists] = useState(Artistss.artists)


    // to rerender function after authentication
    useEffect(() => {
    const hash = location.hash
    let token = tokenss

    if (!tokenss && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        dispatch(tokening(token))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenss])


    // to get data of the searched Artists
    const searchArtists = useCallback(async () => {
        // request a get api to spotify
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${tokenss}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
        //setting artists with the response of the get api
        setArtists(data.artists.items)
    }, [searchKey, tokenss])
    

    //requesting get api with artist id for getting artist albums
    //updating redux artist state with the searchkey and artists to retrieve when going back
    //redirecting to artistalbums with state of artist and artist albums to retrieve them in artistpage component
    const artistAlbum = async (e, artists) => {
        e.preventDefault()

        const { data } = await axios.get(`https://api.spotify.com/v1/artists/${artists.id}/albums`, {
            headers: {
                Authorization: `Bearer ${tokenss}`
            },
        })
        dispatch(artist({ artists:artists, searchKey: searchKey}))
        navigate('/ArtistAlbums', {state: {artistAlbums:data.items, artist:artists }})

    }

    //to handle key when typing in order to implement search as type function
    const keyUp = useCallback(() => {
        if(searchKey === ""){
            setArtists([])
        }
        else{
            searchArtists ()
        }
    }, [searchArtists, searchKey])
    

    // to rerender every keyup method to check with every change in searchkey or artists or keyUp with timeout 
    //timeout is to render the function after 1s of untyping
    useEffect(() => {
        const timeoutId = setTimeout(() => keyUp(), 1000);
        return () => clearTimeout(timeoutId);
      }, [searchKey, artists, keyUp]);

    return (
            <div>
                <form onSubmit={searchArtists} className="middle">
                    <input className="type" value={searchKey} autoFocus placeholder='Search for an artist ...' type="text" onKeyUp={(e) => keyUp()} onChange={(e) => setSearchKey(e.target.value)} />
                    <button className='but' type={"submit"}><AiOutlineSearch /></button>
                </form>
                <div className="main row" >
                    {artists.length > 0 ? artists.map(artist => (
                        <div className="artistCard mb-3 p-0" key={artist.id} type="button" onClick={(e) => artistAlbum(e,artist)}>
                            <Card >
                                <Card.Img className="cardimg" variant="top" src={artist.images.length ? artist.images[0].url : defaultImage} />
                                <Card.Body>
                                    <Card.Title className="tit">{artist.name}</Card.Title>
                                    <Card.Text className='sub'>
                                        {(artist.followers.total).toLocaleString("en")} followers
                                    </Card.Text>
                                    <Rate className='stars' disabled defaultValue={(artist.popularity / 100 * 5)} />
                                </Card.Body>
                            </Card>
                        </div>
                    )):null}
                </div>
            </div>
    )
}

export default HomePage