let grafo = { nodes: [], edges: [] };

function criarGrafo() {
    const numVertices = parseInt(document.getElementById('numVertices').value);
    if (numVertices < 1 || isNaN(numVertices)) {
        alert("Número de vértices inválido.");
        return;
    }

    // Reinicializa o grafo
    grafo = { nodes: [], edges: [] };

    // Adiciona os vértices ao grafo
    for (let i = 0; i < numVertices; i++) {
        grafo.nodes.push({ id: i, label: `${i}` });
    }

    // Pede ao usuário que insira as conexões
    for (let i = 0; i < numVertices; i++) {
        for (let j = i + 1; j < numVertices; j++) {
            if (confirm(`Há uma conexão entre os vértices ${i} e ${j}?`)) {
                grafo.edges.push({ from: i, to: j });
            }
        }
    }

    // Cria uma instância de Network para exibir o grafo
    const container = document.getElementById('grafo');
    const options = {};
    const network = new vis.Network(container, grafo, options);

    // Exibir a matriz de incidência de vértices para arestas
    console.log("Matriz de incidência de vértices para arestas:");
    console.log(criarMatrizIncidencia(grafo, true));

    // Exibir a matriz de incidência de arestas para vértices
    console.log("\nMatriz de incidência de arestas para vértices:");
    console.log(criarMatrizIncidencia(grafo, false));
}

// Função para criar e exibir a matriz de incidência de vértices ou arestas
function criarMatrizIncidencia(grafo, isVerticesParaArestas) {
    const numVertices = grafo.nodes.length;
    const numArestas = grafo.edges.length;
    const matriz = [];

    for (let i = 0; i < (isVerticesParaArestas ? numVertices : numArestas); i++) {
        matriz[i] = [];
        for (let j = 0; j < (isVerticesParaArestas ? numArestas : numVertices); j++) {
            const node = grafo.nodes[isVerticesParaArestas ? j : i];
            const edge = grafo.edges[isVerticesParaArestas ? i : j];
            matriz[i][j] = isVerticesParaArestas ? (edge.from === node.id || edge.to === node.id ? 1 : 0) : (edge.from === i || edge.to === i ? 1 : 0);
        }
    }

    return matriz;
}
