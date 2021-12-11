const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, teamnumber, callback) {
  const collection = db.collection('accounts');
  collection.findOne({teamnumber}, callback);
}

export default (req, res) => {
  if (req.method === 'POST') {
    // verify teamnumber does not exist already
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const teamnumber = req.body.teamnumber;

      findUser(db, teamnumber, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error Finding User'});
          return;
        }
        if (user) {
          return res.status(200).json({
              error: false,
              email: user.email,
              teamname: user.teamname,
              teamnumber: user.teamnumber,
              state: user.state
          });
        } else {
          return res.status(403).json({error: true, message: "Account Doesn't Exist"});
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(400);
  }
};