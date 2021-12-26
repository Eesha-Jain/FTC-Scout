import React, { useEffect, useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Router from 'next/router';
import cookie from 'js-cookie';
import jwt_decode from "jwt-decode";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [teamnumber, setTeamNumber] = useState();
  const [teamname, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
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

  const verification = (e) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("ERROR: Password length must be greater than 6");
    } else {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, teamnumber, teamname, state}),
      }).then(req => req.json()).then((res) => {
        if (res && res.error) {
          setMessage('ERROR: ' + res.message);
        }
        if (res && res.token) {
          cookie.set('token', res.token, {expires: 2});
          Router.push('/login');
        }
      });
    }
  }

  return (
    <div>
      <div className="Signup">
        <Header name="SignUp" title="Sign-Up" description="Sign up to FTC Scouting below." />

        <br />

        <div className="formborder">
          <form className="form">
          <p style={{textAlign: 'center'}}>Please Create One Account Per Team</p>
            <label htmlFor="teamnumber">Team Number: </label><br/>
            <input name="teamnumber" id="teamnumber" type="number" onChange={(e) => setTeamNumber(e.target.value)} value={teamnumber} required />

            <br />
            <br />

            <label htmlFor="teamname">Team Name: </label><br/>
            <input name="teamname" id="teamname" type="text" onChange={(e) => setTeamName(e.target.value)} value={teamname} required />

            <br />
            <br />

            <label htmlFor="email">Email: </label><br/>
            <input name="email" id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />

            <br />
            <br />

            <label htmlFor="state">State: </label><br/>
            <input name="state" id="state" type="text" onChange={(e) => setState(e.target.value)} value={state} required />

            <br />
            <br />

            <label htmlFor="password">Password:  </label><br />
            <input name="password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <br />
            <br />

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="submit" type="submit" onClick={verification}>SUBMIT</button></div>

            <p id="message" style={{marginBottom: 0, textAlign: 'center'}}>{message}</p>
          </form>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};