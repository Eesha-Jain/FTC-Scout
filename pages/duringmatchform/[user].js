import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import Footer from '../../components/footer';

export default function DuringMatchForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { user } = router.query;
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);

  const [blue, setBlue] = useState({
    teaminfo: ["", "", "", "", 0], //team1 name, team1 num, team2 name, team2 num, totalscore
    auto: [0, 0, 0, 0, false, 0, 0, 0, 0], //robots in: warehouse complete, warehouse partial, storage unit complete, storage unit partial, ducks delivered, duck detected, tse detected, storage unit freight, alliance freight
    tele: [0, 0, 0, 0, 0], //storage unit, level 1, level 2, level 3, shared hub
    endgame: [0, 0, 0, 0, false, false], //ducks delivered, ducks capped, robots completely parked, robots partially parked, hub balanced, hub tilted
    penalities: [0]
  });

  const [red, setRed] = useState({
    teaminfo: ["", "", "", "", 0], //team1 name, team1 num, team2 name, team2 num, totalscore
    auto: [0, 0, 0, 0, false, 0, 0, 0, 0], //robots in: warehouse complete, warehouse partial, storage unit complete, storage unit partial, ducks delivered, duck detected, tse detected, storage unit freight, alliance freight
    tele: [0, 0, 0, 0, 0], //storage unit, level 1, level 2, level 3, shared hub
    endgame: [0, 0, 0, 0, false, false], //ducks delivered, ducks capped, robots completely parked, robots partially parked, hub balanced, hub tilted
    penalities: [0]
  });

  const [notes, setNotes] = useState("");

  const addTeam = (e) => {
    e.preventDefault();
    setMessage("Loading...");

    fetch('/api/duringmatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber: user, blue, red, notes})
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setMessage('Error: Try Again');
      } else {
        setMessage('Saved!');
        router.push({
          pathname: '/duringmatch/[user]',
          query: { user: user },
        })
      }
    })
  };

  function update(side, round, i, value) {
    var dic = {...blue};
    if (side == "red") { dic = {...red}; }

    if (round == 1) {
      dic.teaminfo[i] = value;
    } else if (round == 2) {
      dic.auto[i] = value;
    } else if (round == 3) {
      dic.tele[i] = value;
    } else if (round == 4) {
      dic.endgame[i] = value;
    } else {
      dic.penalities[i] = value;
    }

    dic.teaminfo[4] = dic.auto[0] * 10 + dic.auto[1] * 5 + dic.auto[2] * 6 + dic.auto[3] * 3 + Number(dic.auto[4]) * 10 + dic.auto[5] * 10 + dic.auto[6] * 20 + dic.auto[7] * 2 + dic.auto[8] * 6 + dic.tele[0] * 1 + dic.tele[1] * 2 + dic.tele[2] * 4 + dic.tele[3] * 6 + dic.tele[4] * 4 + dic.endgame[0] * 6 + dic.endgame[1] * 15 + dic.endgame[2] * 10 + dic.endgame[3] * 20 + dic.endgame[4] * 6 + dic.endgame[5] * 3 - dic.penalities[0];

    console.log(dic.auto);

    if (side == "red") { setRed(dic); }
    else { setBlue(dic); }
  }

  useEffect(() => {
    if (!user) { return; }

    const getInfo = async () => {
      setContent(
      <div className="surround margin">
        <form onSubmit={addTeam}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div className="grid">
            <div className="blue teamsearch">
              <div>
                <h2>BLUE ALLIANCE</h2>
                <p className="score"><b>Score:</b> {blue.teaminfo[4]}</p>
              </div>

              <div>
                <h4>Team Information</h4>
                <table className="capability info"><tbody>
                  <tr>
                    <td><label>Team 1 Name: </label></td>
                    <td><input type="text" value={blue.teaminfo[0]} onChange={(e) => update("blue", 1, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 1 Number: </label></td>
                    <td><input type="number" min="0" value={blue.teaminfo[1]} onChange={(e) => update("blue", 1, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 2 Name: </label></td>
                    <td><input type="text" value={blue.teaminfo[2]} onChange={(e) => update("blue", 1, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 2 Number: </label></td>
                    <td><input type="number" min="0" value={blue.teaminfo[3]} onChange={(e) => update("blue", 1, 3, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
              
              <div>
                <h4>Autonomous</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Number of Robots Fully Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[0]} placeholder="" onChange={(e) => update("blue", 2, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[1]} onChange={(e) => update("blue", 2, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Fully Parked in Storage Unit: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[2]} onChange={(e) => update("blue", 2, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Storage Unit: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[3]} onChange={(e) => update("blue", 2, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Duck Delivered from Carousel</label></td>
                    <td><input type="checkbox" checked={blue.auto[4]} onChange={() => update("blue", 2, 4, !blue.auto[4])}/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Ducks on Right Shipped Hub Level: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[5]} onChange={(e) => update("blue", 2, 5, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of TSE on Right Shipped Hub Level: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.auto[6]} onChange={(e) => update("blue", 2, 6, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight in Shipping Unit: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.auto[7]} onChange={(e) => update("blue", 2, 7, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.auto[8]} onChange={(e) => update("blue", 2, 8, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
        
              <div>
                <h4>Tele-Op</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Freight in Shipping Unit: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.tele[0]} onChange={(e) => update("blue", 3, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 1: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.tele[1]} onChange={(e) => update("blue", 3, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 2: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.tele[2]} onChange={(e) => update("blue", 3, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 3: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.tele[3]} onChange={(e) => update("blue", 3, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Shared Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="100" value={blue.tele[4]} onChange={(e) => update("blue", 3, 4, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
        
              <div>
                <h4>Endgame</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Ducks Delivered on Carousel: </label></td>
                    <td><input type="number" min="0" max="11" value={blue.endgame[0]} onChange={(e) => update("blue", 4, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of TSE Capped on Alliance Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.endgame[1]} onChange={(e) => update("blue", 4, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Completely Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.endgame[2]} onChange={(e) => update("blue", 4, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={blue.endgame[3]} onChange={(e) => update("blue", 4, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Alliance Shipping Hub Balanced</label></td>
                    <td><input type="checkbox" checked={blue.endgame[4]} onChange={() => update("blue", 4, 4, !blue.endgame[4])}/></td>
                  </tr>

                  <tr>
                    <td><label>Shared Shipping Hub Tilted</label></td>
                    <td><input type="checkbox" checked={blue.endgame[5]} onChange={() => update("blue", 4, 5, !blue.endgame[5])}/></td>
                  </tr>
                </tbody></table>
              </div>

              <div>
                <h4>Penalities</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Penalty Points: </label></td>
                    <td><input type="number" min="0" max="1000" value={blue.penalities[0]} onChange={(e) => update("blue", 5, 0, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
            </div>

            <div className="red teamsearch">
              <div>
                <h2>RED ALLIANCE</h2>
                <p className="score"><b>Score:</b> {red.teaminfo[4]}</p>
              </div>

              <div>
                <h4>Team Information</h4>
                <table className="capability info"><tbody>
                  <tr>
                    <td><label>Team 1 Name: </label></td>
                    <td><input type="text" value={red.teaminfo[0]} onChange={(e) => update("red", 1, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 1 Number: </label></td>
                    <td><input type="number" min="0" value={red.teaminfo[1]} onChange={(e) => update("red", 1, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 2 Name: </label></td>
                    <td><input type="text" value={red.teaminfo[2]} onChange={(e) => update("red", 1, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Team 2 Number: </label></td>
                    <td><input type="number" min="0" value={red.teaminfo[3]} onChange={(e) => update("red", 1, 3, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
              
              <div>
                <h4>Autonomous</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Number of Robots Fully Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[0]} onChange={(e) => update("red", 2, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[1]} onChange={(e) => update("red", 2, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Fully Parked in Storage Unit: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[2]} onChange={(e) => update("red", 2, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Storage Unit: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[3]} onChange={(e) => update("red", 2, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Duck Delivered from Carousel</label></td>
                    <td><input type="checkbox" checked={red.auto[4]} onChange={() => update("red", 2, 4, !red.auto[4])}/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Ducks on Right Shipped Hub Level: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[5]} onChange={(e) => update("red", 2, 5, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of TSE on Right Shipped Hub Level: </label></td>
                    <td><input type="number" min="0" max="2" value={red.auto[6]} onChange={(e) => update("red", 2, 6, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight in Shipping Unit: </label></td>
                    <td><input type="number" min="0" max="100" value={red.auto[7]} onChange={(e) => update("red", 2, 7, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="100" value={red.auto[8]} onChange={(e) => update("red", 2, 8, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
        
              <div>
                <h4>Tele-Op</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Freight in Shipping Unit: </label></td>
                    <td><input type="number" min="0" max="100" value={red.tele[0]} onChange={(e) => update("red", 3, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 1: </label></td>
                    <td><input type="number" min="0" max="100" value={red.tele[1]} onChange={(e) => update("red", 3, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 2: </label></td>
                    <td><input type="number" min="0" max="100" value={red.tele[2]} onChange={(e) => update("red", 3, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Alliance Shipping Hub - Level 3: </label></td>
                    <td><input type="number" min="0" max="100" value={red.tele[3]} onChange={(e) => update("red", 3, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Freight on Shared Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="100" value={red.tele[4]} onChange={(e) => update("red", 3, 4, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
        
              <div>
                <h4>Endgame</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Ducks Delivered on Carousel: </label></td>
                    <td><input type="number" min="0" max="11" value={red.endgame[0]} onChange={(e) => update("red", 4, 0, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of TSE Capped on Alliance Shipping Hub: </label></td>
                    <td><input type="number" min="0" max="2" value={red.endgame[1]} onChange={(e) => update("red", 4, 1, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Completely Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={red.endgame[2]} onChange={(e) => update("red", 4, 2, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Number of Robots Partially Parked in Warehouse: </label></td>
                    <td><input type="number" min="0" max="2" value={red.endgame[3]} onChange={(e) => update("red", 4, 3, e.target.value)} required/></td>
                  </tr>

                  <tr>
                    <td><label>Alliance Shipping Hub Balanced</label></td>
                    <td><input type="checkbox" checked={red.endgame[4]} onChange={() => update("red", 4, 4, !red.endgame[4])}/></td>
                  </tr>

                  <tr>
                    <td><label>Shared Shipping Hub Tilted</label></td>
                    <td><input type="checkbox" checked={red.endgame[5]} onChange={() => update("red", 4, 5, !red.endgame[5])}/></td>
                  </tr>
                </tbody></table>
              </div>

              <div>
                <h4>Penalities</h4>
                <table className="capability"><tbody>
                  <tr>
                    <td><label>Penalty Points: </label></td>
                    <td><input type="number" min="0" max="1000" value={red.penalities[0]} onChange={(e) => update("red", 5, 0, e.target.value)} required/></td>
                  </tr>
                </tbody></table>
              </div>
            </div>
          </div></div>

          <div className="interior margin">
            <h1>Additional Notes</h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><textarea rows="10" placeholder="Enter your message..." value={notes} onChange={(e) => {setNotes(e.target.value)}}></textarea></div>
          </div>

          <br />

          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}><button id="submit" className="save" type="submit">Submit</button></div>
          <p id="message" style={{marginBottom: 0, marginTop: 0, textAlign: 'center'}}>{message}</p>
        </form>
      </div>);
    }

    if ((cookie.get('token') === undefined) || (jwt_decode(cookie.get('token')).teamnumber != user)) {
      localStorage.setItem('redirected', 'true');
      Router.push('/');
    } else {
      getInfo();
    }

    if (localStorage.getItem('loggedIn') == 'true') {
      alert("Already logged into " + user);
      localStorage.removeItem('loggedIn');
    }
  }, [user, blue, red, notes]);

  return (
    <div id="DuringMatchForm" className="Form">
      <Top name="New DuringMatch" />
      <Nav name="DuringMatchForm" user={user} />
      <div className="outside">{content}</div>
      <Footer />
    </div>
  );
};