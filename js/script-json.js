//Funcion para cargar os produtos desde o arquivo JSON
async function cargarProdutos() {
    try {
        const resposta = await fetch('../data/produtos.json'); //cargar o arquivo
        const produtos = await resposta.json(); //convertir a resposta  a un obxecto de javascript

        const listadoProdutos = document.getElementById('product-list'); //obter o contido

        //crear elementos html para cada produto
        produtos.forEach(produto => {
            const artigo = document.createElement('article');
            const nome = document.createElement('h2');
            const prezo = document.createElement('h3');
            const categoria = document.createElement('p');
            const portada = document.createElement('img');

            nome.textContent = produto.nome;
            prezo.innerHTML =  `<strong>${produto.prezo}</strong>`;
            categoria.textContent = produto.categoria;

            portada.src = produto.portada;
            portada.alt = produto.nome;

            artigo.appendChild(nome);
            artigo.appendChild(portada);
            artigo.appendChild(prezo);
            artigo.appendChild(categoria);
            

            //Engadir evento de clic ao artigo
            artigo.addEventListener('click', () => {
                mostrarModal(produto);
            });

            listadoProdutos.appendChild(artigo);
        });
    } catch (error) {
        console.error('erro ao cargar os produtos:', error);
    }
}

//funcion para mostrar a modal cos detalles do produto
function mostrarModal(produto) {
    const modal = document.getElementById('modal');
    const modalNome = document.getElementById('modal-nome');
    const modalPrezo = document.getElementById('modal-prezo');
    const modalCategoria = document.getElementById('modal-categoria');
    const modalPortada = document.getElementById('modal-portada');

    modalNome.textContent = produto.nome;
    modalPrezo.textContent = produto.prezo;
    modalCategoria.textContent = produto.categoria;
    modalPortada.src = produto.portada;
    modalPortada.alt = produto.nome;

    modal.style.display = 'block'; //amosar a modal

    //cerrar a modal ao premer no boton de cerrar
    const cerrarModal = document.getElementById('cerrar-modal');
    cerrarModal.addEventListener('click', () =>{
        modal.style.display = 'none';
    });

    //cerrar a modal ao facer click fora dela
    window.addEventListener('click', (event) =>{
        if(event.target === modal){
            modal.style.display = 'none';
        }
    });

}

window.onload = cargarProdutos;