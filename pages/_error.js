import { useEffect } from 'react';
import Header from '../components/header';
import cookie from 'js-cookie';

export default function Error() {
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
        <Header name="Home" title="Error" description="That page doesn't exist. Try going to another page." height={88.3} />
      </div>
    </div>
  );
}