import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Team from '../../components/team';

export default function Search() {
  const router = useRouter();
  const { user } = router.query;
  const [content, setContent] = useState();
  const [results, setResults] = useState(<div style={{display: 'flex', justifyContent: 'center'}}><Link href={`/state/${user}`} as={ process.env.PUBLIC_URL + '/state/' + user}><button type="submit" className="searchButton" style={{borderRadius: 50, padding: 8, paddingLeft: 20, paddingRight: 20, fontWeight: 300}}>See Teams in State</button></Link></div>);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const run = async (e) => {
    e.preventDefault();
    setResults();
    
    fetch('/api/searchteamnumber', {
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

      if (res.user.length > 0) {
        setResults(
          <>
              {
                  res.user.map((ele) => (
                      <Team user={ele} key={ele.teamnumber} />
                  ))
              }
          </>
        );
      } else {
        setResults(
          <p style={{textAlign: 'center'}}>No Results</p>
        );
      }
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