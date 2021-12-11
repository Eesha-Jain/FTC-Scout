import React, { useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import Router from 'next/router';
import jwt_decode from "jwt-decode";

export default function Login() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [double, setDouble] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (password != double) {
        setMessage("Passwords must match.");
    }

    fetch('/api/setnew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, teamnumber: jwt_decode(Router.query.token).teamnumber})
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setMessage('Error: Try Again');
      } else {
        localStorage.setItem('reset', 'true');
        Router.push('/login');
      }
    })
  }

  return (
    <div>
      <div className="Reset">
        <Header name="Reset" title="Reset Password" description="Fill out the form below to reset your password." />

        <br />

        <div className="formborder">
          <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="password">New Password:  </label><br />
            <input name="password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <br />
            <br />
                    
            <label htmlFor="doublepassword">Type in New Password Again:  </label><br />
            <input name="doublepassword" id="doublepassword" type="password" onChange={(e) => setDouble(e.target.value)} value={double} required />

            <br />
            <br />

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="submit" type="submit">SUBMIT</button></div>

            <p id="message" style={{marginBottom: 0}}>{message}</p>
          </form>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};