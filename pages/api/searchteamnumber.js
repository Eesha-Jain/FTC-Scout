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
const func = (element) => {
  arr.push(element);
}

export default (req, res) => {
  if (req.method === 'POST') {
    // verify teamnumber does not exist already
    client.connect(async function(err) {
      assert.equal(null, err);
      const db = client.db('users');
      const teamn = req.body.teamnumber + "";
      arr = [];
      
      await db.collection('accounts').find({"teamnumber": {$regex: teamn}}).forEach(func);

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