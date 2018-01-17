const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cookieParser = require('cookie-parser')();
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const validateFirebaseIdToken = (req, res, next) => {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !req.cookies.__session) {
    res.status(403).send('Unauthorized motherfucker');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    idToken = req.cookies.__session;
  }

  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    res.status(403).send('Unauthorized motherfucker');
  });
};

/* ----------------MIDDLEWARE---------------------*/
app.use(cookieParser);
app.use(cors({ origin: true }));
app.use(validateFirebaseIdToken);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* -----------------------------------------------*/

app.post('/signUpForEvent', (req, res) => {
  if (!req.body.event_id) { res.status(403).send("Missing event id"); }
  if (!req.user.uid) { res.status(403).send("Missing user id"); }
  const event_id = req.body.event_id;
  const user_id = req.user.uid;

  admin.firestore().collection("presentations").doc(event_id).get().then(doc => {
      if (!doc.exists) { res.status(200).send('Invalid event id, ' + event_id); }
      const participants = doc.data().participants ? doc.data().participants : [];
      const capacity = doc.data().capacity;

      if (participants.indexOf(user_id) > -1) {
        res.status(200).send('User is already signed up for event ' + event_id);
      } else if (participants.length >= capacity) {
        res.status(200).send('Event is full, capacity: ' + capacity);
      }
      else {
        participants.push(user_id);
        admin.firestore().collection('presentations').doc(event_id).update({
          participants: participants,
        }).then(() => {
          res.status(200).send('User ' + user_id + ' added to event ' + event_id)
        }).catch( error => {
          res.status(505).send('Error updating participants, ' + error);
        });
      }
  }).catch(function(error) {
      res.status(505).send('Error fetching event with id ' + event_id);
  });
});

exports.app = functions.https.onRequest(app);
