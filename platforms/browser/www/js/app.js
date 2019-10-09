$(document).ready(function() {
    
    /*   SCANN   *****************************************************************/
  $('#scan').click( function(){
    cordova.plugins.barcodeScanner.scan(
    function (result) {
        //alert(JSON.stringify(result));
        //alert(result.text);
        if(localStorage.getItem("id_guardia")!=""){
          verificar_turno();
          $.post(result.text+"&id_guardia="+localStorage.getItem("id_guardia"), function(r) {
            if(r=='1'){ cargar_historico(); }else{ alert("ERROR");}
          });
        }else{
          alert("Favor de configurar el id_guardia");
        }
        
      }, 
    function (error) {
        alert("Scanning failed: " + error);
    });
  });

  /*   VERIFICAR TURNO **********************************************************/
  verificar_turno();
  function verificar_turno(){
    $.post("http://ferbis.com/demo/index.php/rondin/verificar_turno?id_guardia="+localStorage.getItem("id_guardia"), function(r) {
     if(r=="0"){window.location.href = "inicio.html";}
    });
  }
  /*   FINALIZAR TURNO **********************************************************/
  $("#fin_turno").click(function(){
    if(confirm("Esta seguro de que desea terminar el turno")){
      $.post("http://ferbis.com/demo/index.php/rondin/finalizar_turno?id_guardia="+localStorage.getItem("id_guardia"), function(r) {
        verificar_turno();
      })
    }
  })


  /*   CARGAR   *****************************************************************/
  cargar_historico();
  function cargar_historico(){
    if(localStorage.getItem("id_guardia")!=""){
      $("#table_historico").html("");
      $.post("http://ferbis.com/demo/index.php/rondin/dia_guardia?id_guardia="+localStorage.getItem("id_guardia"), function(r) {
        var r = JSON.parse(r);
        r.forEach(function(obj) {
          $("#table_historico").append("<tr class='table-dark'><td>"+obj.descripcion+"</td><td style='text-align: right;'>"+obj.hora+"</td></tr>");
        });
      });
    }
  }

});