import React from "react"
import { useState, useEffect } from "react"
import '../App.css'
import { artistData, albumData } from "../utils"
import { useNavigate } from "react-router-dom"
import { getCookie } from "../common"

const Music = () => {
    const navigate = useNavigate()
    const [searchVal, setSearchVal] = useState("")
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie === false) {
            navigate('/login')
        }
    })
    
    const getAlbumAndArtist = async (event) => {
        event.preventDefault()
        let artistObj = await artistData(searchVal)
        let artists = artistObj.data
        setArtists(artists)
        let albumObj = await albumData(searchVal)
        let albums = albumObj.data
        setAlbums(albums)
        console.log(artistObj)
        console.log(albumObj)
    }

    return (
        <div>
            <form onSubmit={getAlbumAndArtist} className="search">
                <label>Search for album/artist: 
                    <input onChange={(event) => setSearchVal(event.target.value)}></input>
                </label>
                <button type='submit'>Search</button>
            </form>
            <div className="albumResults">
                <ul>
                    {artists.map((artist, index) => {
                       return (
                            <div className="artistName" key={index}>
                                <li>{artist.name}</li>
                            </div>
                       )
                    })}
                </ul>
            </div>
            <div className="artistResults">
                <ul>
                    {albums.map((album, index) => {
                        return (
                            <div className="albumName" key={index}>
                                <li>{album.artist.name}</li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Music