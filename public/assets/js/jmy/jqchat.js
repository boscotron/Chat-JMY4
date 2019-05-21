$(document).ready(function(){

  window.onload = inicializar;
  var refMensajes;
  var fondoMensajes;


  function inicializar() {
    console.log("inicializando");
    
  
   fondoMensajes = document.getElementById("fondo-mensaje");
  }
  
 
$("#send").on('click', function () {
  var catchMensaje = $("#mensajeNuevo").val();
  var url= $("#url_base").val()+"chat";
  url = url.replace(" ","");
   $.ajax({
    url:url,
    data:{mensaje:catchMensaje},
    method:"POST",
    success:function (res) {
      console.log("enviado");
    }
    }).done(function (data) {
      alert("el mensaje es :" + catchMensaje)
    })
    console.log(catchMensaje);
    
    });

  /* function mostrarMensajesDeFirebase() {
    refMensajes = firebase.database().ref().child("metadataChat");
    var todosLosMensajes
    refMensajes.on('value', function (snap) {
      datos = snap.val();
      for(var key in datos){
        todosLosMensajes += "</br>"+ datos[key].d
      }
      fondoMensajes.innerHTML = todosLosMensajes;
    })
  } */


  });

/*
    
  db.ref("metadata").on('value', function(snapshot){
    console.log(snapshot.val());
  }); 

/*
var refMensajes;
var fondoMensajes;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
window.onload = inicializar();

   function inicializar() {
    console.log("hello");
     inicializarFirebase(); 
     mostrarMensajesFirebase();
        fondoMensajes = document.getElementById("fondo-mensaje");
        console.log(fondoMensajes);
       return fondoMensajes;
        
       $('#fondo-mensaje').append("hola");
       

   };
  
    function mostrarMensajesFirebase() {
        refMensajes = admin.database().ref().child("mensaje"); 
        var todoslosMensajes = "";
        refMensajes.on("value",function (snap) {
            datos = snap.val();
            for (var key in datos) {
                todoslosMensajes += "</br>" + datos[key].mensaje;
                
            }
            $('#send').append("holaaa");
            fondoMensajes.innerHTML = todoslosMensajes;
        });
    }

   $('#send').click(enviarDatosFirebase());

    function enviarDatosFirebase() {
        console.log("hola");

        
    }
    function inicializarFirebase() {
        var config = {
            apiKey: "AIzaSyB9tvqRBlS5qlOt22IRTu4LMFnlZBgWrJk",
            authDomain: "telmexhub-235d5.firebaseapp.com",
            databaseURL: "https://telmexhub-235d5.firebaseio.com",
            projectId: "telmexhub-235d5",
            storageBucket: "telmexhub-235d5.appspot.com",
            messagingSenderId: "619137830813"
          };
          admin.initializeApp(config);
      }
    
/*
    var config = {
        apiKey: "AIzaSyB9tvqRBlS5qlOt22IRTu4LMFnlZBgWrJk",
        authDomain: "telmexhub-235d5.firebaseapp.com",
        databaseURL: "https://telmexhub-235d5.firebaseio.com",
        projectId: "telmexhub-235d5",
        storageBucket: "telmexhub-235d5.appspot.com",
        messagingSenderId: "619137830813"
      };
      firebase.initializeApp(config);
      var db = firebase.database();
      var ref = database.ref('user');

      var data = {
        name: 'pear',
        count: 7
      }
      fruits.push(data);
    console.log(firebase);
    
      
      $("#send").click((e)=>{
          console.log("hey a darle ");

          db.ref('metadata').set({
            app: 'videotutorial',
            ver: '0.0.1'
          }).then((res) => {
            $('.modal-body > p').html(`
            Se guardo con exito
            <br>
            Consulta tu CV <a href="${window.location.origin}/cvtemplate.html?uid=${uid}">aquí</a>
            `);
            $('#btn-close-modal').html('Cerrar');
            $('#btn-close-modal').attr('disabled',false);
          }).catch((error) => {
            $('.modal-body > p').html('Ocurrio un error');
            console.log(error);
          });
          
        auth.signInWithPopup(provider).then((result)=>{
            console.log('Exitosos');
            
        }).catch((error)=>{
            console.log(error,'error');
            
        });
        console.log("diste click");
        
    });
/*
    //      JQERY---------------------------------------------------------  
      var chateandoArray = [];
  
      $("#send").click((e)=>{  
          console.log("desde js de chat");
          
          $(".card-content").animate({ scrollTop: $('.chat')[0].scrollHeight}, 1000);
          $('.self img').hide();
          $('.self .avatar').removeClass( "avatar" ).addClass("no-avatar"); 
          
              let mensaje_self = {
              mensaje: $('#mensaje').val()
          }
          chateandoArray.push(mensaje_self);
          mensaje_total('.chat',mensaje_self.mensaje);  
  
          //almacen_mensaj(chateandoArray);
          mensaje_sav();
      });
  
     const mensaje_total = (lugar_inserccion,base_mensaje) => {
          //console.log(chateandoArray);
          
          $(lugar_inserccion).append(`<li class="self" id="mensaje-nuevo" ><div class="msg"><p>${base_mensaje}</p><div class="card-footer"><i class="ti-check"></i><h6>11:25</h6></div></div><div class="avatar"><img id="foto-perfil" src="http://graph.facebook.com/1887757777973880/picture?type=album" alt="crash"/></div></li>`)
      }
  
     /*  function mensaje_sav() {
          var g ="12";
          
          console.log(window.location.origin);
          
          $.ajax({
              url: window.location.origin+"/chat",
              type: "get",
              data: g,
              contentType:false,
              dataType: 'json',
              cache: false,
              processData: false,
              success: function(g){
                  console.log(g);	
              
                  swal(g.mensaje,'',((g.error)?"error":"success"), {
                      buttons: false,
                      timer: 3000,
                    });
          },error: function(result) {console.log(result);}
          });
      }
       */
  