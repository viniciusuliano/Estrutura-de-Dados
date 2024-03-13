function criarFormulario() {
    let numVertices = document.getElementById('numVertices').value;
    let formHtml = '<form id="graphForm">';
    formHtml += '<h3>Conexões entre vértices:</h3>';

    for (let i = 0; i < numVertices; i++) {
      formHtml += '<div>';
      formHtml += '<label for="vertex' + i + '">Vértice ' + i + ':</label>';
      formHtml += '<input type="text" id="vertex' + i + '" name="vertex' + i + '">';
      formHtml += '</div>';
    }

    formHtml += '<button type="button" onclick="criarGrafo()">Criar Grafo</button>';
    formHtml += '</form>';

    document.getElementById('form-container').innerHTML = formHtml;
  }

  function criarGrafo() {
    let numVertices = document.getElementById('numVertices').value;
    let matrizAdj = [];

    for (let i = 0; i < numVertices; i++) {
      matrizAdj[i] = [];
      for (let j = 0; j < numVertices; j++) {
        matrizAdj[i][j] = 0;
      }
    }

    for (let i = 0; i < numVertices; i++) {
      let vertexConnections = document.getElementById('vertex' + i).value.split(',');
      vertexConnections.forEach(connection => {
        let destination = parseInt(connection.trim());
        if (!isNaN(destination)) {
          matrizAdj[i][destination] = 1;
          matrizAdj[destination][i] = 1;
        }
      });
    }

    criarGrafoVisual(matrizAdj);
  }

  function criarGrafoVisual(matrizAdj) {
    let nodes = [];
    let edges = [];

    for (let i = 0; i < matrizAdj.length; i++) {
      nodes.push({ id: i, label: String(i) });
    }

    for (let i = 0; i < matrizAdj.length; i++) {
      for (let j = i + 1; j < matrizAdj[i].length; j++) {
        if (matrizAdj[i][j] === 1) {
          edges.push({ from: i, to: j });
        }
      }
    }

    let container = document.getElementById('network-container');
    let data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges)
    };
    let options = {};
    let network = new vis.Network(container, data, options);
  }