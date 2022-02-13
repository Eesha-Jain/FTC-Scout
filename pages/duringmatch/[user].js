import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Footer from '../../components/footer';

export default function DuringMatch() {
  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    if (!user) { return; }

    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    }
  }, [user]);

  return (
    <div>
      <Top name="DuringMatch" />
      <Nav name="DuringMatch" user={user} />
        
      <div className="DuringMatch">
        <br />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 0, paddingTop: 0}}><Link href={`/duringmatchform/${user}`} as={ process.env.PUBLIC_URL + '/duringmatchform/' + user}><button type="submit" id="scoutteam" style={{fontWeight: 300, marginTop: 0}}>Scout New Match</button></Link></div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 0, paddingTop: 0}}><Link href="/documents/FTCDuringMatchScouting.pdf" target="_blank" download id="ftcduringmatchdownloadbutton"><a className="button" style={{fontWeight: 300, marginTop: 0}}>Download Paper Sheet</a></Link></div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 0, paddingTop: 0}}><Link href={`/viewduringmatches/${user}`} as={ process.env.PUBLIC_URL + '/viewduringmatches/' + user}><button type="submit" id="scoutteam" style={{fontWeight: 300, marginTop: 0}}>View Scouted Matches</button></Link></div>
      </div>

      <Footer />
    </div>
  );
};