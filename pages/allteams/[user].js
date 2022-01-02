import Top from '../../components/top';
import Footer from '../../components/footer';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Team from '../../components/team';

export default function Search() {
  const router = useRouter();
  const { user } = router.query;
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);
  const [arr, setArr] = useState([]);

  const bestscore = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return b.best[0] - a.best[0] });
    setArr(dup);
  }

  const teamnumbers = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return a.teamnumber - b.teamnumber });
    setArr(dup);
  }

  const autonomous = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return (Number(b.auto[0]) * 10 + Number(b.auto[1]) * 6 + Number(b.auto[2]) * 3 + Number(b.auto[3]) * 10 + Number(b.auto[4]) * 5 + Number(b.auto[5]) * 10 + Number(b.auto[6]) * 20 + b.auto[7] * 2 + b.auto[8] * 6) - (Number(a.auto[0]) * 10 + Number(a.auto[1]) * 6 + Number(a.auto[2]) * 3 + Number(a.auto[3]) * 10 + Number(a.auto[4]) * 5 + Number(a.auto[5]) * 10 + Number(a.auto[6]) * 20 + a.auto[7] * 2 + a.auto[8] * 6) });
    setArr(dup);
  }

  const teleop = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return (b.tele[0] + b.tele[1] * 2 + b.tele[2] * 4 + b.tele[3] * 6 + b.tele[4] * 4) - (a.tele[0] + a.tele[1] * 2 + a.tele[2] * 4 + a.tele[3] * 6 + a.tele[4] * 4) });
    setArr(dup);
  }

  const endgame = () => {
    var dup = [...arr];
    dup.sort(function(a,b) { return (Number(b.endgame[0]) * 10 + Number(b.endgame[1]) * 20 + Number(b.endgame[2]) * 15 + Number(b.endgame[3]) * 6 + Number(b.endgame[4]) * 3 + b.endgame[5] * 6) - (Number(a.endgame[0]) * 10 + Number(a.endgame[1]) * 20 + Number(a.endgame[2]) * 15 + Number(a.endgame[3]) * 6 + Number(a.endgame[4]) * 3 + a.endgame[5] * 6) });
    setArr(dup);
  }

  useEffect(() => {
    if (!user) { return; }

    const run = () => {
      fetch('/api/searchallteams', {
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
      <Top name="State" />
      <Nav name="State" user={user} />
      <div className="State AllTeams">
        {content}
        <div className="grid">
          {arr.map((ele) => (
            <div className="grid-element" style={{backgroundColor: 'rgb(246, 246, 246)', padding: 10, textAlign: 'center'}}>
              <h2>{ele.teamnumber}: {ele.teamname}</h2>
              <p>State: {ele.state}</p>
              <p>Score: {ele.best[0]}</p>
              <p>Email: <a href={`mailto:${ele.email}`}>{ele.email}</a></p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};