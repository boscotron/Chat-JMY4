
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

const firebaseApp = firebase.initializeApp(functions.config().firebase);
var db = firebaseApp.database(); 
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




router.post('/chat',jmy.sesion(jmy_connect.key), async(req, res)=>{

//let data = jmy.context(req);  
const post = req.body;
  let acceso = req.accesos

  


   try {
     //post y acceso son datos de servidor 
    //console.log("mensaje",post);
    //console.log("acceso",acceso);
    
    envioMensaje.enviar(post,firebaseApp,db);  
    //res.send(JSON.stringify({post:post}));
   } catch(error) {
     console.log('Error detecting sentiment or saving message', error.message);
     res.sendStatus(500);
   }
  
 });


router.get('/chat',jmy.sesion(jmy_connect.key), async(req, res)=>{
 const foto_usr = req.accesos.user_info.url_foto;
  try {
    let accesos = req.accesos;
    let data = jmy.context(req);
    /* res.json(products); */
   
  envioMensaje.mostrar(firebaseApp);
    
    
      data = jmy.context(req,{
          css:[
            {url:data.head.cdn+'assets/css/chat.css'},
            {url:"//cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"}
          ],
          js:[
            {url:data.head.cdn+'../assets/js/jmy/jqchat.js'},
            {url:"//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"},
            {url:data.head.cdn+"assets/js/jmy/jmy_administrador_usuarios.js"},
            {url:"//www.gstatic.com/firebasejs/5.10.0/firebase.js"}
          ]
        });
        
        
       
        console.log(foto_usr);
        
         

    data.head.title = "chat";
    res.render('chat',data);
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
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
