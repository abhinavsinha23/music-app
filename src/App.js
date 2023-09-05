import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Login from "./components/Login"
import Home from './components/Home';
import Music from "./components/music"
import Users from "./components/users"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element= {<Login />}/>
        <Route path="/music" element= {<Music />}></Route>
        </Routes>
      </BrowserRouter>
      <div>
        
      </div>
    </div>
  );
}

export default App;
