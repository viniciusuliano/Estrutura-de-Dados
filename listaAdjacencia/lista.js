document.getElementById('botao__gerarGrafo').addEventListener('click', ()=>{
    //selecionei os elementos de input
    var verticesInput = document.getElementById("vertices").value;
    var vertices = verticesInput.split(" ").map(v => ({id: parseInt(v), label: v}));

    var arestasInput = document.getElementById("arestas").value;
    //retirei as virgulas
    var arestasArray = arestasInput.split(",");
    //adicionei a uma lista
    var edges = [];

    arestasArray.forEach(function(arestaString) {
        var [origem, destino] = arestaString.split("-");
        edges.push({from: parseInt(origem), to: parseInt(destino)});
    });

    var container = document.getElementById("mynetwork");
    var data = {
        nodes: vertices,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
})