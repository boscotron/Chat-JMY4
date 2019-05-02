var express = require('express');
var router = express.Router();
const jmy = require('comsis_jmy');
const jmy_connect= require('../config/key.js');
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


router.get('/chat',jmy.sesion(jmy_connect.key), async(req, res)=>{
  //res.end('Hello Worl');
  try {      
    let accesos = req.accesos;
    let data = jmy.context(req);
    data = jmy.context(req,{
        css:[{url:data.head.cdn+'assets/css/chat.css'}],
        js:[{url:data.head.cdn+'assets/js/chat.js'}]});

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
