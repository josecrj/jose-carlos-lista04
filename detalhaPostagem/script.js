let campoUsuario = document.getElementById("usuario");
let areaPostagens = document.getElementById("postagens");
let mensagem = document.getElementById("mensagem");

async function carregarUsuarios() {
    try {
        let resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!resposta.ok) throw new Error("Erro na consulta");
        let usuarios = await resposta.json();

        for (let usuario of usuarios) {
            let opcao = document.createElement("option");
            opcao.value = usuario.id;
            opcao.textContent = usuario.name;
            campoUsuario.appendChild(opcao);
        }
    } catch (erro) {
        mensagem.textContent = "Erro ao carregar usuários.";
    }
}

async function carregarPostagens() {
    let id = campoUsuario.value;
    areaPostagens.innerHTML = "";
    mensagem.textContent = "";

    if (id === "") return;

    try {
        let resposta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        if (!resposta.ok) throw new Error("Erro na consulta");
        let postagens = await resposta.json();

        for (let postagem of postagens) {
            let caixa = document.createElement("div");
            let titulo = document.createElement("h3");
            let detalhes = document.createElement("div");

            titulo.textContent = postagem.title;
            titulo.style.cursor = "pointer";
            titulo.style.color = "blue";

            titulo.addEventListener("click", function() {
                mostrarDetalhes(postagem.id, detalhes);
            });

            caixa.appendChild(titulo);
            caixa.appendChild(detalhes);
            areaPostagens.appendChild(caixa);
        }
    } catch (erro) {
        mensagem.textContent = "Erro ao carregar postagens.";
    }
}

async function mostrarDetalhes(id, area) {
    area.textContent = "Carregando...";

    try {
        let respostaPostagem = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        let respostaComentarios = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        if (!respostaPostagem.ok || !respostaComentarios.ok) throw new Error("Erro na consulta");

        let postagem = await respostaPostagem.json();
        let comentarios = await respostaComentarios.json();
        area.innerHTML = "";

        let texto = document.createElement("p");
        texto.textContent = postagem.body;
        area.appendChild(texto);

        let subtitulo = document.createElement("h4");
        subtitulo.textContent = "Comentários:";
        area.appendChild(subtitulo);

        for (let comentario of comentarios) {
            let linha = document.createElement("p");
            linha.textContent = comentario.name + ": " + comentario.body;
            area.appendChild(linha);
        }
    } catch (erro) {
        area.textContent = "Erro ao carregar detalhes e comentários.";
    }
}

campoUsuario.addEventListener("change", carregarPostagens);
carregarUsuarios();
