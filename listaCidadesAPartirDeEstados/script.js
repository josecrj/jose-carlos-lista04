let campoEstado = document.getElementById("estado");
let campoCidade = document.getElementById("cidade");
let resultado = document.getElementById("resultado");
let mensagem = document.getElementById("mensagem");

async function carregarEstados() {
    try {
        let resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        if (!resposta.ok) throw new Error("Erro na consulta");
        let estados = await resposta.json();

        for (let estado of estados) {
            let opcao = document.createElement("option");
            opcao.value = estado.sigla;
            opcao.textContent = estado.nome;
            campoEstado.appendChild(opcao);
        }
    } catch (erro) {
        mensagem.textContent = "Não foi possível carregar os estados.";
    }
}

async function carregarCidades() {
    let uf = campoEstado.value;
    campoCidade.innerHTML = '<option value="">Selecione uma cidade</option>';
    campoCidade.disabled = true;
    resultado.textContent = "";
    mensagem.textContent = "";

    if (uf === "") return;

    try {
        let resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        if (!resposta.ok) throw new Error("Erro na consulta");
        let cidades = await resposta.json();

        for (let cidade of cidades) {
            let opcao = document.createElement("option");
            opcao.value = cidade.nome;
            opcao.textContent = cidade.nome;
            campoCidade.appendChild(opcao);
        }
        campoCidade.disabled = false;
    } catch (erro) {
        mensagem.textContent = "Não foi possível carregar as cidades.";
    }
}

function mostrarEscolha() {
    let cidade = campoCidade.value;
    let estado = campoEstado.options[campoEstado.selectedIndex].textContent;

    if (cidade !== "") {
        resultado.textContent = "Cidade: " + cidade + " | Estado: " + estado;
    } else {
        resultado.textContent = "";
    }
}

campoEstado.addEventListener("change", carregarCidades);
campoCidade.addEventListener("change", mostrarEscolha);
carregarEstados();
