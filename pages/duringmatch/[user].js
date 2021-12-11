import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

export default function DuringMatch() {
  const router = useRouter();
  const [user, setUser] = useState(router.query.user);
  const [content, setContent] = useState();

  useEffect(() => {
    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != router.query.user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    } else {
      if (user === undefined) { setUser(router.query.user); }
      setContent(
        <div>
          <p>account: {router.query.user}</p>
        </div>
      );
    }
  }, [user]);

  return (
    <div>
      <Top name="DuringMatch" />
      <Nav name="DuringMatch" user={user} />
      <div>{content}</div>
    </div>
  );
};