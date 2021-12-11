//Code adapted from https://github.com/mgranados/simple-login

const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

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
    client.connect(function(err) {
      const db = client.db('users');
      const teamnumber = req.body.teamnumber;

      findUser(db, teamnumber, async function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error Finding User'});
          return;
        }
        if (!user) {
          res.status(404).json({error: true, message: 'Account Does Not Exist'});
          return;
        } else {
            let transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                auth: {
                user: 'ftcscoutingapp@outlook.com',
                pass: process.env.PASSWORD
            }, tls: { ciphers: 'SSLv3' }});

            const token = jwt.sign(
                {teamnumber: user.teamnumber, email: user.email},
                process.env.JWT_SECRET,
                { expiresIn: 1800 },
            );

            const link = process.env.PUBLIC_URL + "/forgotpassword/" + token;

            const output = `
                <div style="padding: 20px; background-color: #ffe5d1; border-radius: 10px; font-family: 'Roboto';">
                    <h1>Click on the Following Link to Reset Your Password:</h1>
                    <h4>Expires in 30 minutes from when email was sent</h4>
                    <a href="${link}">${link}</a>
                </div>
            `;

            await transporter.sendMail({
                from: 'ftcscoutingapp@outlook.com',
                to: user.email,
                subject: "Password Reset: FTC Scouting App",
                html: output,
            });
            
            return res.status(200).send(JSON.stringify({error: false}));
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};