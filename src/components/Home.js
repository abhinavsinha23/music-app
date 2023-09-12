import React from "react"
import '../App.css'
import { useState, useEffect } from "react"
import { removeFavAlbum, removeFavTrack, retrieveUser } from "../utils"
import { getCookie } from "../common"
import { removeFavArtist, getMusicEvents} from "../utils"





const Home = () => {
  const [user, setUser] = useState({})
  const [favArtists, setFavArtists] = useState([])            
  const [albumInfo, setAlbumInfo] = useState([]);
  const [favSongs, setFavSongs] = useState([]);
  const [musicEvents, setMusicEvents] = useState([])
  


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

  useEffect(() => {
    //Reset music events state to empty every time favArtists is updated (for when the user deletes a favourite artist)
    setMusicEvents([])
    const getData = async (artist) => {
      try {
        const mEvent = await getMusicEvents(artist.replace(/ /g, "")); //Removes all spaces
        //Check if artists returned data contains a music event to display, if so then add it to events array, if not then don't add it
        if (mEvent._embedded) {
          setMusicEvents((prevMusicEvents) => [...prevMusicEvents, mEvent]);
        }
      } catch (error) {
        console.error(`Error fetching events for ${artist}:`, error);
      }
    };
    const fetchEventsForFavoriteArtists = async () => {
      for (let i = 0; i < favArtists.length; i++) {
        await getData(favArtists[i]);
        //Limits loop to 5, too many calls to API too quickly results in an error
        if (i >= 4) {
          return
        }
      }
    };
    if (favArtists.length > 0) {
      fetchEventsForFavoriteArtists();
    }
  }, [favArtists]);

  const containerStyle = {


    display: 'grid', 
    justifyContent: 'center', 
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '80%',
    height: '60%',
    alignItems: 'center',  
    marginLeft: '10%',
    marginBottom: '5%'
      
  };
  
  const boxstyle = {
    // backgroundColor:'rgba(174, 68, 90, 0.8)',
    // backgroundColor:'rgba(50, 57, 61, 0.8)',
    borderRadius: '60px',
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    // backgroundColor: '#32393d',
    // color: '#fff',
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
    } else {
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
      } else {
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
      } else {
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
          <div style={containerStyle} className="grid-container">
            <div style={boxstyle} className="grid-item">
              <h2>Create your own unique library</h2>
              <p className= "hide" style={{textAlign:'center'}}> Add your favourite artists, albums and songs to your personal space</p>
            </div>
            <div style={boxstyle} className="grid-item">
              <h2>Explore a vast collection of music and albums from various genres.</h2> 
              <p >🎺🎧🎤🪗♪🥁♭🎹♩♬🎸</p>
            </div>
            <div style={boxstyle} className="grid-item">
              <h2>Stay updated with the latest music releases and upcoming events.</h2>
              <p>We have partnered with spotify to bring you the latest events from your favourite artists.</p>
            </div>
            {/* <div style={boxstyle} className="long-box-one grid-item">
              <h2>Find out when your favorite artists are going on tour in your area.</h2>
              <p>Using our extensive database, we have made sure that as soon as one of your' favourites goes on tour, you'll be the first to know.</p>
            </div> */}
            <div  style={boxstyle} className="long-box-one grid-item">
              <h2>Connect with other music enthusiasts and share your musical discoveries.</h2>
              <p> By connecting your' social media and discord you can use this website to connect to your favourite bands instantly from here.</p>
              <div style= {{display: 'flex', justifyContent:'space-evenly',paddingTop: '30px'}}> 
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/" style={{ backgroundColor: 'blue', display: 'block', padding: '10px', color: 'white', textDecoration: 'none', width: '20%' }}>Facebook</a>
                <a target="_blank" rel="noreferrer" href="https://twitter.com/?lang=en" style={{ backgroundColor: '#3d91eb', display: 'block', padding: '10px', color: 'white', textDecoration: 'none',width: '20%' }}>Twitter</a>
                <a target="_blank" rel="noreferrer" href="https://open.spotify.com" style={{ backgroundColor: '#46923c', display: 'block', padding: '10px', color: 'white', textDecoration: 'none', width: '20%' }}>Spotify</a>
                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/" style={{ backgroundColor: 'red', display: 'block', padding: '10px', color: 'white', textDecoration: 'none', width: '20%' }}>Youtube</a>          
              </div>
            </div>
          </div>  
          <div style ={containerStyle}>
            <div style ={boxstyle} className="box eventWrap">
              <h2>Favourite artists</h2>
              <ul className="favoriteList">
                {
                  favArtists.length === 0
                  ?
                  <p>There are no artists currently added, please select one from the music tab</p>
                  :
                  favArtists.map((artist, index) => {
                  return (
                    <div key={index} className="artistX">
                      <li className="favArtists">{artist}</li>
                      <button style={{padding: '0.2vw', margin: '0', fontSize: '8pt'}} onClick={() => removeArtist(artist)}>X</button>
                    </div>
                  )
                  })
                }
              </ul>
          </div>
          <div style={boxstyle} className="box eventWrap">
            <h2>Favourite albums</h2>
            <ul className="favoriteList">
              {
                albumInfo.length === 0
                ?
                <p>There are no albums currently added, please select one from the music tab</p>
                :
                albumInfo.map((album, index) => {
                  return (
                    <div key={index} className="artistX">
                      <li className="favAlbums">{album}</li>
                      <button style={{padding: '0.2vw', margin: '0', fontSize: '8pt'}} onClick={() => removeAlbum(album)}>X</button>
                    </div>
                  )
                })
              }
            </ul>
          </div>
          <div style={boxstyle} className="box eventWrap">
            <h2>Favourite songs</h2>
            <ul className="favoriteList">
              {
                favSongs.length === 0
                ?
                <p>There are no tracks currently added, please select one from the music tab</p>
                :
                favSongs.map((song, index) => {
                  return (
                    <div key={index} className="artistX">
                      <li className="favArtists">{song}</li>
                      <button style={{padding: '0.2vw', margin: '0', fontSize: '8pt'}} onClick={() => removeSong(song)}>X</button>
                    </div>
                  )
                })
              }
            </ul>
          </div>

          <div style={boxstyle} className="long-box eventWrap">
            <h2>Upcoming events</h2>
            {musicEvents.map((event, index) => {
                    return (
                      <div key={index} className="eachEventWrap">
                         <img style={{width:'100px'}} src={event?._embedded?.events[0].images && event?._embedded?.events[0].images[0].url} alt="tour_img"/>
                        <a className="eventLink" target="_blank" rel="noreferrer" href={event?._embedded?.events && event?._embedded?.events[0].url} >{event?._embedded?.events && event?._embedded?.events[0].name}</a>
                        <ul className="detailsList">
                          <li style={{listStyleType: 'none'}}><b>Start Date:</b> {event?._embedded?.events[0].dates && event?._embedded?.events[0].dates.start.localDate}</li>
                          <li style={{listStyleType: 'none'}}><b>Venue:</b> {event?._embedded?.events[0]._embedded && event?._embedded?.events[0]._embedded.venues[0].name}</li>
                          <li style={{listStyleType: 'none'}}><b>Location:</b> {event?._embedded?.events[0]._embedded && event?._embedded?.events[0]._embedded.venues[0].city.name}</li>
                        </ul>
                        
                      </div>
                    )
            })}
          </div>
        </div> 
      </div>
    )
}

export default Home




