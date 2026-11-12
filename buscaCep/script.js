async function buscarCEP() {
    let cep = document.getElementById("cep").value.replace("-", "").trim();
    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = "";
    document.getElementById("logradouro").textContent = "";
    document.getElementById("bairro").textContent = "";
    document.getElementById("cidade").textContent = "";
    document.getElementById("estado").textContent = "";

    if (!/^\d{8}$/.test(cep)) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    try {
        let resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!resposta.ok) throw new Error("Falha na consulta");

        let dados = await resposta.json();

        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado.";
            return;
        }

        document.getElementById("logradouro").textContent = "Rua: " + dados.logradouro;
        document.getElementById("bairro").textContent = "Bairro: " + dados.bairro;
        document.getElementById("cidade").textContent = "Cidade: " + dados.localidade;
        document.getElementById("estado").textContent = "Estado: " + dados.uf;
    } catch (erro) {
        mensagem.textContent = "Erro ao consultar o CEP.";
    }
}
