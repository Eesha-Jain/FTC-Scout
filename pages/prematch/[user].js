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
          <Link href={`/prematchform/${user}`} as={ process.env.PUBLIC_URL + '/prematchform/' + user}><button type="submit" id="scoutteam" style={{fontWeight: 300}}>Scout New Team</button></Link>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Link href="/documents/FTCPreMatchScouting.pdf" target="_blank" download id="ftcprematchdownloadbutton"><a className="button" style={{fontWeight: 300}}>Download Paper Sheet</a></Link>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Link href={`/viewprematches/${user}`} as={ process.env.PUBLIC_URL + '/viewprematches/' + user}><button type="submit" id="scoutteam" style={{fontWeight: 300}}>View Scouted Teams</button></Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};