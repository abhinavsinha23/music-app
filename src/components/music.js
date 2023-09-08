import React from "react"
import { useState, useEffect } from "react"
import '../App.css'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../common"
import Modal from 'react-modal'
import axios from "axios"
import { addFavAlbum, addFavArtist, addFavTrack } from "../utils"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '30%',
        height: '90%',
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
        let artistsSearchResults = await searchArtists()
        // console.log(artistsSearchResults)
        setArtists(artistsSearchResults.artists.items)
        let albumsSearchResults = await searchAlbums()
        // console.log(albumsSearchResults)
        setAlbums(albumsSearchResults.albums.items)
        let songsSearchResults = await searchSongs()
        setSongs(songsSearchResults.tracks.items)
    }

    const REACT_APP_CLIENT_ID = "42fd9711eebd4fb5b3490fa50be6c067"
    const REACT_APP_REDIRECT_URI = "http://localhost:3000/music"
    const REACT_APP_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REACT_APP_RESPONSE_TYPE = "token"

    useEffect(() => {
        const hash = window.location.hash
        // console.log("HASH =", hash)

        let tempToken = window.localStorage.getItem("token")

        if (!tempToken && hash) {
            tempToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            

            window.location.hash = ""
            window.localStorage.setItem("token", tempToken)
            
        }
        setToken(tempToken)
        // console.log("TOKEN AFTER SPLIT= ", tempToken)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async () => {
        // console.log("SEARCH ARTISTS IS RUNNING, TOKEN =", token)
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchVal,
                type: "artist"
            }
        })
        return data
    }

    const searchAlbums = async () => {
        // console.log("SEARCH ARTISTS IS RUNNING, TOKEN =", token)
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchVal,
                type: "album"
            }
        })
        // console.log(data)
        return data
    }

    const searchSongs = async () => {
        // console.log("SEARCH ARTISTS IS RUNNING, TOKEN =", token)
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchVal,
                type: "track"
            }
        })
        console.log(data)
        return data
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
                <label>Search for album/artist:&nbsp;
                    <input onChange={(event) => setSearchVal(event.target.value)} required></input>
                </label>
                <button  type='submit'>Search</button>
            </form> : <p>Login to Spotify to search</p>

            }

            {!token ?
            <button style={{margin:"0px"}}><a style={{textDecoration:"none", color:"black"}} href={`${REACT_APP_AUTH_ENDPOINT}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=${REACT_APP_RESPONSE_TYPE}`}>Login To Spotify</a></button>
                
                : <button style={{margin:"3px"}} onClick={logout}>Logout Of Spotify</button>
            }
            </div>
            <p style={{margin:"0px", fontSize:"12px"}}>(Login token will expire after 1 hour)</p>
            <div className="searchResults">
                <div className="artistResults">
                    <h2>Artists</h2>
                    <ul>
                        {artists.map((artist, index) => {
                        return (
                                <div className="artistName" onClick={() => openArtistModal(artist)} key={index}>
                                    <li>{artist.name}</li>
                                </div>
                        )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={artistModalOpen} onRequestClose={closeArtistModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button className="modalBtn" onClick={closeArtistModal}>Back to browse</button>
                    {/* {console.log(artistModalOpen)}
                    {console.log(selectedArtist)} */}
                    <img src={!selectedArtist.images ? "" : selectedArtist.images[0].url} className="modalImg" alt="artistModalImg" style={{width:'250px'}}/>
                    <p>{selectedArtist.name}</p>
                    <a href={!selectedArtist.external_urls ? "" : selectedArtist.external_urls.spotify} rel="noreferrer" target="_blank" style={{color:"white"}}>Open Spotify Page</a>
                    <button className="addArtistBtn" onClick={() => addArtist(selectedArtist.name)}>Add {selectedArtist.name} to Favourites</button>
                    <p>{responseMessage}</p>
                    </Modal>
                </div>
                <div className="albumResults">
                <h2>Albums</h2>
                    <ul>
                        {albums.map((album, index) => {
                            return (
                                <div className="albumName" key={index} onClick={() => openAlbumModal(album)}>
                                    <li>{album.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={albumModalOpen} onRequestClose={closeAlbumModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button className="modalBtn" onClick={closeAlbumModal}>Back to browse</button>
                    {/* {console.log(albumModalOpen)}
                    {console.log(selectedAlbum)} */}
                    <img src={!selectedAlbum.images ? "" : selectedAlbum.images[0].url} className="modalImg" alt="albumModalImg" style={{width:'250px'}}/>
                    <p>{selectedAlbum.name}</p>
                    <a href={!selectedAlbum.external_urls ? "" : selectedAlbum.external_urls.spotify} rel="noreferrer" target="_blank" style={{color:"white"}}>Open Spotify Page</a>
                    <button className="addAlbumBtn" onClick={() => addAlbum(selectedAlbum.name)}>Add {selectedAlbum.name} to Favourites</button>
                    <p>{responseMessage}</p>
                    </Modal>
                </div>
                <div className="songResults">
                <h2>Songs</h2>
                    <ul>
                        {songs.map((song, index) => {
                            return (
                                <div className="albumName" key={index} onClick={() => openSongModal(song)}>
                                    <li>{song.name}</li>
                                </div>
                            )
                        })}
                    </ul>
                    <Modal className="Modal "isOpen={songModalOpen} onRequestClose={closeSongModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
                    <button className="modalBtn" onClick={closeSongModal}>Back to browse</button>
                    {/* {console.log(albumModalOpen)}
                    {console.log(selectedAlbum)} */}
                    {/* <img src={!selectedSong.images ? "" : selectedSong.images[0].url} className="modalImg" alt="songModalImg" style={{width:'250px'}}/> */}
                    <p>{selectedSong?.name}</p>
                    {/* <p>Artist: {selectedSong.artists[0].name}</p> THIS LINE OF CODE IS BROKEN */}
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