import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

export default function Search() {
  const router = useRouter();
  const [user, setUser] = useState(router.query.user);
  const [content, setContent] = useState();
  const [results, setResults] = useState();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const run = (e) => {
    e.preventDefault();

    fetch('/api/searchteams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber: search})
    }).then(req => req.json()).then((res) => {
      if (!res || (res && res.error)) {
        setMessage('ERROR: ' + res.message);
      }

      console.log(res);
    })
  }

  useEffect(() => {
    if (!user) { return; }
    
    const getInfo = () => {
      if (user === undefined) { setUser(router.query.user); }
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
  }, [user, search]);

  return (
    <div>
      <Top name="Search" />
      <Nav name="Search" user={user} />
      <div className="Search">{content}{results}</div>
    </div>
  );
};