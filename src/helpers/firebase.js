import { initializeApp } from 'firebase'


const app = initializeApp({
    apiKey: "AIzaSyC0TwvidGtZLnICcRuvLYJXBzAGawCsgzM",
    authDomain: "aprobandouns.firebaseapp.com",
    databaseURL: "https://aprobandouns.firebaseio.com",
    projectId: "aprobandouns",
    storageBucket: "aprobandouns.appspot.com",
    messagingSenderId: "583790389332"
})

export const db = app.database()
export const dbRefCarreras = db.ref('data').child('carreras')
export const dbRefExamenes = db.ref('data').child('examenes')
export const storageRef  = app.storage().ref()
