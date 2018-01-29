const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const validateFirebaseIdToken = (req, res, next) => {
  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !req.cookies.__session) {
    res.status(403).send('Unauthorized');
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
    res.status(403).send('Unauthorized');
  });
};

/* ----------------MIDDLEWARE--------------------- */
app.use(cookieParser);
app.use(cors({ origin: true }));
app.use(validateFirebaseIdToken);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* ----------------------------------------------- */

app.post('/signUpForEvent', (req, res) => {
  if (!req.body.event_id) { res.status(403).send("Missing event id"); }
  if (!req.user.uid) { res.status(403).send("Missing user id"); }
  const event_id = req.body.event_id;
  const user_id = req.user.uid;

  const presentationRef = admin.firestore().collection("presentations").doc(event_id);
  return admin.firestore().runTransaction(transaction => {
    return transaction.get(presentationRef).then(doc => {
      if (!doc.exists) {
        res.status(400).send('Event does not exist, id: ' + event_id);
      }
      const participants = doc.data().participants ? doc.data().participants : [];
      const capacity = doc.data().capacity ? doc.data().capacity : 0;
      const regStartTime = doc.data().registration_start;
      const currentTime = Date.now();

      if (regStartTime && currentTime < regStartTime) {
        res.status(400).send('Registration has not started for event ' + event_id);
      } else if (participants.indexOf(user_id) > -1) {
        res.status(400).send('User is already signed up for event ' + event_id);
      } else if (participants.length >= capacity) {
        res.status(400).send('Event is full, capacity: ' + capacity);
      } else {
        participants.push(user_id);
        transaction.update(presentationRef, { participants: participants });
        res.status(200).send('User ' + user_id + ' added to event ' + event_id);
      }
    })
  })
  .then(() => {
    console.log("Transaction successful");
  })
  .catch(error => {
    console.log('Error signing up to event with id ' + event_id + ".\n" + error);
    res.status(500).send('Error signing up to event with id ' + event_id + '\n' + error);
  });
});

exports.app = functions.https.onRequest(app);
