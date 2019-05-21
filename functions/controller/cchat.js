const functions = require("firebase-functions");
const firebaseApp = require('../config/firebase.js');
var express = require('express');
const app = express();
const jmy = require('comsis_jmy');
const jmy_connect= require('../config/key');


var db = firebaseApp.database();  
module.exports = {

    enviar: enviar,
    guardar: guardar,
    ver: ver,
    mostrar: mostrarMensajesDeFirebase

} 

function enviar (post=[],firebaseApp,db) {
    //imprimir datos de acceso
    //console.log(acceso); 
    db.ref('metadataChat').set({post});
}

function guardar(d={},acceso) {
  return new Promise ( function (respuesta,error) {
    
    const dbd = firebaseApp.database();  
    const chat = dbd.ref().child('chat/'+acceso.uid+'/'+d.idusuario+'/mensajes');
    const mensaje = {
      mensaje:d.mensaje || '',
      idUsaurio:d.idUsaurio || '',
      fecha:d.fecha || '',
      estado:'enviado',
      quien:true,
    };

    chat.child(Date.now()).set(mensaje); // CHAT DEL USUARIO

    const chatOther = dbd.ref().child('chat/'+d.idusuario+'/'+acceso.uid+'/mensajes');
    mensaje.estado = 'sin_leer';
    mensaje.quien = 0;
    chatOther.child(Date.now()).set(mensaje); // CHAT DEL OTRO USUARIO

    let ref = firebaseApp.database().ref('chat/'+acceso.uid+'/'+d.idusuario+'/mensajes');
    let respuestas=[];
    ref.orderByKey().on("child_added", function(snapshot) {
      let foto = (typeof acceso.user_info.url_foto == "string" && acceso.user_info.url_foto.lenght>20) ?acceso.user_info.url_foto:"https://comsis.mx/att/carpeta/ico_700x700.png";
      respuestas.push({
        mensaje:snapshot.child('mensaje').val(),
        idUsaurio:snapshot.child('idUsaurio').val(),
        fecha:snapshot.child('fecha').val(),
        estado:snapshot.child('estado').val(),
        quien:snapshot.child('quien').val(),
        foto:(snapshot.child('quien').val())?foto:"https://comsis.mx/att/carpeta/ico_700x700.png"
      });

    });
      const dashboard = dbd.ref().child('dashboard/'+d.idusuario+'/chat/');
        dashboard.child('cabecera').set({
          total:1,
          nuevos:1,
          ultimo_titulo:mensaje.mensaje.substr(0, 58)+' '+((mensaje.mensaje.lenght>58)?'...':''),
        });
      let lista_dashboard = [];
          dashboard.child('lista').set({
            total:1,
            nuevos:1,
            ultimo_titulo:mensaje.mensaje.substr(0, 58)+' '+((mensaje.mensaje.lenght>58)?'...':''),
          });
          console.log(respuestas);
          
        respuesta(respuestas);
  } );
}

function ver(d={},acceso){
  return new Promise ( function (respuesta,error) {
  try {
    let respuestas =[];
    let ref = firebaseApp.database().ref('chat/'+acceso.uid+'/'+d.idUsuario+'/mensajes');
 
    let foto = (typeof acceso.user_info.url_foto == "string" && acceso.user_info.url_foto.lenght>20) ?acceso.user_info.url_foto:"https://comsis.mx/att/carpeta/ico_700x700.png";
    ref.orderByKey().on("child_added", function(snapshot) {
      respuestas.push({
        mensaje:snapshot.child('mensaje').val(),
        idUsaurio:snapshot.child('idUsaurio').val(),
        fecha:snapshot.child('fecha').val(),
        estado:snapshot.child('estado').val(),
        quien:snapshot.child('quien').val(),
        foto:(snapshot.child('quien').val())?foto:"https://comsis.mx/att/carpeta/ico_700x700.png"
      });
    });

    respuesta(respuestas);

    }catch(err){
      console.error(err);
      error(err);
    }
  } );
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