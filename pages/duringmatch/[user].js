import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Team from '../../components/team';

export default function DuringMatch() {
  const router = useRouter();
  const { user } = router.query;
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (!user) { return; }

    const run = () => {
      fetch('/api/getduringmatchteams', {
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
      <Top name="DuringMatch" />
      <Nav name="DuringMatch" user={user} />
        
      <div className="DuringMatch">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Link href={`/duringmatchform/${user}`} as={ process.env.PUBLIC_URL + '/duringmatchform/' + user}><button type="submit" id="scoutteam">Scout New Match</button></Link></div>
        {content}
        {/*arr.map((ele) => (
          <Team user={ele} key={ele.teamnumber} />
        ))*/}
      </div>
    </div>
  );
};