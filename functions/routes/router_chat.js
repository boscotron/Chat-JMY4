
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xhr = new XMLHttpRequest();
const _ = require('underscore');
const localStorage = require('localStorage');


/////
const functions = require('firebase-functions');
const firebase = require("firebase-admin");
var express = require('express');
const app = express();
var router = express.Router();
const jmy = require('../node_modules/comsis_jmy');
const jmy_connect= require('../config/key.js');
const envioMensaje= require('../controller/cchat');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*const firebaseApp = firebase.initializeApp(functions.config().firebase);
var db = firebaseApp.database(); */
router.use(jmy.co);


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (req.cookies.mail)
    res.render('login',{mail:req.cookies.mail});
  else
    res.render('login');      
});

/*

Funciones:

POST /chat presenta una lista de chats activos
POST /chat/userid


*/


router.get('/tkn',jmy.sesion(jmy_connect.key), async(req, res)=>{
  try{
    res.send(JSON.stringify(req.accesos));
  } catch(error){
    console.error(error);
    
  }
});

router.post('/chat/:idUsuario',jmy.sesion(jmy_connect.key), async(req, res)=>{
  try {
    const post = (typeof req.body == "string") ? JSON.parse(req.body):{};
      let acceso = req.accesos;
   
  if(typeof post.mensaje == 'string')
    envioMensaje.guardar({
      idUsuario:req.params.idUsuario,
      mensaje:post.mensaje,
      fecha:Date.now(),
      estado:'espera'
    },acceso).then(function (respuesta,error) {

      res.send(JSON.stringify({
        fn:'guardar',
        chat:respuesta,
        post:post,
        out:respuesta,
        idUsuario:req.params.idUsuario
      }));

    });
  else
    envioMensaje.ver({
      idUsuario:req.params.idUsuario
    },acceso).then(function (respuesta,err) {
      if(err)
        console.error(err);
        
      res.send(JSON.stringify({
        fn:'ver',
        chat:respuesta,
        post:post,
        out:respuesta,
        idUsuario:req.params.idUsuario
      }));

    });

   } catch(error) {
     console.error('Error detecting sentiment or saving message', error);
     res.sendStatus(500);
   }
  
 });

 let array = [];
 let object = {};
 let string = '';

router.get('/chat/:peticion',jmy.sesion(jmy_connect.key), async(req, res)=>{
 const foto_usr = req.accesos.user_info.url_foto;
  try {
    let accesos = req.accesos;
    let data = jmy.context(req);
    const id = req.params.peticion || '';

    data = jmy.context(req,{
        css:[
          {url:data.head.cdn+'assets/css/chat.css'},
          {url:"//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"}
        ],
        js:[
          {url:"//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"},
          {url:"//www.gstatic.com/firebasejs/5.10.0/firebase.js"}
        ]
      });
      
    console.log(foto_usr);
    data.head['templet']='listaChat';

        data.carga.js.push({url:data.head.cdn+'assets/js/jmy/jqchat.js?d='+Date.now()});
        data.head.title = "chat";
        data.head.templet = "chat";
        data.out['id']=id;
        
    res.render(data.head.templet,data);
  } catch(error) {
    console.error('Error detecting sentiment or saving message', error);
    res.sendStatus(500);
  }
 
});

router.get('/chat',jmy.sesion(jmy_connect.key), async(req, res)=>{
 const foto_usr = req.accesos.user_info.url_foto;
  try {
    let accesos = req.accesos;
    let data = jmy.context(req);
    const id = req.params.peticion || '';

    data = jmy.context(req,{
        css:[
          {url:data.head.cdn+'assets/css/chat.css'},
          {url:"//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"}
        ],
        js:[
          {url:"//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"},
          {url:"//www.gstatic.com/firebasejs/5.10.0/firebase.js"}
        ]
      });

    console.log(foto_usr);
    data.head['templet']='listaChat';
    data.head.title = "Lista de conversaciones activas";


    res.render(data.head.templet,data);
  } catch(error) {
    console.error('Error detecting sentiment or saving message', error);
    res.sendStatus(500);
  }
 
});

router.post('/login', function(req, res, next) {
  //const post = req.body;
    res.cookie('mail', req.body.mail,{ expires: new Date(Date.now() + (60*60*24*365*3)) });
    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se creo la cookie</p>'+
               '<a href="/">Retornar</a></body></html>';
    res.send(pagina); 
});


module.exports = router;
