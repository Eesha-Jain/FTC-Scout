import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { Router } from 'next/router';

export default function Team({user, teamnumber, prematch}) {
  const width = 18;

  const deleteEntry = (e) => {
    e.preventDefault();

    fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber, user})
    }).then(res => res.json()).then((data) => {
      window.location.reload(false);
    })
  };

  return (
    <div className="Team">
      <div className="teamsearch">
        <div>
          <h2>{user.teamnumber} - {user.teamname.toUpperCase()}</h2>
          <p><b>State:</b> {user.state}</p>
          <p><b>Email:</b> <a href={`mailto:${user.email}`} style={{color: 'orange'}}>{user.email}</a></p>

          <br />
          <p><b>Best Score:</b> {user.best[0]}</p>
          { user.best[1] ? <p><b>Robot Can Go Over Pipes? </b> {user.best[1] ? "Yes" : "No"}</p> : <></> }

          {prematch ? <div><br /><button onClick={deleteEntry}>DELETE ENTRY</button></div> : <></>}
        </div>
        
        <div>
          <h4>Autonomous</h4>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[0] ? faCheckSquare : faSquare} width={width}/> &nbsp; Delivered Duck via Carousel</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[1] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Alliance Storage Unit</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[2] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Alliance Storage Unit</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[3] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Warehouse</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[4] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Warehouse</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[5] ? faCheckSquare : faSquare} width={width}/> &nbsp; Duck Detect Shipping Hub Level</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.auto[6] ? faCheckSquare : faSquare} width={width}/> &nbsp; Team Storing Element Detect Hub Level</p>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.auto[7]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.auto[8]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub</p></span>
        </div>
  
        <div>
          <h4>Tele-Op</h4>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[0]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[1]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 1</p></span>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[2]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 2</p></span>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[3]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 3</p></span>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[4]}</p>&nbsp;&nbsp; <p>Shared Shipping Hub</p></span>
          { user.tele[5] ? <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.tele[5]}</p>&nbsp;&nbsp; <p>Average Cycle Speed (sec)</p></span> : <></> }
        </div>
  
        <div>
          <h4>Endgame</h4>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[0] ? faCheckSquare : faSquare} width={width}/> &nbsp; Alliance Shipping Hub Balanced</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[1] ? faCheckSquare : faSquare} width={width}/> &nbsp; Shared Shipping Hub Tipped towards Alliance</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[2] ? faCheckSquare : faSquare} width={width}/> &nbsp; Alliance Shipping Hub Capped</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[3] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Completely in Warehouse</p>
          <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={user.endgame[4] ? faCheckSquare : faSquare} width={width}/> &nbsp; Parked Partially in Warehouse</p>
          <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{user.endgame[5]}</p>&nbsp;&nbsp; <p>Delivery via Carousel</p></span>
        </div>

        {user.notes ? <div>
          <h2>Notes</h2>
          {
            user.notes.split("\n").map(function(item, idx) {
              return (
                <div key={idx}>
                  <p style={{fontWeight: 300}}>{item}</p>
                </div>
                )
            })
          }
        </div>:<></>}
      </div>
    </div>
  );
}