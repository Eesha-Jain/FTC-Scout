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
            <select name="state" id="state" onChange={(e) => setState(e.target.value)} value={state} required>
              <optgroup label="United States of America">
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="District of Columbia">District Of Columbia</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </optgroup>
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Israel">Israel</option>
              <option value="India">India</option>
              <option value="Mexico">Mexico</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Turkey">Turkey</option>
              <option value="OTHER">OTHER</option>
            </select>	

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