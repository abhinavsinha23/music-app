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
import AllUsers from "./components/AllUsers"
import InfoPage from './components/infoPage';
import RadioPlayer from "./components/RadioPlayer"

function App() {
  const [selectedArtist, setSelectedArtist] = useState({})
  const [selectedAlbum, setSelectedAlbum] = useState({})
  const [selectedSong, setSelectedSong] = useState({})
  const [radioURL, setRadioURL] = useState()



  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <RadioPlayer radioURL={radioURL} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element= {<Login/>}/>
          <Route path="/music" element= {<Music selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} selectedSong={selectedSong} setSelectedSong={setSelectedSong}/>}></Route>
          <Route path="/radio" element= {<Radio className="radioElement" setRadioURL={setRadioURL} />}/>
          <Route path="/users" element= {<Users />}/>
          <Route path="/allusers" element= {<AllUsers />}/>
          <Route path="/infoPage" element= {<InfoPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
      <div>
        
      </div>
    </div>
  );
}

export default App;
