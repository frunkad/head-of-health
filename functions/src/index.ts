import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

admin.initializeApp();
const database = admin.database();

exports.updatePostNumber = functions.database.ref('posts/{pid}').onCreate((snap, context) => {
    const uid = snap.val().uid;
    return database.ref(`users/${uid}`).once('value', usnap => {
        const user = usnap.val();
        return database.ref(`users/${uid}`).update({
            postsCount: (user['postsCount'] || 0) +1
        })
    });
})