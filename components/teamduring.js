import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

export default function Team({teamnumber, blue, red, index, notes}) {
  const width = 18;

  const deleteEntry = (e) => {
    e.preventDefault();

    fetch('/api/deleteduring', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber, blue, red})
    }).then(res => res.json()).then((data) => {
      window.location.reload(false);
    })
  };

  return (
    <div className="Team" id="DuringTeam">
      <div className="surroundingBox">

        <h2>Match {index + 1}</h2>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><button onClick={deleteEntry}>DELETE ENTRY</button></div>

        <div className="blue teambox">
          <div className="grid-item">
            <h2>Blue Alliance</h2>
            <p className="score"><b>Score</b> - {blue.teaminfo[4]}</p>
            <p className="score"><b>Penalities</b> - {blue.penalities[0]}</p>
            <p className="score"><b>{blue.teaminfo[1]}</b> - {blue.teaminfo[0].toUpperCase()}</p>
            <p className="score"><b>{blue.teaminfo[3]}</b> - {blue.teaminfo[2].toUpperCase()}</p>
          </div>
          
          <div className="grid-item">
            <h4>Autonomous</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[0]}</p>&nbsp;&nbsp; <p>Robots fully Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[1]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[2]}</p>&nbsp;&nbsp; <p>Robots Fully Parked in Storage Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[3]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Storage Unit</p></span>
            <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={blue.auto[4] ? faCheckSquare : faSquare} width={width}/> &nbsp;Duck Delivered from Carousel</p>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[5]}</p>&nbsp;&nbsp; <p>Ducks on Right Shipped Hub Level</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[6]}</p>&nbsp;&nbsp; <p>TSE on Right Shipped Hub Level</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[7]}</p>&nbsp;&nbsp; <p>Freight in Shipping Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.auto[8]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub</p></span>
          </div>
    
          <div className="grid-item">
            <h4>Tele-Op</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.tele[0]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.tele[1]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 1</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.tele[2]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 2</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.tele[3]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 3</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.tele[4]}</p>&nbsp;&nbsp; <p>Shared Shipping Hub</p></span>
          </div>
    
          <div className="grid-item">
            <h4>Endgame</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.endgame[0]}</p>&nbsp;&nbsp; <p>Ducks Delivered via Carousel</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.endgame[1]}</p>&nbsp;&nbsp; <p>TSE Capped on Alliance Shipping Hub</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.endgame[2]}</p>&nbsp;&nbsp; <p>Robots Completely Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{blue.endgame[3]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Warehouse</p></span>
            <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={blue.endgame[4] ? faCheckSquare : faSquare} width={width}/> &nbsp;Shared Shipping Hub Tilted</p>
          </div>
        </div>

        <div className="red teambox">
          <div className="grid-item">
            <h2>Red Alliance</h2>
            <p className="score"><b>Score</b> - {red.teaminfo[4]}</p>
            <p className="score"><b>Penalities</b> - {red.penalities[0]}</p>
            <p className="score"><b>{red.teaminfo[1]}</b> - {red.teaminfo[0].toUpperCase()}</p>
            <p className="score"><b>{red.teaminfo[3]}</b> - {red.teaminfo[2].toUpperCase()}</p>
          </div>
          
          <div className="grid-item">
            <h4>Autonomous</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[0]}</p>&nbsp;&nbsp; <p>Robots fully Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[1]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[2]}</p>&nbsp;&nbsp; <p>Robots Fully Parked in Storage Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[3]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Storage Unit</p></span>
            <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={red.auto[4] ? faCheckSquare : faSquare} width={width}/> &nbsp;Duck Delivered from Carousel</p>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[5]}</p>&nbsp;&nbsp; <p>Ducks on Right Shipped Hub Level</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[6]}</p>&nbsp;&nbsp; <p>TSE on Right Shipped Hub Level</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[7]}</p>&nbsp;&nbsp; <p>Freight in Shipping Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.auto[8]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub</p></span>
          </div>
    
          <div className="grid-item">
            <h4>Tele-Op</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.tele[0]}</p>&nbsp;&nbsp; <p>Freight in Alliance Storage Unit</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.tele[1]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 1</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.tele[2]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 2</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.tele[3]}</p>&nbsp;&nbsp; <p>Freight in Alliance Shipping Hub - Level 3</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.tele[4]}</p>&nbsp;&nbsp; <p>Shared Shipping Hub</p></span>
          </div>
    
          <div className="grid-item">
            <h4>Endgame</h4>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.endgame[0]}</p>&nbsp;&nbsp; <p>Ducks Delivered via Carousel</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.endgame[1]}</p>&nbsp;&nbsp; <p>TSE Capped on Alliance Shipping Hub</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.endgame[2]}</p>&nbsp;&nbsp; <p>Robots Completely Parked in Warehouse</p></span>
            <span style={{display: 'flex', alignItems: 'center'}}><p className="box">{red.endgame[3]}</p>&nbsp;&nbsp; <p>Robots Partially Parked in Warehouse</p></span>
            <p style={{display: 'flex', alignItems: 'center'}}><FontAwesomeIcon icon={red.endgame[4] ? faCheckSquare : faSquare} width={width}/> &nbsp;Shared Shipping Hub Tilted</p>
          </div>
        </div>

        <div>
          <h2>Notes</h2>
          {
            notes.split("\n").map(function(item, idx) {
              return (
                <div key={idx}>
                  <p style={{fontWeight: 300}}>{item}</p>
                </div>
                )
            })
          }
        </div>
      </div>
    </div>
  );
}