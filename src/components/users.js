import React, { useState, useEffect } from "react";
import { updateUser } from "../utils";
import { deleteUserByID } from "../utils";
import { getCookie, deleteCookie } from "../common";
import { useNavigate } from "react-router-dom"


const Users = () => {
    const [key, setKey] = useState()
    const [newValue, setNewValue] = useState()
    const [cookie, setCookie] = useState()
    const [updateRes, setUpdateRes] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setCookie(getCookie("jwt-token"))
        let cookie = getCookie("jwt-token")
        if (cookie === false) {
            navigate('/')
        }
    }, [navigate])

    
    const submitHandler = async (event) => {
        event.preventDefault()
        setUpdateRes(await updateUser(cookie, key, newValue))
    }

    const deleteUser = async () => {
        const choice = window.confirm(
            'Are you sure you want to delete your account? All data will be lost.'
          );
          if (choice) {
            await deleteUserByID(cookie)
            deleteCookie("jwt-token")
            window.location.reload()
          }
        
    }



    if (cookie) {

    return (
        <div>
            <div className='update' style={{height: '40vh'}}>
                <h2>Welcome. Update your information below.</h2>
                <form onSubmit={submitHandler}>
                    <label>Information to update:
                <label>
             
                    <input onChange={(event) => setKey(event.target.value)} type="radio" id="username" name="column" value="username" />
                    &nbsp;Username 
                </label>
                <label>
                <input onChange={(event) => setKey(event.target.value)} type="radio" id="email" name="column" value="email" />
                &nbsp;Email
                </label>
                <label>
                    <input onChange={(event) => setKey(event.target.value)} type="radio" id="password" name="column" value="password" />
                    &nbsp;Password
                
                </label>
                    </label>
                    <br></br>
                    <br></br>
                    <label>New {key}:&nbsp;
                        <input onChange={(event) => setNewValue(event.target.value)} className="radioInput"></input>
                    </label>
                    <br></br>

                    <button type='submit'>Update</button>
                    <p>{updateRes?.message}</p>
                </form>
                <br></br>
                
            </div>
            <hr/>
            <div style={{height: '50vh'}}>
                <button onClick={(deleteUser)}>Delete account</button>
            </div>
        </div>
    )
}       else {
    return (
            <div>
                <h2>Please register or log in</h2>
                
            </div>
    )
}
}

export default Users


// import React, {useState} from 'react';
// import Navbar from "../App"

// const Users = () => {
//     function FavouriteSongs({ songInfo }) {
//       return (
//         <div>
//           <h2>Song</h2>
//           <p>{songInfo}</p>
//         </div>
//       );
//     }

//     function FavoriteAlbums({ albumInfo }) {
//       return (
//         <div>
//           <h2>Album</h2>
//           <p>{albumInfo}</p>
//         </div>
//       );
//     }


//     function infoChange() {
//   const [inputValue, setInputValue] = useState('');
//   const [albumInfo, setAlbumInfo] = useState('');
//   const [songInfo, setSongInfo] = useState('');

//     };


//   const handleInputChange = (e) => {
//       setInputValue(e.target.value);
//   };


//   const handleButtonClick = () => {

//   setAlbumInfo(inputValue);
//   setSongInfo(inputValue);
//   };

//   return (
//     <div>
//       <div>
//         <input
//         type="text"  
//         placeholder="Enter new information"
//         value={inputValue}
//         onChange={handleInputChange}
//         />
//         <button onClick={handleButtonClick}>Albums</button>
//         <albumTile albumInfo={albumInfo} />
//         <songTile songInfo={songInfo}/>
//       </div>

//       <div>
//         <input
//         type="text"  
//         placeholder="Enter new information"
//         value={inputValue}
//         onChange={handleInputChange}
//         />
//         <button onClick={handleButtonClick}>Songs</button>
//         <albumTile albumInfo={albumInfo} />
//         <songTile songInfo={songInfo}/>
//       </div>
//       <div>
//           <input
//           type="text"  
//           placeholder="Enter new information"
//           value={inputValue}
//           onChange={handleInputChange}
//           />
//           <button onClick={handleButtonClick}>change information</button>
//           <albumTile albumInfo={albumInfo} />
//           <songTile songInfo={songInfo}/>
//       </div>
//   </div>
//   )
// }


// export default Users



  


  