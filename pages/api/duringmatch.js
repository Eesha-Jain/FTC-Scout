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

async function updateUser(db, teamnumber, blue, red, notes, callback) {
  const collection = db.collection('accounts');
  const dic = {blue, red, notes};

  await collection.updateOne(
    { "teamnumber" : teamnumber },
    { $push: { "duringmatch" : dic } }
  );

  callback({created: true});
}

export default (req, res) => {
  if (req.method === 'POST') {
    client.connect(function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const teamnumber = req.body.teamnumber;

      updateUser(db, teamnumber, req.body.blue, req.body.red, req.body.notes, function(creation) {
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