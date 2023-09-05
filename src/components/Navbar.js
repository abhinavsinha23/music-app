import {Link} from 'react-router-dom'
import '../App.css';

function Navbar() {

    return (
      <nav className='navWrap'>
        
        <ul className='navBar'>
            <li>
                <Link to="/">Home</Link>
            </li>

            <li>
                <Link to="/music">Music</Link>
            </li>

            <li>
                <Link to="/users">Users</Link>
            </li>

            {/* <li>
                <Link to="/">Search</Link>
            </li> */}

            <li className='loginButton'>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
    );
}

export default Navbar