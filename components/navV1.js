import Link from 'next/link';
import logo from '/public/logonottrans.jpg';
import React, { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavBar({name}) {
  const [open, setOpen] = useState('none');

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    if (window.innerWidth >= 768) {setOpen('flex')}
    else {setOpen('none');}
    
    try {document.getElementById(name + "").classList.add("this-page");}
    catch(e) {}
  }

  function onClickToggle() {
    if (open == 'flex') {setOpen('none');}
    else {setOpen('flex');}
  }

  return (
    <div className="Tabs">
      <ul className="tabs">
          <li className="logo"><Link href="/"><a><img src={logo.src} width="45px" height="45px" /></a></Link></li>
          
          <li style={{display: open}} className="tab"><Link href='/signup' as={ process.env.PUBLIC_URL + '/signup'}><a id="SignUp" className="tab-label">Sign-Up</a></Link></li>
          <li style={{display: open}} className="tab"><Link href='/login' as={ process.env.PUBLIC_URL + '/login'}><a id="LogIn" className="tab-label">Log-In</a></Link></li>

          <li onClick={onClickToggle} className="toggle" style={{padding: 5, paddingBottom: 10, marginRight: 10}}><span className="bars"><FontAwesomeIcon icon={faBars} width="26" height="26" style={{color: 'white'}} /></span></li>
      </ul>
    </div>
  );
}