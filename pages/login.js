import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Router from 'next/router';
import cookie from 'js-cookie';
import jwt_decode from "jwt-decode";

export default function Login() {
  const [message, setMessage] = useState("");
  const [teamnumber, setteamnumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem('reset') == 'true') {
      alert("Password Successfully Reset");
      localStorage.removeItem('reset');
    }

    if (cookie.get('token') !== undefined) {
      var teamnumber = jwt_decode(cookie.get('token')).teamnumber;
      if (teamnumber != undefined) {
        Router.push('/account/' + teamnumber);
        localStorage.setItem('loggedIn', 'true');
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber, password})
    }).then(res => res.json()).then((data) => {
      if (data && data.error) {
        setMessage('ERROR: ' + data.message);
      }
      if (data && data.token) {
        cookie.set('token', data.token, {expires: 2});
        Router.push('/account/' + teamnumber);
      }
    })
  }

  return (
    <div>
      <div className="Login">
        <Header name="LogIn" title="Log-In" description="Log into your account below." />

        <br />

        <div className="formborder">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="number">Team Number:  </label><br/>
            <input name="number" id="number" type="number" onChange={(e) => setteamnumber(e.target.value)} value={teamnumber} required />

            <br />
            <br />
                    
            <label htmlFor="password">Password:  </label><br />
            <input name="password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <br />
            <br />

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="submit" type="submit">SUBMIT</button></div>
            
            <button onClick={() => {Router.push('/forgotpassword')}} className="forgotpassword">Forgot Password?</button>
            <p id="message" style={{marginBottom: 0}}>{message}</p>
          </form>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};