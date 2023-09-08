import React from "react"
import '../App.css'
import { useState, useEffect } from "react"
import { removeFavAlbum, removeFavTrack, retrieveUser } from "../utils"
import { getCookie } from "../common"
//import music.js???
import  { Footer } from "./footer"
import { removeFavArtist, getMusicEvents} from "../utils"





const Home = () => {
  const [user, setUser] = useState({})
  const [favArtists, setFavArtists] = useState(['There are no artists currently added, please select one from the music tab'])            
  const [albumInfo, setAlbumInfo] = useState(['There are no albums currently added, please select one from the music tab']);
  const [favSongs, setFavSongs] = useState(['There are no songs currently added, please select one from the music tab']);
  const [musicEvents, setMusicEvents] = useState([])
  
  const getEvents = async (artistName) => {
    const getMusicEventsRes = await getMusicEvents(artistName)
    let tempArray = [...musicEvents]
    getMusicEventsRes._embedded.events.map((mEvent, index) => {
      tempArray.push(mEvent)
    })
    setMusicEvents(tempArray)
    

  }
  
  console.log("music events = ", musicEvents)
  
  useEffect(() => {
    favArtists?.map((artist, index) => {
      // getEvents(artist)
      console.log("ARTIST = ", artist)
    })
  },[favArtists])

  

  const getUser = async (cookie) => {
    let userInfo = await retrieveUser(cookie);
    setUser(userInfo)
  }
  
  useEffect(() => {
    FavoriteAlbums(user)
    FavoriteArtists(user)
    FavoriteSongs(user)
  }, [user])
  
  useEffect(() => {
    let cookie = getCookie("jwt-token")
    if (cookie !== false){
      getUser(cookie)
      
    }
  }, [])

  
const containerStyle = {
  display: 'grid', 
  justifyContent: 'center', 
  gridTemplateColumns: '1fr 1fr 1fr',
  width: '60%',
  height: '60%',
  alignItems: 'center',  
  marginLeft: '20%',
  marginBottom: '5%'
     
};

  const boxstyle = {
    
    backgroundColor:'#000',
    color: '#fff',
    padding: '20px', 
    marginTop: '10px',
    marginLeft: '3px',
    marginRight: '3px',
    marginBottom: '3%',
    textAlign: 'center',
      height: '300px',
    
    // borderRadius: '20px',
  };

  function FavoriteSongs(userObj) {
    if(!userObj.user){
      return
    }else {
      if (!userObj.user.favoriteTracks.length) {
        return
      }
      else if (userObj.user.favoriteTracks.includes(", ")) {
        let songArray = userObj.user.favoriteTracks.split(", ")
        setFavSongs(songArray)
      } else {
        let songArray = []
        songArray.push(userObj.user.favoriteTracks)
        setFavSongs(songArray)
      }
  }
     }



     const FavoriteAlbums = (userObj) => {
      if(!userObj.user){
        return
      }else {
        if (!userObj.user.favoriteAlbums.length) {
          return
        }
        else if (userObj.user.favoriteAlbums.includes(", ")) {
          let albumArray = userObj.user.favoriteAlbums.split(", ")
          setAlbumInfo(albumArray)
        } else {
          let albumArray = []
          albumArray.push(userObj.user.favoriteAlbums)
          setAlbumInfo(albumArray)
        }
    }
    }



    const FavoriteArtists = (userObj) => {
      if(!userObj.user) {
        return
      }else {
        if (!userObj?.user?.favoriteArtists?.length) {
          return
        }
        else if (userObj.user.favoriteArtists.includes(", ")) {
          let artistArray = userObj.user.favoriteArtists.split(", ")
          setFavArtists(artistArray)
        } 
        else {
          let artistArray = []
          artistArray.push(userObj.user.favoriteArtists)
          setFavArtists(artistArray)
        }
      }
    }

    const removeArtist = async (name) => {
      let cookie = getCookie("jwt-token")
      await removeFavArtist(cookie, name)
      getUser(cookie)
      FavoriteArtists(user)
    }

    const removeAlbum = async (name) => {
      let cookie = getCookie("jwt-token")
      await removeFavAlbum(cookie, name)
      getUser(cookie)
      FavoriteAlbums(user)
    }

    const removeSong = async (name) => {
      let cookie = getCookie("jwt-token")
      await removeFavTrack(cookie, name)
      getUser(cookie)
      FavoriteSongs(user)
    }

    return (
        <div style={{height: '60%'}}>
          <h1>Welcome to our Music app!</h1>
          <p></p>

      <div style={containerStyle} className="grid-container">
        <div style={boxstyle} className="grid-item">
            <h2>Add your favorite artists and albums to your library.</h2>
            <p> where other sites may suggest random bands, we allow you to add your favourites to your personal space</p>
        </div>
        <div style={boxstyle} className="grid-item">
            <h2>Explore a vast collection of music and albums from various genres.</h2> 
            <p>🎺🎧🎤🪗♪🥁♭🎹♩♬🎸</p>
        </div>
        <div style={boxstyle} className="grid-item">
            <h2>Stay updated with the latest music releases and upcoming events.</h2>
            <p></p>
        </div>
        <div style={boxstyle} className="long-box-one grid-item">
            <h2>Find out when your favorite artists are going on tour in your area.</h2>
            <p>Using our extensive database, we have made sure that as soon as one of your' favourites goes on tour, you'll be the first to know.</p>
        </div>
        <div  style={boxstyle} className="long-box-one grid-item">
            <h2>Connect with other music enthusiasts and share your musical discoveries.</h2>
            <p> By connecting your' social media and discord you can use this website to connect to your favourite bands instantly from here.</p>
        </div>
    </div>



        
<div style ={containerStyle}>
      <div style ={boxstyle} className="box">
        <h2>Your favourite artists</h2>
        <ul>
          {
          favArtists[0] === 'There are no artists currently added, please select one from the music tab' 
          ?
          <p>{favArtists[0]}</p>
          :
          favArtists.map((artist, index) => {
          return (
            <div key={index} className="artistX">
              <li className="favArtists">{artist}</li>
              <button style={{padding: '0.2vw', margin: '0', fontSize: '10pt'}} onClick={() => removeArtist(artist)}>X</button>
            </div>
          )
          })
          }
          
        </ul>
      </div>
      

      <div style={boxstyle} className="box">
        <h2>Favourite albums</h2>
        <ul>
          {
            albumInfo[0] === 'There are no albums currently added, please select one from the music tab'
            ?
            <p>{albumInfo[0]}</p>
            :
            albumInfo.map((album, index) => {
                return (
                  <div key={index} className="artistX">
                    <li className="favAlbums">{album}</li>
                    <button style={{padding: '0.2vw', margin: '0', fontSize: '10pt'}} onClick={() => removeAlbum(album)}>X</button>
                  </div>
                )
            })
          }
    
  </ul>
      </div>

      <div style={boxstyle} className="box">
        <h2>Favourite songs</h2>
        <ul>
          {
          favSongs[0] === 'There are no songs currently added, please select one from the music tab' 
          ?
          <p>{favSongs[0]}</p>
          :
          favSongs.map((song, index) => {
          return (
            <div key={index} className="artistX">
              <li className="favArtists">{song}</li>
              <button style={{padding: '0.2vw', margin: '0', fontSize: '10pt'}} onClick={() => removeSong(song)}>X</button>
            </div>
          )
          })
          }
          
        </ul>
      </div>

      <div style={boxstyle} className="long-box">
        <h2>Upcoming tour dates</h2>
        {albumInfo.map((album, index) => {
                return (
                  <div key={index} className="artistX">
                    <li className="favAlbums">{album}</li>
                    <button style={{padding: '0.2vw', margin: '0', fontSize: '10pt'}} onClick={() => removeAlbum(album)}>X</button>
                  </div>
                )
        })}
      </div>
    </div> 
    </div>

    
    )
}

export default Home




