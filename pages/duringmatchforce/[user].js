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
    teaminfo: ["", "", "", "", ""], //team1 name, team1 num, team2 name, team2 num, notes
    auto: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //robots in: warehouse complete, warehouse partial, storage unit complete, storage unit partial, ducks delivered, duck detected, tse detected, storage unit freight, level 1 freight, level 2 freight, level 3 freight
    tele: [0, 0, 0, 0], //storage unit, level 1, level 2, level 3
    endgame: [0, 0, 0, 0, true, true], //ducks delivered, ducks capped, hub balanced, hub tilted, robots completely parked, robots partially parked
    penalities: [0]
  });

  const [red, setRed] = useState({
    teaminfo: ["", "", "", ""], //team1 name, team1 num, team2 name, team2 num, notes
    auto: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //robots in: warehouse complete, warehouse partial, storage unit complete, storage unit partial, ducks delivered, duck detected, tse detected, storage unit freight, level 1 freight, level 2 freight, level 3 freight
    tele: [0, 0, 0, 0], //storage unit, level 1, level 2, level 3
    endgame: [0, 0, 0, 0, true, true], //ducks delivered, ducks capped, hub balanced, hub tilted, robots completely parked, robots partially parked
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
      body: JSON.stringify({teamnumber: user, blue, red})
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

  function update(side, i, value) {
    var dic = blue;
    if (side == "red") { dic = red; }

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

    if (side == "red") { setRed(dic); }
    else { setBlue(dic); }
  }

  useEffect(() => {
    if (!user) { return; }

    const getInfo = async () => {
      setContent(
      <div className="surround margin">
        <form onSubmit={addTeam}>
          <div className="interior margin">
            <h1>Team Information</h1>
            <div className="box margin" style={{width: 'fit-content'}}>
              <table className="capability info"><tbody>
                <tr>
                  <td><label>Team Number: </label></td>
                  <td><input type="number" min="0" value={teaminfo[0] || ''} onChange={(e) => update(4, 0, Number(e.target.value))} required/></td>
                </tr>

                <tr>
                  <td><label>Team Name: </label></td>
                  <td><input type="text" value={teaminfo[1]} onChange={(e) => update(4, 1, e.target.value)} required/></td>
                </tr>

                <tr>
                  <td><label>Team State: </label></td>
                  <td><input type="text" value={teaminfo[2]} onChange={(e) => update(4, 2, e.target.value)}/></td>
                </tr>

                <tr>
                  <td><label>Team Email: </label></td>
                  <td><input type="text" value={teaminfo[3]} onChange={(e) => update(4, 3, e.target.value)}/></td>
                </tr>
              </tbody></table>
            </div>
          </div>

          <br />
          <br />

          <div className="interior margin">
            <h1>Capabilities</h1>
            <div className="center">
              <div className="grid margin">
                <div className="box">
                  <h4>Autonomous</h4>
                  <table className="capability"><tbody>
                    <tr>
                      <td><input type="checkbox" checked={auto[0]} onChange={() => update(1, 0, !auto[0])}/></td>
                      <td><label>Delivered Duck via Carousel</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[1]} onChange={() => update(1, 1, !auto[1])}/></td>
                      <td><label>Parked Completely in Alliance Storage Unit</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[2]} onChange={() => update(1, 2, !auto[2])}/></td>
                      <td><label>Parked Partially in Alliance Storage Unit</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[3]} onChange={() => update(1, 3, !auto[3])}/></td>
                      <td><label>Parked Completely in Warehouse</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[4]} onChange={() => update(1, 4, !auto[4])}/></td>
                      <td><label>Parked Partially in Warehouse</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[5]} onChange={() => update(1, 5, !auto[5])}/></td>
                      <td><label>Duck Detect Shipping Hub Level</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={auto[6]} onChange={() => update(1, 6, !auto[6])}/></td>
                      <td><label>Team Storing Element Detect Hub Level</label><br /></td>
                    </tr>
                  </tbody></table>

                  <br />

                  <table className="capability"><tbody>
                    <tr>
                      <td><label>Freight in Alliance Storage Unit: </label></td>
                      <td><input type="number" min="0" max="100" value={auto[7] || ''} onChange={(e) => update(1, 7, Number(e.target.value))} required/></td>
                    </tr>

                    <tr>
                      <td><label>Freight on Alliance Shipping Hub: </label></td>
                      <td><input type="number" min="0" max="100" value={auto[8] || ''} onChange={(e) => update(1, 8, Number(e.target.value))} required/></td>
                    </tr>
                  </tbody></table>
                </div>

                <div className="box">
                  <h4>Tele-Op</h4>
                  <table className="capability"><tbody>
                    <tr>
                      <td><label>Freight in Alliance Storage Unit: </label></td>
                      <td><input type="number" min="0" max="100" value={tele[0] || ''} onChange={(e) => update(2, 0, Number(e.target.value))} required/></td>
                    </tr>

                    <tr>
                      <td><label>Alliance Shipping Hub - Level 1: </label></td>
                      <td><input type="number" min="0" max="100" value={tele[1] || ''} onChange={(e) => update(2, 1, Number(e.target.value))} required/></td>
                    </tr>

                    <tr>
                      <td><label>Alliance Shipping Hub - Level 2: </label></td>
                      <td><input type="number" min="0" max="100" value={tele[2] || ''} onChange={(e) => update(2, 2, Number(e.target.value))} required/></td>
                    </tr>

                    <tr>
                      <td><label>Alliance Shipping Hub - Level 3: </label></td>
                      <td><input type="number" min="0" max="100" value={tele[3] || ''} onChange={(e) => update(2, 3, Number(e.target.value))} required/></td>
                    </tr>

                    <tr>
                      <td><label>Shared Shipping Hub: </label></td>
                      <td><input type="number" min="0" max="100" value={tele[4] || ''} onChange={(e) => update(2, 4, Number(e.target.value))} required/></td>
                    </tr>
                  </tbody></table>
                </div>

                <div className="box">
                  <h4>Endgame</h4>
                  <table className="capability"><tbody>
                    <tr>
                      <td><input type="checkbox" checked={endgame[0]} onChange={() => update(3, 0, !endgame[0])}/></td>
                      <td><label>Alliance Shipping Hub Balanced</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={endgame[1]} onChange={() => update(3, 1, !endgame[1])}/></td>
                      <td><label>Shared Shipping Hub Tipped towards Alliance</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={endgame[2]} onChange={() => update(3, 2, !endgame[2])}/></td>
                      <td><label>Alliance Shipping Hub Capped</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={endgame[3]} onChange={() => update(3, 3, !endgame[3])}/></td>
                      <td><label>Parked Completely in Warehouse</label><br /></td>
                    </tr>

                    <tr>
                      <td><input type="checkbox" checked={endgame[4]} onChange={() => update(3, 4, !endgame[4])}/></td>
                      <td><label>Parked Partially in Warehouse</label><br /></td>
                    </tr>
                  </tbody></table>

                  <br />

                  <table className="capability"><tbody>
                    <tr>
                      <td><label>Delivery via Carousel: </label></td>
                      <td><input type="number" min="0" max="100" value={endgame[5] || ''} onChange={(e) => update(3, 5, Number(e.target.value))} required/></td>
                    </tr>
                  </tbody></table>
                </div>

                <div className="box">
                  <h4>Matches</h4>
                  <table className="capability"><tbody>
                    <tr>
                      <td><label>Best Score: </label></td>
                      <td><input type="number" min="0" max="1000" value={best[0] || ''} onChange={(e) => update(5, 0, Number(e.target.value))} required/></td>
                    </tr>
                  </tbody></table>
                </div>
              </div>
            </div>
          </div>

          <div className="interior margin">
            <h1>Additional Notes</h1>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><textarea rows="10" placeholder="Enter your message..." value={notes} onChange={setNotes}></textarea></div>
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
    <div className="Form">
      <Top name="New DuringMatch" />
      <Nav name="DuringMatchForm" user={user} />
      <div className="outside">{content}</div>
      <Footer />
    </div>
  );
};