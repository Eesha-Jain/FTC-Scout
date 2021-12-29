//Code adapted from https://github.com/mgranados/simple-login

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateUser(db, teamnumber, auto, tele, teaminfo, endgame, best, callback) {
  const collection = db.collection('accounts');
  const dic = {
    teamnumber: teaminfo[0],
    teamname: teaminfo[1],
    state: teaminfo[2],
    email: teaminfo[3],
    notes: teaminfo[4],
    auto,
    tele,
    endgame,
    best
  };

  await collection.updateOne(
    { "teamnumber" : teamnumber },
    { $push: { "prematch" : dic } }
  );

  callback({created: true});
}

export default (req, res) => {
  if (req.method === 'POST') {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const auto = req.body.auto;
      const tele = req.body.tele;
      const teaminfo = req.body.teaminfo;
      const endgame = req.body.endgame;
      const best = req.body.best;
      const teamnumber = req.body.teamnumber;

      updateUser(db, teamnumber, auto, tele, teaminfo, endgame, best, function(creation) {
        if (creation.created) {
          return res.status(200).json({error: false});
        } else {
          return res.status(200).json({error: true});
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(400);
  }
};