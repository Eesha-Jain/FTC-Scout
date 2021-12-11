import Link from 'next/link';
import Top from '../../components/top';
import Nav from '../../components/navV2';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

export default function Account () {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { user } = router.query;
  const [content, setContent] = useState(<p style={{textAlign: 'center'}}>Loading...</p>);
  const [teamnumber, setTeamNumber] = useState(0);
  const [auto, setAuto] = useState([false, false, false, false, false, false, false, 0, 0]);
  const [tele, setTele] = useState([0, 0, 0, 0]);
  const [endgame, setEndgame] = useState([false, false, false, false, false, 0, 0, 0, 0, 0]);
  const [best, setBest] = useState([0]);

  const updateAuto = (e) => {
    e.preventDefault();
    setMessage("");

    fetch('/api/auto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({teamnumber, auto})
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        setMessage('Error: Try Again');
      } else {
        setMessage('Saved!');
        setTimeout(() => { setMessage(""); }, 4000);
      }
    })
  };
  
  const updateTele = () => {

  }

  const updateEnd = () => {

  }

  const bestScore = () => {

  }

  function update(round, valIndex, value) {
    if (round == 1) {
      let arr = [auto[0], auto[1], auto[2], auto[3], auto[4], auto[5], auto[6], auto[7], auto[8]];
      arr[valIndex] = value;
      setAuto(arr);
    } else if (round == 2) {
      let arr = [tele[0], tele[1], tele[2], tele[3]];
      arr[valIndex] = value;
      setTele(arr);
    } else if (round == 3) {
      let arr = [endgame[0], endgame[1], endgame[2], endgame[3], endgame[4], endgame[5]];
      arr[valIndex] = value;
      setEndgame(arr);
    } else {
      let arr = [drop4[0]];
      arr[valIndex] = value;
      setBest(arr);
    }
  }

  useEffect(() => {
    if (!user) { return; }

    const getInfo = async () => {
      fetch('/api/getinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({teamnumber: user})
      }).then(res => res.json()).then(async (data) => {
        setTeamNumber(data.teamnumber);
        setContent(
          <div className="surround margin">
          <div className="interior margin">
            <h1>{data.teamname.toUpperCase()}</h1>
            <div className="box margin" style={{width: 'fit-content'}}>
              <p><u>Team Number</u>: {data.teamnumber}</p>
              <p><u>Email</u>: {data.email}</p>
              <p><u>State</u>: {data.state}</p>
            </div>
          </div>

          <br />
          <br />

          <div className="interior margin">
            <h1>CAPABILITIES</h1>
            <p id="message" style={{marginBottom: 20, marginTop: 0, textAlign: 'center'}}>{message}</p>
            <div className="center">
              <div className="grid margin">
                <div className="box">
                  <h4>Autonomous</h4>
                  <form onSubmit={updateAuto}>
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
                        <td><label>Freight on Alliance Storage Unit: </label></td>
                        <td><input type="number" min="0" max="100" value={auto[7]} onChange={(e) => update(1, 7, Number(e.target.value))}/></td>
                      </tr>

                      <tr>
                        <td><label>Freight on Alliance Shipping Hub: </label></td>
                        <td><input type="number" min="0" max="100" value={auto[8]} onChange={(e) => update(1, 8, Number(e.target.value))}/></td>
                      </tr>
                    </tbody></table>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0}}><button id="submit" className="save" type="submit">Save Data</button></div>
                  </form>
                </div>

                <div className="box">
                  <h4>Tele-Op</h4>
                  <form>
                    <table className="capability"><tbody>
                      <tr>
                        <td><label>Freight on Alliance Storage Unit: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 1: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 2: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 3: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>
                    </tbody></table>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="save" type="submit">Save Data</button></div>
                  </form>
                </div>

                <div className="box">
                  <h4>Endgame</h4>
                  <form>
                    <table className="capability"><tbody>
                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><label>Alliance Shipping Hub Balanced</label><br /></td>
                      </tr>

                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><label>Shared Shipping Hub Tipped towards Alliance</label><br /></td>
                      </tr>

                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><label>Alliance Shipping Hub Capped</label><br /></td>
                      </tr>

                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><label>Parked Completely in Warehouse</label><br /></td>
                      </tr>

                      <tr>
                        <td><input type="checkbox" /></td>
                        <td><label>Parked Partially in Warehouse</label><br /></td>
                      </tr>
                    </tbody></table>

                    <br />

                    <table className="capability"><tbody>
                      <tr>
                        <td><label>Delivery via Carousel: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Freight on Alliance Storage Unit: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 1: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 2: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>

                      <tr>
                        <td><label>Alliance Shipping Hub - Level 3: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>
                    </tbody></table>

                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="save" type="submit">Save Data</button></div>
                  </form>
                </div>

                <div className="box">
                  <h4>Matches</h4>
                  <form>
                    <table className="capability"><tbody>
                      <tr>
                        <td><label>Best Score: </label></td>
                        <td><input type="number" min="0" max="100" /><br /></td>
                      </tr>
                    </tbody></table>
                    
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button id="submit" className="save" type="submit">Save Data</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </div>
        );
      })
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
  }, [user, auto, tele, endgame]);

  return (
    <div className="Account">
      <Top name="Account" />
      <Nav name="Account" user={user} />
      <div className="outside">{content}</div>
    </div>
  );
};