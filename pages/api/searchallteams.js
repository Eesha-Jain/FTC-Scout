const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var arr = [];
const func = (element) => { arr.push(element); }

export default (req, res) => {
  if (req.method === 'POST') {
    client.connect(async function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const collection = db.collection('accounts');
      arr = [];
      
      await collection.find().forEach(func);
      arr.sort(function(a,b) { return a.teamnumber - b.teamnumber });

      return res.status(200).json({error: false, user: arr});
    });
  } else {
    res.status(400);
  }
};