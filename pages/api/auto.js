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

async function updateUser(db, teamnumber, auto, callback) {
  const collection = db.collection('accounts');
  await collection.updateOne(
    { "teamnumber" : teamnumber },
    { $set: { "auto" : auto } }
  );

  callback({created: true});
}

export default (req, res) => {
  if (req.method === 'POST') {
    // verify teamnumber does not exist already
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const auto = req.body.auto;
      const teamnumber = req.body.teamnumber;

      updateUser(db, teamnumber, auto, function(creation) {
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