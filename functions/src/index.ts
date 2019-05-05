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

exports.followerAdded = functions.database.ref('relationships/{rid}').onCreate((snap, context) => {
    return database.ref(`users`).once('value', usnap => {
        const users = usnap.val();
        const rl = snap.val();
        return Promise.all([
            database.ref(`users/${rl['by']}`).update({
                followingsCount: (users[rl['by']]['followingsCount'] || 0)+1
            }),
            database.ref(`users/${rl['to']}`).update({
                followersCount: (users[rl['to']]['followersCount'] || 0)+1
            })
        ]);
    });
})