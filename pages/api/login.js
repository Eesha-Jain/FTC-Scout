//Code adapted from https://github.com/mgranados/simple-login

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function findUser(db, teamnumber, callback) {
  const collection = db.collection('accounts');
  collection.findOne({teamnumber}, callback);
}

function authUser(db, teamnumber, password, hash, callback) {
  bcrypt.compare(password, hash, callback);
}

export default (req, res) => {
  if (req.method === 'POST') {
    //login
    try {
      assert.notEqual(null, req.body.teamnumber, 'Team Number required');
      assert.notEqual(null, req.body.password, 'Password required');
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const password = req.body.password;
      const teamnumber = req.body.teamnumber;

      findUser(db, teamnumber, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error finding User'});
          return;
        }
        if (!user) {
          res.status(404).json({error: true, message: 'User not found'});
          return;
        } else {
          authUser(db, teamnumber, password, user.password, function(err, match) {
            if (err) {
              res.status(500).json({error: true, message: 'Username or Password is Incorrect'});
            }
            if (match) {
              const token = jwt.sign(
                {userId: user.userId, teamnumber: user.teamnumber},
                process.env.JWT_SECRET,
                { expiresIn: 3000, } //50 minutes
              );
              res.status(200).json({token, teamnumber: user.teamnumber});
              return;
            } else {
              res.status(401).json({error: true, message: 'Username or Password is Incorrect'});
              return;
            }
          });
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};