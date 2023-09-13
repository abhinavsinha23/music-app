//CREATE BACKEND CONTROLLER TO RETRIEVE ALL USERS
//CHECK CLIENTS COOKIE(JWT) TO ENSURE THEY ARE AUTHORIZED TO VIEW PAGE
//DISPLAY ALL USERS (AND POSSIBLY SOME OF THEIR INFORMATION)
import React from 'react';
import { getCookie } from "../common"
import '../App.css'
import { useState, useEffect } from "react"
import { getAllUsers} from "../utils"
import { useNavigate } from "react-router-dom"


const AllUsers = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie === false) {
            navigate('/login')
        }
    }, [navigate])

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        let cookie = getCookie("jwt-token")
        const res = await getAllUsers(cookie)
        setUsers(res.user)
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div style={{minHeight: '100vh'}}>
            <h1>Users</h1>
            <div className='userDetailsWrapAll'>
                {users?.map((user, index) => {
                    
                        return (
                        <div className='userDetailsWrap' key={index}>
                            <h1>{user.username}</h1>
                            <p>{user.email}</p>
                            <h4><u>Favourite Albums</u></h4>
                            <p>{user.favoriteAlbums === "" ? "There are no favourite albums to display" : user.favoriteAlbums}</p>
                            <h4><u>Favourite Artists</u></h4>
                            <p>{user.favoriteArtists === "" ? "There are no favourite artists to display" : user.favoriteArtists}</p>
                            <h4><u>Favourite Tracks</u></h4>
                            <p>{user.favoriteTracks === "" ? "There are no favourite tracks to display" : user.favoriteTracks}</p>
                            </div> 
                        )
                    
                })}
            </div>
        </div>
    )
}

export default AllUsers