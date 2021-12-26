import Link from 'next/link';
import logo from '/public/logonottrans.jpg';
import React, { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import cookie from 'js-cookie';

export default function NavBar({name, user}) {
  const [open, setOpen] = useState('none');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    setWidth(window.innerWidth);

    if (window.innerWidth >= 768) {setOpen('flex')};
    try {document.getElementById(name + "").classList.add("this-page");}
    catch(e) {}
  }

  function onClickToggle() {
    if (open == 'flex') {setOpen('none');}
    else {setOpen('flex');}
  }

  const logOut = () => {
    localStorage.setItem('logout', 'true');
    Router.push('/');
  }

  return (
    <div className="Tabs">
      <ul className="tabs">
          <li className="logo"><Link href="/account"><a><img src={logo.src} width="45px" height="45px" /></a></Link></li>
          
          <li style={{display: open}} className="tab"><Link href={`/prematch/${user}`} as={ process.env.PUBLIC_URL + '/prematch/' + user}><a id="PreMatch" className="tab-label">Pre-Match Scouting</a></Link></li>
          <li style={{display: open}} className="tab"><Link href={`/duringmatch/${user}`} as={ process.env.PUBLIC_URL + '/duringmatch/' + user}><a id="DuringMatch" className="tab-label">During-Match Scouting</a></Link></li>
          <li style={{display: open}} className="tab"><Link href={`/search/${user}`} as={ process.env.PUBLIC_URL + '/search/' + user}><a id="Search" className="tab-label">Search</a></Link></li>
          <li style={{display: open}} className="tab"><Link href={`/account/${user}`} as={ process.env.PUBLIC_URL + '/account/' + user}><a id="Account" className="tab-label">Account</a></Link></li>
          <li style={{display: open}} className="tab"><button id="LogOut" className="tab-label" onClick={logOut} style={{cursor: 'pointer'}}>Log Out</button></li>

          <li onClick={onClickToggle} className="toggle" style={{padding: 5, paddingBottom: 10, marginRight: 10}}><span className="bars"><FontAwesomeIcon icon={faBars} width="26" height="26" style={{color: 'white'}} /></span></li>
      </ul>
    </div>
  );
}