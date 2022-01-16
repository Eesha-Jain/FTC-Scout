import { useEffect } from 'react';
import Header from '../components/header';
import cookie from 'js-cookie';

export default function Home () {
  useEffect(() => {
    if (localStorage.getItem('redirected') == 'true') {
      alert("Please sign up or log in.");
      localStorage.removeItem('redirected');
    }

    if (localStorage.getItem('logout') == 'true') {
      cookie.remove('token');
      localStorage.removeItem('logout');
      localStorage.removeItem('redirected');
    }
  }, []);

  return (
    <div>
      <div className="Home">
        <Header name="Home" title="FTC Scouting" description="Welcome! Sign up or log in to get started." height={82.5} />
      </div>
    </div>
  );
}