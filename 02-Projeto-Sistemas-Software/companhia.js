const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    console.log("\n-------------------------------------------");
    prompt("Pressione ENTER para continuar...");
    console.clear();
}

function listarCompanhias() {
    const SQLlistar = "SELECT * FROM Companhia";
    const companhias = db.prepare(SQLlistar).all();

    if (companhias.length === 0) {
        console.log('\nNenhuma companhia cadastrada.');
    } else {
        console.log('\n---- COMPANHIAS ----');
        companhias.forEach(c => {
            console.log(`[${c.id}] ${c.nome} - Fundada em ${c.anoFundacao}`);
        });
    }

    return companhias;
}

function validarOuCadastrarCompanhia(idInformado) {
    const SQLbuscar = "SELECT * FROM Companhia WHERE id = ?";
    const companhia = db.prepare(SQLbuscar).get(idInformado);

    if (companhia) {
        return companhia.id;
    }

    console.log('\nCompanhia nao encontrada.');
    const resposta = prompt('Deseja cadastrar uma nova companhia? (s/n): ');

    if (resposta.toLowerCase() === 's') {
        const nome = prompt('Nome da companhia: ');
        const anoFundacao = parseInt(prompt('Ano de fundacao: '));

        const SQLinserir = "INSERT INTO Companhia (nome, anoFundacao) VALUES (?, ?)";
        const resultado = db.prepare(SQLinserir).run(nome, anoFundacao);

        console.log('\nCompanhia cadastrada com sucesso!');
        return resultado.lastInsertRowid;
    }

    return null;
}

// -------------------------------------------
// FUNÇÕES DE TRECHOS
// -------------------------------------------

function cadastrarTrecho() {
    listarCompanhias();
    const idCompanhia = parseInt(prompt('\nInforme o ID da companhia: '));
    const idValido = validarOuCadastrarCompanhia(idCompanhia);

    if (!idValido) {
        console.log('\nOperacao cancelada.');
        return;
    }

    const origem = prompt('Origem: ');
    const destino = prompt('Destino: ');
    const valor = parseFloat(prompt('Valor: '));
    const numeroPassagens = parseInt(prompt('Numero de passagens: '));

    const SQLinserir = "INSERT INTO Trecho (idCompanhia, origem, destino, valor, numeroPassagens) VALUES (?, ?, ?, ?, ?)";
    db.prepare(SQLinserir).run(idValido, origem, destino, valor, numeroPassagens);

    console.log('\nTrecho cadastrado com sucesso!');
}

function listarTrechos() {
    const SQLlistar = `
        SELECT Trecho.*, Companhia.nome AS nomeCompanhia 
        FROM Trecho 
        JOIN Companhia ON Trecho.idCompanhia = Companhia.id
    `;
    const trechos = db.prepare(SQLlistar).all();

    if (trechos.length === 0) {
        console.log('\nNenhum trecho cadastrado.');
    } else {
        console.log('\n---- TRECHOS ----');
        trechos.forEach(t => {
            console.log(`[${t.id}] ${t.origem} -> ${t.destino} | R$ ${t.valor} | ${t.numeroPassagens} passagens | Companhia: ${t.nomeCompanhia}`);
        });
    }
}

function editarTrecho() {
    listarTrechos();
    const id = parseInt(prompt('\nInforme o ID do trecho a editar: '));

    const SQLbuscar = "SELECT * FROM Trecho WHERE id = ?";
    const trecho = db.prepare(SQLbuscar).get(id);

    if (!trecho) {
        console.log('\nTrecho nao encontrado.');
        return;
    }

    const origem = prompt(`Origem (${trecho.origem}): `) || trecho.origem;
    const destino = prompt(`Destino (${trecho.destino}): `) || trecho.destino;
    const valor = parseFloat(prompt(`Valor (${trecho.valor}): `)) || trecho.valor;
    const numeroPassagens = parseInt(prompt(`Numero de passagens (${trecho.numeroPassagens}): `)) || trecho.numeroPassagens;

    const SQLatualizar = "UPDATE Trecho SET origem = ?, destino = ?, valor = ?, numeroPassagens = ? WHERE id = ?";
    db.prepare(SQLatualizar).run(origem, destino, valor, numeroPassagens, id);

    console.log('\nTrecho atualizado com sucesso!');
}

function excluirTrecho() {
    listarTrechos();
    const id = parseInt(prompt('\nInforme o ID do trecho a excluir: '));

    const SQLbuscar = "SELECT * FROM Trecho WHERE id = ?";
    const trecho = db.prepare(SQLbuscar).get(id);

    if (!trecho) {
        console.log('\nTrecho nao encontrado.');
        return;
    }

    const SQLexcluir = "DELETE FROM Trecho WHERE id = ?";
    db.prepare(SQLexcluir).run(id);

    console.log('\nTrecho excluido com sucesso!');
}

// -------------------------------------------
// FUNÇÕES DE CUPONS
// -------------------------------------------

function cadastrarCupom() {
    listarCompanhias();
    const idCompanhia = parseInt(prompt('\nInforme o ID da companhia: '));
    const idValido = validarOuCadastrarCompanhia(idCompanhia);

    if (!idValido) {
        console.log('\nOperacao cancelada.');
        return;
    }

    const codigo = prompt('Codigo do cupom: ');
    const percentualDesconto = parseFloat(prompt('Percentual de desconto: '));
    const numeroCupons = parseInt(prompt('Numero de cupons: '));

    const SQLinserir = "INSERT INTO Cupom (idCompanhia, codigo, percentualDesconto, numeroCupons) VALUES (?, ?, ?, ?)";
    db.prepare(SQLinserir).run(idValido, codigo, percentualDesconto, numeroCupons);

    console.log('\nCupom cadastrado com sucesso!');
}

function listarCupons() {
    const SQLlistar = `
        SELECT Cupom.*, Companhia.nome AS nomeCompanhia 
        FROM Cupom 
        JOIN Companhia ON Cupom.idCompanhia = Companhia.id
    `;
    const cupons = db.prepare(SQLlistar).all();

    if (cupons.length === 0) {
        console.log('\nNenhum cupom cadastrado.');
    } else {
        console.log('\n---- CUPONS ----');
        cupons.forEach(c => {
            console.log(`[${c.id}] Codigo: ${c.codigo} | Desconto: ${c.percentualDesconto}% | ${c.numeroCupons} cupons | Companhia: ${c.nomeCompanhia}`);
        });
    }
}

function editarCupom() {
    listarCupons();
    const id = parseInt(prompt('\nInforme o ID do cupom a editar: '));

    const SQLbuscar = "SELECT * FROM Cupom WHERE id = ?";
    const cupom = db.prepare(SQLbuscar).get(id);

    if (!cupom) {
        console.log('\nCupom nao encontrado.');
        return;
    }

    const codigo = prompt(`Codigo (${cupom.codigo}): `) || cupom.codigo;
    const percentualDesconto = parseFloat(prompt(`Percentual de desconto (${cupom.percentualDesconto}): `)) || cupom.percentualDesconto;
    const numeroCupons = parseInt(prompt(`Numero de cupons (${cupom.numeroCupons}): `)) || cupom.numeroCupons;

    const SQLatualizar = "UPDATE Cupom SET codigo = ?, percentualDesconto = ?, numeroCupons = ? WHERE id = ?";
    db.prepare(SQLatualizar).run(codigo, percentualDesconto, numeroCupons, id);

    console.log('\nCupom atualizado com sucesso!');
}

function excluirCupom() {
    listarCupons();
    const id = parseInt(prompt('\nInforme o ID do cupom a excluir: '));

    const SQLbuscar = "SELECT * FROM Cupom WHERE id = ?";
    const cupom = db.prepare(SQLbuscar).get(id);

    if (!cupom) {
        console.log('\nCupom nao encontrado.');
        return;
    }

    const SQLexcluir = "DELETE FROM Cupom WHERE id = ?";
    db.prepare(SQLexcluir).run(id);

    console.log('\nCupom excluido com sucesso!');
}

// -------------------------------------------
// MENU PRINCIPAL
// -------------------------------------------

let opcao = -1;

console.clear();
console.log('\n===========================================');
console.log('   SISTEMA DE PASSAGENS - COMPANHIA        ');
console.log('===========================================');

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Gerenciar Trechos');
    console.log('2 - Gerenciar Cupons');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {
        case 1:
            console.log('\n---- TRECHOS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoTrecho = parseInt(prompt('Escolha: '));

            switch (opcaoTrecho) {
                case 1: cadastrarTrecho(); break;
                case 2: listarTrechos(); break;
                case 3: editarTrecho(); break;
                case 4: excluirTrecho(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 2:
            console.log('\n---- CUPONS ----');
            console.log('1 - Cadastrar');
            console.log('2 - Listar');
            console.log('3 - Editar');
            console.log('4 - Excluir');
            const opcaoCupom = parseInt(prompt('Escolha: '));

            switch (opcaoCupom) {
                case 1: cadastrarCupom(); break;
                case 2: listarCupons(); break;
                case 3: editarCupom(); break;
                case 4: excluirCupom(); break;
                default: console.log('\nOpcao invalida.'); break;
            }
            pausar();
            break;

        case 0:
            console.log('\nFinalizando o sistema... Ate logo!\n');
            break;

        default:
            console.log('\nOpcao invalida! Tente novamente.');
            pausar();
            break;
    }
}