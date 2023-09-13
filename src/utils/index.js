import { writeCookie } from "../common"
import axios from "axios"

//Register
export const register = async (username, email, password) => {
    try {
        const response = await fetch (`${process.env.REACT_APP_DB_LINK}users/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        }) 
        const data = await response.json();
        if (data.errorMessage){
            return (data.errorMessage)
        }
        return(data)
          
    } catch (error) {
        console.log(error)
    }
}

//login 
export const login = async (username, email, password) => {
    try {
        const response = await fetch (`${process.env.REACT_APP_DB_LINK}users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        const data = await response.json();
        if (data.errorMessage){
            return (data.errorMessage)
        }
        writeCookie("jwt-token", data.user.token, 7)
        return(data)
        
    } catch (error) {
        console.log(error)
    }
}

//Delete user
export const deleteUserByID = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })
        const data = await response.json()
        return data
    } 
    catch (error) {
        console.log(error)
    }
}

export const retrieveUser = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/search`, {
      method: "GET",
      headers: {
          "Content-Type" : "application/json",
          "Authorization" : token
      }
    })
    const data = await response.json()
    return data
  }
  catch (error) {
    console.log(error)
  }
}

  export const addFavArtist = async (token, newArtist) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/addFavArtist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "newArtist" : newArtist
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  export const addFavAlbum = async (token, newAlbum) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/addFavAlbum`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "newAlbum" : newAlbum
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  export const addFavTrack = async (token, newTrack) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/addFavTrack`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "newTrack" : newTrack
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  export const removeFavArtist = async (token, removedArtist) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/removeFavArtist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "removedArtist" : removedArtist
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  export const removeFavAlbum = async (token, removedAlbum) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/removeFavAlbum`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "removedAlbum" : removedAlbum
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  export const removeFavTrack = async (token, removedTrack) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/removeFavTrack`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            "removedTrack" : removedTrack
        }),
      });
      await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  //get user
  export const getAllUsers = async (token) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/all`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })
        const user = await response.json()
        return user
    } 
    catch (error) {
        console.log(error)
    }
}

export const spotifyGetToken = async (name) => {
  try {
      const response = await fetch(`https://accounts.spotify.com/authorize`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          "name" : name
        })
    })
      const data = response.json()
      return data
  } catch (error) {
      console.log(error)
  }
}

//Update User

export const updateUser = async (token, key, newValue) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_DB_LINK}users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : token
        },
        body: JSON.stringify({
            key: key,
            value: newValue
        }),
      });
      const data = await response.json();
      if (data.errorMessage){
        return({message: data.errorMessage})
      }
      return(data);
    } catch (error) {
      console.log(error);
    }
  };


  export const getRadioData = async (searchVal) => {
        try {
            const response = await fetch (`https://de1.api.radio-browser.info/json/stations/byname/${searchVal}?limit=25`, {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            }) 
            const data = await response.json();
            
            return(data)
              
        } catch (error) {
            console.log(error)
        }

  }
  


export const getMusicEvents = async (searchVal) => {
  try {
    const {data} = await axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${searchVal}&locale=*&size=1`
    )
    return data
} catch (error) {
          console.log(error)
       }
}

export const searchArtists = async (searchVal, token) => {
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

export const searchAlbums = async (searchVal, token) => {
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchVal,
          type: "album"
      }
  })
  return data
}

export const searchSongs = async (searchVal, token) => {
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchVal,
          type: "track"
      }
  })
  return data
}
  