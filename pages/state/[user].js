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
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);

  useEffect(() => {
    if (!user) { return; }

    const run = () => {
        fetch('/api/searchteamstate', {
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
          
          setContent(
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

    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    } else {
      run();
    }
  }, [user]);

  return (
    <div>
      <Top name="State" />
      <Nav name="State" user={user} />
      <div className="State">{content}</div>
    </div>
  );
};