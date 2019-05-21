
function verChat(chat=[],h=''){

  h+='<ol class="chat" > ';
  chat.forEach(mensaje => {
    let  info = {
      quien:(mensaje.quien)?'self':'other',
      foto:mensaje.foto || url_base+'assets/img/favicon.png',
      mensaje:mensaje.mensaje,
      fecha:mensaje.fecha || '---'
    };
    
    h+=' <li class="'+info.quien+'">';
    h+='    <div class="avatar XD">';
    h+='        <img src="'+info.foto+'" alt="crash"/>';
    h+='    </div>';
    h+='    <div class="msg">';
    h+='        <p>'+info.mensaje+'</p>';
    h+='        <div class="card-footer">';
    h+='            <i class="ti-check"></i>';
    h+='            <h6>'+info.fecha+'</h6>';
    h+='        </div>';
    h+='    </div>';
    h+='  </li>      ';

  });
  h+='</ol > ';
  return h;
}


function actualizarChat(datos={}) {
  console.log('actualizando');
  
  //document.getElementById("send").disabled = true;
  try {
  $.ajax({
    url:url_base+'chat/bosco',	
    type: 'post',	
    contentType:false,
    dataType: 'json',
    cache: false,
    processData: false,
    data:JSON.stringify({alog:'algo'}),
    success:function (res) {
      console.log(res);
      if(typeof res.chat == "object"){
        $('#fondo-mensaje').html( verChat( res.chat ) );
        document.getElementById("send").disabled = false;
        $("#mensajeNuevo").val('');
        $("#send").html('Enviar');
      }
      console.log("enviado");
    },
    error:function (res) {
      console.error(res);
      swal('Error','Ocurrió un error al conectarse al servidor','error');
    }
  });
}catch(error){
  console.error(error);
}
}

function init(d={}) {
  document.getElementById("send").disabled = true;
  actualizarChat();
}



$(document).ready(function(){
  window.onload = actualizarChat;
  $("#mensajeNuevo").change(function(){
    document.getElementById("send").disabled = false;
  });
  $("#mensajeNuevo").on('click',function(){
    document.getElementById("send").disabled = false;
  });
  $("#send").on('click', function () {
    let mensaje = $("#mensajeNuevo").val();
    document.getElementById("send").disabled = true;
    $("#send").html('<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span></a></li>');
    if(typeof mensaje == "string" && mensaje!='')
      $.ajax({
        url:url_base+'chat/bosco',	
        type: 'post',	
        contentType:false,
        dataType: 'json',
        cache: false,
        processData: false,
        data:JSON.stringify({
          mensaje:mensaje
        }),
        success:function (res) {
          console.log(res);
          if(typeof res.chat == "object"){
            $('#fondo-mensaje').html( verChat( res.chat ) );
            document.getElementById("send").disabled = false;
            $("#mensajeNuevo").val('');
            $("#send").html('Enviar');
          }
          console.log("enviado");
        },
        error:function (res) {
          console.error(res);
          swal('Error','Ocurrió un error al conectarse al servidor','error');
        }
      });
      else
        $("#mensajeNuevo").css('border','1px red solid');
    });

init();
});
