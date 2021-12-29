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

async function updateUser(db, teamnumber, blue, red, callback) {
  const collection = db.collection('accounts');

  await collection.updateOne(
    { "teamnumber" : teamnumber },
    { $pull: { "duringmatch" : { blue: blue, red: red } } }
  );

  callback({created: true});
}

export default (req, res) => {
  if (req.method === 'POST') {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');

      updateUser(db, req.body.teamnumber, req.body.blue, req.body.red, function(creation) {
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