const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bcrypt = require('bcrypt');
const v4 = require('uuid').v4;
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default (req, res) => {
  if (req.method === 'POST') {
    // verify teamnumber does not exist already
    client.connect(async function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      
      var ele = await db.collection('accounts').findOne({teamnumber: req.body.teamnumber});
      var arr = ele.prematch;

      arr.sort(function(a,b) {
        return a.teamnumber - b.teamnumber
      });
      
      return res.status(200).json({error: false, user: arr});
    });
  } else {
    // Handle any other HTTP method
    res.status(400);
  }
};