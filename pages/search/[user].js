import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

function Team({user}) {
  const width = 18;

  return (
    <div className="teamsearch">
      <div>
        <h2>{user.teamnumber} - {user.teamname.toUpperCase()}</h2>
        <p><b>Best Score:</b> {user.best[0]}</p>
      </div>
      
      <div>
        <h4>Autonomous</h4>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[0] ? faCheckSquare : faSquare} width={width}/> &nbsp; Delivered Duck via Carousel</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[1] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Alliance Storage Unit</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[2] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Alliance Storage Unit</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[3] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Warehouse</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[4] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Warehouse</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[5] ? faCheckSquare : faSquare} width={width}/> &nbsp; Duck Detect Shipping Hub Level</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[6] ? faCheckSquare : faSquare} width={width}/> &nbsp; Team Storing Element Detect Hub Level</p>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.auto[7]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.auto[8]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub</p></span>
      </div>

      <div>
        <h4>Tele-Op</h4>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[0]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[1]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 1</p></span>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[2]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 2</p></span>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[3]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 3</p></span>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[4]}</p>&nbsp;&nbsp; <p>Shared Shipping Hub</p></span>
      </div>

      <div>
        <h4>Endgame</h4>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[0] ? faCheckSquare : faSquare} width={width}/> &nbsp; Alliance Shipping Hub Balanced</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[1] ? faCheckSquare : faSquare} width={width}/> &nbsp; Shared Shipping Hub Tipped towards Alliance</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[2] ? faCheckSquare : faSquare} width={width}/> &nbsp; Alliance Shipping Hub Capped</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[3] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Warehouse</p>
        <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[4] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Warehouse</p>
        <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.endgame[5]}</p>&nbsp;&nbsp; <p>Delivery via Carousel</p></span>
      </div>
    </div>
  );
}

export default function Search() {
  const router = useRouter();
  const { user } = router.query;
  const [content, setContent] = useState();
  const [results, setResults] = useState();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const run = async (e) => {
    e.preventDefault();
    setResults();
    
    fetch('/api/searchteams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber: search})
    }).then(req => req.json()).then((res) => {
      if (!res || (res && res.error)) {
        setMessage('ERROR: ' + res.message);
        return;
      }
      setResults(
        <>
          {
            res.user.map((ele) => (
              <Team user={ele} key={ele.teamnumber} />
            ))
          }
        </>
      );
    })
  }

  useEffect(() => {
    if (!user) { return; }
    
    const getInfo = () => {
      setContent(
        <div className="outside">
          <form className="submitForm" onSubmit={run}>
            <input type="text" placeholder="Search By Team Number..." name="search" className="searchInput" onChange={(e) => setSearch(e.target.value)} value={search} required/>
            <button type="submit" className="searchButton">Search</button>
          </form>

          <p id="message" style={{marginBottom: 0}}>{message}</p>
        </div>
      );
    }

    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    } else {
      getInfo();
    }
  }, [user, search, results]);

  return (
    <div>
      <Top name="Search" />
      <Nav name="Search" user={user} />
      <div className="Search">{content}{results}</div>
    </div>
  );
};