/* função que gera o Estado a partir de um JSON */
addEventListener('load',async function(){
  
    let jsonEstado

    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/Agares`
      })

      gera_estado(jsonEstado)

})

/* função que cria o objeto Estado */
function gera_estado(jsonEstado){
    center = document.createElement('center')
    
for(var property in jsonEstado){

    label = '<option value="'+Object.values(jsonEstado[property])+'">'
    label += Object.values(jsonEstado[property])
    label +='</option>'
    document.getElementById('estados').innerHTML += label
    
  }
}

/* função que pré-carrega os dados */
async function carrega(){
    
    var opition
    option = '<option value="">Cidade</option>'
    document.getElementById('cidades').innerHTML = option

    let estado = $("#estados option:selected").val();
    let jsonCidade
    console.log(estado)
    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/Agares/${estado}`,
        success: function(data) {jsonCidade = data}   
    })
    
    gera_Cidade(jsonCidade)
}

    /* função que cria o objeto Cidade */
      function gera_Cidade(jsonCidade){
        center = document.createElement('center')
        
      for(var property in jsonCidade){
        label = '<option value="'+Object.values(jsonCidade[property])+'">'
        label += Object.values(jsonCidade[property])
        label +='</option>'
        document.getElementById('cidades').innerHTML += label
        
      }
    }
    
/* função encarregada de recuperar o view box
 * e o sgv do banco */
async function visao(){
    
    document.getElementById('estados').innerHTML += $("estados opition:deselect")
    var cidade =  $("#cidades option:selected").val();
    console.log(cidade)
    let jsonSvg, jsonView


    await $.ajax({
        type: 'GET',
        url: `http://localhost:3000/Agares/${cidade}`,
        success: function(data) {
          jsonView = data[0].getviewbox
        }
    })

    await $.ajax({
      type: 'GET',
      url: `http://localhost:3000/Agares/${cidade}`,
      success: function(data) {
        jsonSvg = data[0].st_assvg
      }
    })

    generate_svg(jsonSvg, jsonView)
}

function svg(jsonSvg, jsonView) {
 
    let svg = '<svg style="height: 400px","margin-left:30px" viewBox="'
    svg += jsonView
    svg += '"><path d="'
    svg += jsonSvg
    svg += '" />'
    svg += '</svg>'

    document.getElementById('svgs').innerHTML = svg

}