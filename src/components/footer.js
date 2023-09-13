import React from 'react';
import {Link} from 'react-router-dom'
function Footer() {
  const changeStyle = (e) => {
    e.target.style.opacity = '0.6'
    e.target.style.textDecoration = 'underline'
  }

  const removeStyle = (e) => {
    e.target.style.opacity = '1'
    e.target.style.textDecoration = 'none'
  }
  return (
    <footer className='footerBox' style={{backgroundColor: 'red',marginBottom:'0', height: '8%', }}>
      <ul style={{listStyleType : 'none', display: 'flex', flexDirection: 'row'}}>
        <li><Link to="/infoPage#about" style={{marginRight: '30px', color: 'white'}} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>&copy; About</Link></li>
        <li><Link to="/infoPage#privacy" style={{marginRight: '30px', color: 'white'}} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>Privacy policy</Link></li>
        <li><Link to="/infoPage#terms" style={{marginRight: '30px', color: 'white'}} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>Terms of use</Link></li>
        <li><Link to="/infoPage#contact" style={{marginRight: '30px', color: 'white'}} onMouseEnter={changeStyle} onMouseLeave={removeStyle}>Contact us</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;