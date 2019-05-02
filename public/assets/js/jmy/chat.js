$(document).ready( function () {
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
  
  
  } );