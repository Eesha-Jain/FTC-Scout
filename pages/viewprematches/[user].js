import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Team from '../../components/team';
import Footer from '../../components/footer';

export default function PreMatch() {
  const router = useRouter();
  const { user } = router.query;
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);
  const [arr, setArr] = useState([]);

  const bestscore = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return Number(b.best[0]) - Number(a.best[0]) });
    setArr(dup);
  }

  const teamnumbers = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return a.teamnumber - b.teamnumber });
    setArr(dup);
  }

  const autonomous = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return (Number(b.auto[0]) * 10 + Number(b.auto[1]) * 6 + Number(b.auto[2]) * 3 + Number(b.auto[3]) * 10 + Number(b.auto[4]) * 5 + Number(b.auto[5]) * 10 + Number(b.auto[6]) * 20 + Number(b.auto[7]) * 2 + Number(b.auto[8]) * 6) - (Number(a.auto[0]) * 10 + Number(a.auto[1]) * 6 + Number(a.auto[2]) * 3 + Number(a.auto[3]) * 10 + Number(a.auto[4]) * 5 + Number(a.auto[5]) * 10 + Number(a.auto[6]) * 20 + Number(a.auto[7]) * 2 + Number(a.auto[8]) * 6) });
    setArr(dup);
  }

  const teleop = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return (Math.max(Number(b.tele[0]), Math.max(Number(b.tele[1]) * 2 + Number(b.tele[2]) * 4 + Number(b.tele[3]) * 6), Number(b.tele[4]) * 4)) - (Math.max(Number(a.tele[0]), Math.max(Number(a.tele[1]) * 2 + Number(a.tele[2]) * 4 + Number(a.tele[3]) * 6), Number(a.tele[4]) * 4)) });
    setArr(dup);
  }

  const endgame = () => {
    var dup = [...arr];

    console.log(dup);

    dup.sort(function(a,b) { return (Number(b.endgame[0]) * 10 + Number(b.endgame[1]) * 20 + Number(b.endgame[2]) * 15 + Number(b.endgame[3]) * 6 + Number(b.endgame[4]) * 3 + Number(b.endgame[5]) * 6) - (Number(a.endgame[0]) * 10 + Number(a.endgame[1]) * 20 + Number(a.endgame[2]) * 15 + Number(a.endgame[3]) * 6 + Number(a.endgame[4]) * 3 + Number(a.endgame[5]) * 6) });
    setArr(dup);
  }

  useEffect(() => {
    if (!user) { return; }

    const run = () => {
      fetch('/api/getprematchteams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({teamnumber: user})
      }).then(req => req.json()).then((res) => {
        if (!res || (res && res.error)) {
          setContent('ERROR: ' + res.message);
          return;
        }
        if (arr.length == 0) {
          setArr(res.user);
          setContent();
        };
      })
    }

    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    } else {
      run();
    }
  }, [user, arr]);

  return (
    <div>
      <Top name="PreMatch" />
      <Nav name="PreMatch" user={user} />
        
      <div className="PreMatch">
        <br />

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Link href={`/prematch/${user}`} as={ process.env.PUBLIC_URL + '/prematch/' + user}><button type="submit" id="scoutteam" style={{fontWeight: 300}}>Go Back</button></Link>
        </div>

        <div className="filters grid">
          <div className="filterele">Sort By: </div>
          <div className="filterele"><button onClick={bestscore}>Best Score</button></div>
          <div className="filterele"><button onClick={teamnumbers}>Team Number</button></div>
          <div className="filterele"><button onClick={autonomous}>Autonomous</button></div>
          <div className="filterele"><button onClick={teleop}>Tele-Op</button></div>
          <div className="filterele"><button onClick={endgame}>Endgame</button></div>
        </div>
        {content}
        {arr.map((ele) => (
          <Team user={ele} teamnumber={user} prematch={true} key={ele.teamnumber} />
        ))}
      </div>

      <Footer />
    </div>
  );
};