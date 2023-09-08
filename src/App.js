import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState} from 'react';
import Login from "./components/Login"
import Home from "./components/Home"
import Music from "./components/music"
import Users from "./components/users"
import Navbar from "./components/Navbar"
import Radio from "./components/Radio"
import Footer from "./components/footer"

function App() {
  const [selectedArtist, setSelectedArtist] = useState({})
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [selectedSong, setSelectedSong] = useState({})
  // const [userLoggedIn, setUserLoggedIn] = useState(false)

//   useEffect(() => {
//     setUserLoggedIn(true)
// }, [userLoggedIn])
  
  // console.log(userLoggedIn)
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element= {<Login/>}/>
          <Route path="/music" element= {<Music selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>}></Route>
          <Route path="/radio" element= {<Radio className="radioElement"/>}/>
          <Route path="/users" element= {<Users />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      <div>
        
      </div>
    </div>
  );
}

export default App;
