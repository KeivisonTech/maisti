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
    }
carregar(){
    if(!fs.existsSync("package.json")){
        return ;}
        else{
            const conteudo = fs.readFileSync()
            dados = JSON.parse (conteudo)
            this.companhias = dados.companhias
            this.trechos = dados.trechos
        }
    }


    salvar() {
             dados = { companhias: this.companhias,
            trechos: this.trechos
        };
        objeto = JSON.stringify(dados, null, 2)
        fs.writeFileSync(
            "dados.json", objeto
            
        );

        console.log("Dados salvos")
    }

    pausar() {
        console.log("\n-------------------------------------------");
        prompt("Pressione ENTER para continuar...");
        console.clear();
    }

    // COMPANHIAS
    cadastrarCompanhia(nome) {
        const novaCompanhia = new Companhia(nome);
        this.companhias.push(novaCompanhia);
        console.log("\nCompanhia cadastrada com sucesso!");
    }

    listarCompanhias() {
        console.log("\n======= ✈️  COMPANHIAS =======");
        if (this.companhias.length === 0) {
            console.log("\nNenhuma companhia cadastrada.");
        } else {
            this.companhias.forEach((companhia, index) => {
                console.log(`[${index}] ${companhia.nome}`);
            });
        }
    }

    editarCompanhia(id, novoNome) {
        if (this.companhias[id]) {
            this.companhias[id].nome = novoNome;
            console.log("\nCompanhia atualizada com sucesso!");
        } else {
            console.log("\nErro: Companhia não encontrada.");
        }
    }

    excluirCompanhia(id) {
        if (this.companhias[id]) {
            this.companhias.splice(id, 1);
            console.log("\nCompanhia removida com sucesso!");
        } else {
            console.log("\nErro: Companhia não encontrada.");
        }
    }

    // TRECHOS
    cadastrarTrecho(idCompanhia, origem, destino, valor) {
        if (this.companhias[idCompanhia]) {
            const novoTrecho = new Trecho(this.companhias[idCompanhia].nome, origem, destino, valor);
            this.trechos.push(novoTrecho);
            console.log("\nTrecho cadastrado com sucesso!");
        } else {
            console.log("\nErro: Companhia não encontrada.");
        }
    }

    listarTrechos() {
        console.log("\n======= 🗺️  TRECHOS =======");
        if (this.trechos.length === 0) {
            console.log("\nNenhum trecho cadastrado.");
        } else {
            this.trechos.forEach((trecho, index) => {
                console.log(`\n[${index}] ${trecho.origem} → ${trecho.destino}`);
                console.log(`   ✈️  Companhia: ${trecho.companhia}`);
                console.log(`   💰 Valor: R$ ${trecho.valor.toFixed(2)}`);
                console.log("-------------------------------------------");
            });
        }
    }

    listarTrechosPorCompanhia() {
        console.log("\n======= ✈️  TRECHOS POR COMPANHIA =======");
        if (this.companhias.length === 0) {
            console.log("\nNenhuma companhia cadastrada.");
        } else {
            this.companhias.forEach((companhia) => {
                console.log(`\n📌 ${companhia.nome.toUpperCase()}`);
                const trechosDaCompanhia = this.trechos.filter(trecho => trecho.companhia === companhia.nome);
                if (trechosDaCompanhia.length === 0) {
                    console.log("   Nenhum trecho cadastrado para essa companhia.");
                } else {
                    trechosDaCompanhia.forEach((trecho, index) => {
                        console.log(`   [${index}] ${trecho.origem} → ${trecho.destino} | R$ ${trecho.valor.toFixed(2)}`);
                    });
                }
                console.log("-------------------------------------------");
            });
        }
    }

    editarTrecho(id, origem, destino, valor) {
        if (this.trechos[id]) {
            this.trechos[id].origem = origem;
            this.trechos[id].destino = destino;
            this.trechos[id].valor = valor;
            console.log("\nTrecho atualizado com sucesso!");
        } else {
            console.log("\nErro: Trecho não encontrado.");
        }
    }

    excluirTrecho(id) {
        if (this.trechos[id]) {
            this.trechos.splice(id, 1);
            console.log("\nTrecho removido com sucesso!");
        } else {
            console.log("\nErro: Trecho não encontrado.");
        }
    }
}

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
            console.log("\n⚠️.++ Opção inválida! Tente novamente.");
            sistema.pausar();
            break;
    }
}
