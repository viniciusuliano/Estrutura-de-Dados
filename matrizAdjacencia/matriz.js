
function criarFormulario() {
    let numVertices = document.getElementById('numVertices').value; 
    let formHtml = '<form id="graphForm">'; 
    formHtml += '<h3>Conexões entre vértices:</h3>'; 

    // Loop para criar campos de entrada para cada vértice
    for (let i = 0; i < numVertices; i++) {
      formHtml += '<div>'; 
      formHtml += '<label for="vertex' + i + '">Vértice ' + i + ':</label>'; 
      formHtml += '<input type="text" id="vertex' + i + '" name="vertex' + i + '">'; 
      formHtml += '</div>'; 
    }

    // Adiciona um botão para criar o grafo com base nas entradas
    formHtml += '<button type="button" onclick="criarGrafo()">Criar Grafo</button>';
    formHtml += '</form>'; 

    // Insere o formulário HTML no contêiner especificado
    document.getElementById('form-container').innerHTML = formHtml;
  }

// Função para criar o grafo com base nas entradas do formulário
function criarGrafo() {
    let numVertices = document.getElementById('numVertices').value; 
    let matrizAdj = []; // Inicializa uma matriz de adjacência vazia

    // Loop para inicializar a matriz de adjacência com zeros
    for (let i = 0; i < numVertices; i++) {
      matrizAdj[i] = [];
      for (let j = 0; j < numVertices; j++) {
        matrizAdj[i][j] = 0;
      }
    }

    // Loop para preencher a matriz de adjacência com base nas conexões inseridas pelo usuário
    for (let i = 0; i < numVertices; i++) {
      let vertexConnections = document.getElementById('vertex' + i).value.split(','); 
      vertexConnections.forEach(connection => { 
        let destination = parseInt(connection.trim()); 
        if (!isNaN(destination)) { 
          matrizAdj[i][destination] = 1; 
          matrizAdj[destination][i] = 1; // Como é um grafo não direcionado, definimos a conexão nos dois sentidos
        }
      });
    }

    // Chama a função para criar a visualização do grafo com base na matriz de adjacência
    criarGrafoVisual(matrizAdj);
  }

// Função para criar a visualização do grafo usando vis.js
function criarGrafoVisual(matrizAdj) {
    let nodes = []; // Array para armazenar os nós do grafo
    let edges = []; // Array para armazenar as arestas do grafo

    // Loop para criar os nós do grafo
    for (let i = 0; i < matrizAdj.length; i++) {
      nodes.push({ id: i, label: String(i) }); // Adiciona um nó com o rótulo igual ao índice
    }

    // Loop para criar as arestas do grafo
    for (let i = 0; i < matrizAdj.length; i++) {
      for (let j = i + 1; j < matrizAdj[i].length; j++) {
        if (matrizAdj[i][j] === 1) { // Se há uma conexão entre os vértices i e j
          edges.push({ from: i, to: j }); // Adiciona uma aresta de i para j
        }
      }
    }

    // Configuração da visualização do grafo usando vis.js
    let container = document.getElementById('network-container');
    let data = {
      nodes: new vis.DataSet(nodes),
      edges: new vis.DataSet(edges)
    };
    let options = {};
    let network = new vis.Network(container, data, options);
  }
