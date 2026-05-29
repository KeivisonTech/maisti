const prompt = require('prompt-sync')();

class Companhia {
    constructor(nome) {
        this.nome = nome;
        this.trechos = [];
    }
}

class Trecho {
    constructor(companhia, origem, destino, valor) {
        this.companhia = companhia;
        this.origem = origem;
        this.destino = destino;
        this.valor = valor;
    }
}

class Sistema {
    constructor() {
        this.companhias = [];
        this.trechos = [];
        this.nextCompanhiaId = 1;
        this.nextTrechoId = 1;
    }

    pausar() {
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

    // COMPANHIAS
    cadastrarCompanhia(nome) {
        const Companhia = new Companhia(nome)
        this.companhias.push(this.companhias)
        console.log(`\nCompanhia "${nome}" cadastrada com Id ${this.nextCompanhiaId - 1}.`);
        this.nextCompanhiaId++

    }
    listarCompanhias(){
        if (this.companhias.length === 0) {
            console.log("\nNenhuma companhia cadastrada");
            return
        }
        this.companhias.forEach((c,i) => console.log(`[${i}] ${c.nome}`));
    }
    editarCompanhia(id, novoNome){
        if (!this.companhias[id]) {
            console.log("Companhia não encontrada.");
            return;
        } 
        this.companhias[id].nome = novoNome
        console.log(`companhia renomeada para ${novoNome}`)

    }
    excluirCompanhia(id){
        const index = id - 1;
        if (!this.companhias[index]) {
            console.log("\nCompanhia não encontrada.");
            return
        }
        const companhia = this.companhias[index];
        this.trechos = this.trechos.filter (t => t.companhia !== companhia)
        this.companhia.splice(index, 1);
        console.log("\nCompanhia excluida.");
    }

    // TRECHOS
    cadastrarTrecho(idCompanhia, origem, destino, valor){
        const companhia = this.companhias[idCompanhia - 1];
        if (!companhia) {
            console.log("\nCompanhia não encontrada.");
            return;
        }
        const trecho = new Trecho(companhia, origem, destino, valor);
        this.trechos.push(trecho);
        console.log(`\nTrecho ${origem} → ${destino} cadastrado com ID ${this.nextTrechoId}. `)
        this.nextTrechoId++;
        }
        listarTrechos(){
            if(this.trechos.length === 0) {
                console.log("\nNenhum trecho Cadastrado.");
                return;
            }
            console.log("\n=== Trechos ===");
            this.trechos.forEach((t, i) =>
            console.log(`[${i + 1}] ${t.origem} → ${t.destino} | R$${t.valor} | Companhia: ${t.Companhia.nome}`)
        );
    }
    listarTrechosPorCompanhia(){
        if (this.trechos.lenght === 0){
            console.log("\nNenhum comapanhia cadastrada.")
            return;
        }
        this.companhias.forEach((c,i) => {
            console.log(`\n[${i + 1}] ${c.nome}`);
            if (c.trechos.lenght === 0){
                console.log ("   Nenhum trecho")
            } else {
                c.trechos.forEach((t,j) =>
            console.log(`[${j + 1}] ${t.origem} → ${destino} | ${valor}`)
            );
            }
        });
    }
    editarTrecho(id, origem, destino, valor){ 
        const trecho = this.trechos [id - 1];
        if (!trecho) {
            console.log("\nTrecho não encontrado.");
            return
        }
        trecho.origem = origem
        trecho.destino = destino
        trecho.valor = valor
        console.log (`\nTrecho atualizado: ${origem}`)

    }
    excluirTrecho(id) { 
        const index = id - 1;
        if (!this.trechos[index]) {
            comsole.log("\nTrecho não encontrado");
            return;
        } 
        const trecho = this.trechos[index];
        trecho.companhia.trechos = trecho.companhia.trechos.filter(t => t !== trecho);
        this.trechos.splice(index, 1);
        console.log("\nTrecho excluido")

    }
}

// -------------------------------------------

const sistema = new Sistema();
let opcao = -1;

console.clear();
console.log("\n===========================================");
console.log("    BEM-VINDO AO SISTEMA DE PASSAGENS      ");
console.log("===========================================");

while (opcao !== 0) {
    console.log("\n---- MENU ----");
    console.log("1 - Gerenciar Companhias");
    console.log("2 - Gerenciar Trechos");
    console.log("3 - Visualizar Trechos");
    console.log("0 - Sair");
    console.log("-------------------------\n");

    opcao = parseInt(prompt("Escolha uma opção: "));

    switch (opcao) {

        case 1:
            console.log("\n---- COMPANHIAS ----");
            console.log("1 - Cadastrar");
            console.log("2 - Listar");
            console.log("3 - Editar");
            console.log("4 - Excluir");
            const opcaoCompanhia = parseInt(prompt("Escolha: "));

            switch (opcaoCompanhia) {
                case 1:
                    const nomeCompanhia = prompt("Nome da companhia: ");
                    sistema.cadastrarCompanhia(nomeCompanhia);
                    break;
                case 2:
                    sistema.listarCompanhias();
                    break;
                case 3:
                    sistema.listarCompanhias();
                    if (sistema.companhias.length > 0) {
                        const idCompanhiaEditar = parseInt(prompt("ID da companhia para editar: "));
                        const novoNomeCompanhia = prompt("Novo nome: ");
                        sistema.editarCompanhia(idCompanhiaEditar, novoNomeCompanhia);
                    }
                    break;
                case 4:
                    sistema.listarCompanhias();
                    if (sistema.companhias.length > 0) {
                        const idCompanhiaExcluir = parseInt(prompt("ID da companhia para excluir: "));
                        sistema.excluirCompanhia(idCompanhiaExcluir);
                    }
                    break;
            }
            sistema.pausar();
            break;

        case 2:
            console.log("\n---- TRECHOS ----");
            console.log("1 - Cadastrar");
            console.log("2 - Editar");
            console.log("3 - Excluir");
            const opcaoTrecho = parseInt(prompt("Escolha: "));

            switch (opcaoTrecho) {
                case 1:
                    if (sistema.companhias.length === 0) {
                        console.log("\n⚠️ Cadastre uma companhia antes de adicionar trechos.");
                    } else {
                        sistema.listarCompanhias();
                        const idCompanhiaTrecho = parseInt(prompt("ID da companhia: "));
                        const origemTrecho = prompt("Cidade de origem: ");
                        const destinoTrecho = prompt("Cidade de destino: ");
                        const valorTrecho = parseFloat(prompt("Valor do trecho: R$ "));
                        sistema.cadastrarTrecho(idCompanhiaTrecho, origemTrecho, destinoTrecho, valorTrecho);
                    }
                    break;
                case 2:
                    sistema.listarTrechos();
                    if (sistema.trechos.length > 0) {
                        const idTrechoEditar = parseInt(prompt("ID do trecho para editar: "));
                        const novaOrigem = prompt("Nova origem: ");
                        const novoDestino = prompt("Novo destino: ");
                        const novoValor = parseFloat(prompt("Novo valor: R$ "));
                        sistema.editarTrecho(idTrechoEditar, novaOrigem, novoDestino, novoValor);
                    }
                    break;
                case 3:
                    sistema.listarTrechos();
                    if (sistema.trechos.length > 0) {
                        const idTrechoExcluir = parseInt(prompt("ID do trecho para excluir: "));
                        sistema.excluirTrecho(idTrechoExcluir);
                    }
                    break;
            }
            sistema.pausar();
            break;

        case 3:
            console.log("\n---- VISUALIZAR ----");
            console.log("1 - Todos os trechos");
            console.log("2 - Por companhia");
            const opcaoVisualizacao = parseInt(prompt("Escolha: "));

            if (opcaoVisualizacao === 1) sistema.listarTrechos();
            else if (opcaoVisualizacao === 2) sistema.listarTrechosPorCompanhia();

            sistema.pausar();
            break;

        case 0:
            console.log("\nFinalizando o sistema... Até logo!\n");
            break;

        default:
            console.log("\n⚠️ Opção inválida! Tente novamente.");
            sistema.pausar();
            break;
    }}