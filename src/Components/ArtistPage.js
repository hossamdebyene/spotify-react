import React from 'react'
import { useLocation } from 'react-router-dom'
import defaultImage from '../Images/defaultImage.jpg'
import {Card} from 'react-bootstrap'

function ArtistPage(props) {
    // for getting getting albums of the artist pushed by artistSearch
    const location = useLocation()

  return (
    <div className='start'>
        <p className="heading">{location.state.artist.name}</p>
        <p className='subheading'>Albums</p>
        <div className="main row" >
            {location.state.artistAlbums.map(albums => (
                <div className="artistCard mb-3 p-0" key={albums.id}>
                    <Card >
                        <Card.Img className="cardimg" variant="top" src={albums.images.length ? albums.images[0].url : defaultImage} />
                        <Card.Body>
                            <Card.Title className="tit">{albums.name}</Card.Title>
                            <Card.Text className='sub'>
                                {albums.artists.map(artist => <span>{artist.name}, </span>)} 
                            </Card.Text>
                            <Card.Text className="last">{albums.release_date}</Card.Text>
                            <Card.Text className="sub">{albums.total_tracks}</Card.Text>
                        </Card.Body>
                        <a className='foot' href={albums.external_urls.spotify} target="_blank" rel="noreferrer"><Card.Footer>Preview on spotify</Card.Footer></a>
                    </Card>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default ArtistPage