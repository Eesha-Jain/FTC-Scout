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

    if (localStorage.getItem('loggedIn') == 'true') {
      alert("Already logged into " + user);
      localStorage.removeItem('loggedIn');
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
              <p>Best Score: {ele.best[0]}</p>
              <p>Email: <a href={`mailto:${ele.email}`}>{ele.email}</a></p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};