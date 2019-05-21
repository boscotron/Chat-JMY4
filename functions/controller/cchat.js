const functions = require('firebase-functions');
const firebase = require("firebase-admin");
var express = require('express');
const app = express();
const jmy = require('comsis_jmy');
const jmy_connect= require('../config/key');
/* 
const firebaseApp = firebase.initializeApp(functions.config().firebase);
var db = firebaseApp.database();  */
module.exports = {

    enviar: enviar,
    mostrar: mostrarMensajesDeFirebase

} 

function enviar (post=[],firebaseApp,db) {
    //imprimir datos de acceso
    //console.log(acceso); 
    db.ref('metadataChat').set({post});
}

function mostrarMensajesDeFirebase(firebaseApp) {
   firebaseApp = firebaseApp;

    refMensajes = firebaseApp.database().ref().child("metadataChat");
    var todosLosMensajes;
    refMensajes.on('value', function (snap) {
      datos = snap.val();
      for(var key in datos){
        todosLosMensajes += datos[key].post;
        console.log(todosLosMensajes);
        
      }
     
    })
  }