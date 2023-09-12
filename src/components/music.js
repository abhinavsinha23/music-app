import React from "react"
import { useState, useEffect } from "react"
import '../App.css'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../common"
import Modal from 'react-modal'
import { addFavAlbum, addFavArtist, addFavTrack, searchArtists, searchAlbums, searchSongs } from "../utils"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '30%',
        height: '95%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0px'
    },
  };

const Music = ({selectedArtist, setSelectedArtist, selectedAlbum, setSelectedAlbum, selectedSong, setSelectedSong}) => {
    const navigate = useNavigate()
    const [searchVal, setSearchVal] = useState("")
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [songs, setSongs] = useState([])
    const [responseMessage, setResponseMessage] = useState("")
    const [artistModalOpen, setArtistModal] = useState(false);
    const [albumModalOpen, setAlbumModal] = useState(false)
    const [songModalOpen, setSongModal] = useState(false)
    const [token, setToken] = useState("")

    useEffect(() => {
        setArtistModal(false)
        setAlbumModal(false)
        setSongModal(false)
    }, [])

    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie === false) {
            navigate('/login')
        }
    })

    const openArtistModal = (props) => {
        setSelectedArtist(props)
        setArtistModal(true)
        setResponseMessage("")
    }

    const openAlbumModal = (props) => {
        setSelectedAlbum(props)
        setAlbumModal(true)
        setResponseMessage("")
    }

    const openSongModal = (props) => {
        setSelectedSong(props)
        setSongModal(true)
        setResponseMessage("")
    }

    const closeArtistModal = () => {
        setArtistModal(false)
        setResponseMessage("")
    }

    const closeAlbumModal = () => {
        setAlbumModal(false)
        setResponseMessage("")
    }

    const closeSongModal = () => {
        setSongModal(false)
        setResponseMessage("")
    }
    
    const getAlbumArtistSong = async (event) => {
        event.preventDefault()
        try{
            let artistsSearchResults = await searchArtists(searchVal, token)
            setArtists(artistsSearchResults.artists.items)

            let albumsSearchResults = await searchAlbums(searchVal, token)
            setAlbums(albumsSearchResults.albums.items)

            let songsSearchResults = await searchSongs(searchVal, token)
            setSongs(songsSearchResults.tracks.items)
        } catch (error){
            setArtists("error")
        }
    }

    const REACT_APP_CLIENT_ID = "42fd9711eebd4fb5b3490fa50be6c067"
    const REACT_APP_REDIRECT_URI = "http://localhost:3000/music"
    const REACT_APP_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REACT_APP_RESPONSE_TYPE = "token"

    useEffect(() => {
        const hash = window.location.hash
        let tempToken = window.localStorage.getItem("token")
        if (!tempToken && hash) {
            tempToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", tempToken)
        }
        setToken(tempToken)
        
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const addArtist = async (name) => {
        let cookie = getCookie("jwt-token")
        await addFavArtist(cookie, name)
        setResponseMessage("Added Artist")
    }

    const addAlbum = async (name) => {
        let cookie = getCookie("jwt-token")
        await addFavAlbum(cookie, name)
        setResponseMessage("Added Album")
    }

    const addSong = async (name) => {
        let cookie = getCookie("jwt-token")
        await addFavTrack(cookie, name)
        setResponseMessage("Added Song")
    }

    return (
        <div style={{height: '100vh'}}>
            <div className="searchContainer">
            {token ? 
                <form onSubmit={getAlbumArtistSong} className="search">
             
                    <input placeholder="Search Albums/Artists/Songs" onChange={(event) => setSearchVal(event.target.value)}  required className="radioInput" />
           
                    <button  type='submit'>Search</button>
               
                </form> : <p>Login to Spotify to search</p>}
                {!token ?
                <button style={{margin:"0px"}}><a style={{textDecoration:"none", color:"black"}} href={`${REACT_APP_AUTH_ENDPOINT}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=${REACT_APP_RESPONSE_TYPE}`}>Login To Spotify</a></button>
                : <button style={{margin:"3px"}} onClick={logout}>Logout Of Spotify</button>}
            </div>
            <p style={{fontSize:'24px', margin:'0px'}}>{artists === "error" ? "Spotify login expired, please log in again" : ""}</p>
            <p style={{margin:"1vh", fontSize:"12px"}}>(<b>Spotify login will expire after 1 hour</b>)</p>
            <div className="searchResults">
                <div className="results">
                    <h2>Artists</h2>
                    <ul>
                        {artists === "error" ? "" : artists.map((artist, index) => {
                        return (
                                <div className="resultNames" onClick={() => openArtistModal(artist)} key={index}>
                                    <li>{artist.name}</li>
                                </div>
                        )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={artistModalOpen} onRequestClose={closeArtistModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                        <button className="modalBtn" onClick={closeArtistModal}>Back to browse</button>
                        <img src={!selectedArtist.images ? "" : selectedArtist.images[0].url} className="modalImg" alt="artistModalImg" style={{width:'90%'}}/>
                        <h3>{selectedArtist.name}</h3>
                        <a href={!selectedArtist.external_urls ? "" : selectedArtist.external_urls.spotify} rel="noreferrer" target="_blank" style={{color:"white"}}>Open Spotify Page</a>
                        <button className="addArtistBtn" onClick={() => addArtist(selectedArtist.name)}>Add {selectedArtist.name} to Favourites</button>
                        <p>{responseMessage}</p>
                    </Modal>
                </div>
                <div className="results">
                <h2>Albums</h2>
                    <ul>
                        {albums.map((album, index) => {
                            return (
                                <div className="resultNames" key={index} onClick={() => openAlbumModal(album)}>
                                    <li>{album.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={albumModalOpen} onRequestClose={closeAlbumModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button className="modalBtn" onClick={closeAlbumModal}>Back to browse</button>
                    <img src={!selectedAlbum.images ? "" : selectedAlbum.images[0].url} className="modalImg" alt="albumModalImg" style={{width:'90%'}}/>
                    <h3>{selectedAlbum.name}</h3>
                    <a href={!selectedAlbum.external_urls ? "" : selectedAlbum.external_urls.spotify} rel="noreferrer" target="_blank" style={{color:"white"}}>Open Spotify Page</a>
                    <button className="addAlbumBtn" onClick={() => addAlbum(selectedAlbum.name)}>Add {selectedAlbum.name} to Favourites</button>
                    <p>{responseMessage}</p>
                    </Modal>
                </div>
                <div className="results">
                <h2>Songs</h2>
                    <ul>
                        {songs.map((song, index) => {
                            return (
                                <div className="resultNames" key={index} onClick={() => openSongModal(song)}>
                                    <li>{song.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={songModalOpen} onRequestClose={closeSongModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button className="modalBtn" onClick={closeSongModal}>Back to browse</button>
                    <img src={selectedSong.album?.images[0].url} className="modalImg" alt="songModalImg" style={{width:'80%'}}/>
                    <h3>{selectedSong?.name}</h3>
                    {<p>Artist: {selectedSong?.artists && selectedSong.artists[0].name}</p>}
                    <a href={!selectedSong.external_urls ? "" : selectedSong.external_urls.spotify} rel="noreferrer" target="_blank" style={{color:"white"}}>Open Spotify Page</a>
                    <button className="addAlbumBtn" onClick={() => addSong(selectedSong.name)}>Add {selectedSong.name} to Favourites</button>
                    <p>{responseMessage}</p>
                    </Modal>
                </div>
            </div>
        </div>

    )
}

export default Music