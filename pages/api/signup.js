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

function findUser(db, teamnumber, callback) {
  const collection = db.collection('accounts');
  collection.findOne({teamnumber}, callback);
}

function createUser(db, email, password, teamnumber, teamname, state, callback) {
  const collection = db.collection('accounts');
  bcrypt.hash(password, 10, function(err, hash) {
    collection.insertOne(
      {
        userId: v4(),
        date: new Date(),
        email: email.trim(),
        password: hash,
        teamname: teamname.trim(),
        teamnumber,
        state: state.trim(),
        notes: "",
        auto: [false, false, false, false, false, false, false, 0, 0],
        tele: [0, 0, 0, 0, 0],
        endgame: [false, false, false, false, false, 0],
        best: [0],
        prematch: [],
        duringmatch: []
      },
      function(err, userCreated) {
        assert.equal(err, null);
        callback({
          created: true,
          userId: userCreated.insertedId,
          email: email
        });
      },
    );
  });
}

export default (req, res) => {
  if (req.method === 'POST') {
    // verify teamnumber does not exist already
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const email = req.body.email;
      const password = req.body.password;
      const teamnumber = req.body.teamnumber;

      findUser(db, teamnumber, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error Finding User'});
          return;
        }
        if (!user) {
          // proceed to Create
          createUser(db, email, password, teamnumber, req.body.teamname, req.body.state, function(creation) {
            if (creation.created) {
              const token = jwt.sign(
                {userId: creation.userId, teamnumber: creation.teamnumber},
                process.env.JWT_SECRET,
                { expiresIn: 3000 },
              );
              return res.status(200).json({token: token});
            }
          });
        } else {
          // User exists
          return res.status(403).json({error: true, message: 'Team Already Has an Account'});
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.status(400);
  }
};