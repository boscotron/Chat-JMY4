const functions = require('firebase-functions');
const firebase = require("firebase-admin");
var express = require('express');
const app = express();
const jmy = require('comsis_jmy');
const jmy_connect= require('../config/key');

const firebaseApp = firebase.initializeApp(functions.config().firebase);
var db = firebaseApp.database(); 

module.exports = {

    enviar: enviar

} 

function enviar (d=[],a={}) {
    
    db.ref('metadata').set({d});
 
}