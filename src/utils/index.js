import { writeCookie } from "../common"

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

export const artistData = async (name) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DB_LINK}artists`, {
          // mode: "no-cors",
          method: "POST",
          headers: {
              "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            "name" : name
          })
      })
        const data = response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const albumData = async (name) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DB_LINK}albums`, {
          // mode: "no-cors",
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            "name" : name
          })
      })
        const data = response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

//add Fav artist
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
      const data = await response.json();
      console.log(data);
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
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        return user.user
    } 
    catch (error) {
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  