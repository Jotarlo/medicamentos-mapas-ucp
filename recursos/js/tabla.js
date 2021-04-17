let datosCompletos = [];

function LeerDatos() {
    //https://www.datos.gov.co/resource/i7cb-raxc.json

fetch("http://localhost:9000/datos-ciencia").then(respuesta => respuesta.json()).then(json => {
    json.forEach(element => {
        //alert(element.name)
    });
});

    fetch('https://www.datos.gov.co/resource/i7cb-raxc.json')
        .then(respuesta => respuesta.json())
        .then(datosJSON => {
            datosCompletos = datosJSON;
            MostrarDatos(datosJSON);
        });
}

function MostrarDetalles(unidadMedida, cantidad, formaFarmaceutica) {
    let detalles= "Unidad de Medida: " + unidadMedida + ", Cantidad: " + cantidad + ", Forma Farmacéutica: " + formaFarmaceutica;
    document.querySelector("#divDetalles").innerHTML = detalles;
    let elem = document.querySelector("#modalDetalles");
    let instance = M.Modal.getInstance(elem);
    instance.open();
}

function FiltroPorProducto(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.producto.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroPorExpediente(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.expediente.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function FiltroAdministracion(filtro){
    let datosFiltrados = datosCompletos.filter( x => x.viaadministracion.toUpperCase().indexOf(filtro.toUpperCase()) > -1);
    MostrarDatos(datosFiltrados);
}

function MostrarDatos(datosJSON){
    let registrosHtml = "";
    datosJSON.forEach(registro => {

        registrosHtml += `<tr>
                        <td>
                            ${registro.expediente}
                        </td>
                        <td>
                            ${registro.producto}
                        </td>
                        <td>
                            ${registro.titular}
                        </td>
                        <td>
                            ${registro.fechavencimiento}
                        </td>
                        <td>
                            ${registro.viaadministracion}
                        </td>
                        <td>
                            <button class="waves-effect waves-light" type="button" onclick="MostrarDetalles(\'${registro.unidadmedida}\', \'${registro.cantidad}\', \'${registro.formafarmaceutica}\')" >
                                <i class="material-icons right">search</i>
                            </button>
                        </td>
                    </tr>`;
    });
    document.querySelector('#contenidoTablaMedicamentos').innerHTML = registrosHtml;
}

LeerDatos();