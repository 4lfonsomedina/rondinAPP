$(document).ready(function() {
	/*   CONFIGURACION   *****************************************************************/
  $("#config").click(function(){
    $("#id_guardia").val(localStorage.getItem("id_guardia"));
    $("#config_modal").modal("show");
  });
  $("#guardar_id_guardia").click(function(){
    localStorage.setItem("id_guardia", $("#id_guardia").val());
    alert("Configuracion guardada!");
    $("#config_modal").modal("hide");
  })

  $("#ini_turno").click(function(){
  	if(localStorage.getItem("id_guardia")!=""){
  		$.post("http://ferbis.com/demo/index.php/rondin/verificar_turno?id_guardia="+localStorage.getItem("id_guardia"), function(r) {
	     	if(r=="0"){
	     		$.post("http://ferbis.com/demo/index.php/rondin/abrir_turno?id_guardia="+localStorage.getItem("id_guardia"), function(r) {
	     			window.location.href = "index.html";
		    	});
	     	}
    	});
  	}else{
  		alert("Favor de configurar el id_guardia");
  	}
  })
});