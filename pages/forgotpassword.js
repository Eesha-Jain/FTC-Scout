import React, { useState } from 'react';
import Footer from '../components/footer';
import Header from '../components/header';

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [teamnumber, setteamnumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    fetch('/api/fpcheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber})
    }).then(res => res.json()).then((data) => {
      if (data && data.error) {
        setMessage('ERROR: ' + data.message);
      } else {
          setMessage("Successfully Sent. Check your email inbox.");
      }
    })
  }

  return (
    <div>
      <div className="ForgotPassword">
        <Header name="ForgotPassword" title="Forgot Password" description="Fill out the form below to send a reset password email." />

        <br />

        <div className="formborder">
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="number">Team Number:  </label><br/>
            <input name="number" id="number" type="number" onChange={(e) => setteamnumber(e.target.value)} value={teamnumber} required />

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