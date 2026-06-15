const prompt = require('prompt-sync')();
const db = require('./database');

// -------------------------------------------
// FUNÇÕES AUXILIARES
// -------------------------------------------

function pausar() {
    console.log('\n-------------------------------------------');
    prompt('Pressione ENTER para continuar...');
    console.clear();
}

// -------------------------------------------
// FUNÇÕES DE VISUALIZACAO
// -------------------------------------------

function listarTodosOsTrechos() {
    // CORREÇÃO: Mudado de Trechos para Trecho e idcompanhia para idCompanhia
    const buscarT = `
        SELECT Trecho.*, Companhia.nome AS nomeCompanhia
        FROM Trecho 
        INNER JOIN Companhia ON Trecho.idCompanhia = Companhia.id
        WHERE Trecho.numeroPassagens >= 0
        ORDER BY Trecho.id
    `;
    const trechos = db.prepare(buscarT).all();

    console.log('\n===== TRECHOS DISPONIVEIS =====');
    if (trechos.length === 0) {
        console.log('Nenhum trecho com passagens disponível.');
        return;
    }

    trechos.forEach(trecho => {
        console.log(`ID: ${trecho.id} | ${trecho.origem} -> ${trecho.destino} | R$${trecho.valor.toFixed(2)} | Companhia: ${trecho.nomeCompanhia} | Vagas: ${trecho.numeroPassagens}`);
    });
}

function listarTrechosPorCompanhia() {
    const companhias = db.prepare('SELECT id, nome FROM Companhia').all();

    if (companhias.length === 0) {
        console.log('\nNenhuma companhia cadastrada.');
        return;
    }

    console.log('\n===== Companhias =====');
    companhias.forEach(comp => {
        console.log(`ID: ${comp.id} | Nome: ${comp.nome}`);
    });

    const idCompanhia = parseInt(prompt('\nDigite o ID da companhia desejada: '));

    // CORREÇÃO: Ajustado para Trecho e idCompanhia
    const buscarT = `
        SELECT Trecho.*, Companhia.nome AS nomeCompanhia
        FROM Trecho
        INNER JOIN Companhia ON Trecho.idCompanhia = Companhia.id
        WHERE Trecho.idCompanhia = ? AND Trecho.numeroPassagens > 0
    `;
    const trechosFiltrados = db.prepare(buscarT).all(idCompanhia);

    console.log('\n===== Trechos da Companhia =====');
    if (trechosFiltrados.length === 0) {
        console.log('Nenhum trecho disponível para esta companhia.');
        return;
    }

    trechosFiltrados.forEach(trecho => {
        console.log(`ID: ${trecho.id} | ${trecho.origem} -> ${trecho.destino} | R$${trecho.valor.toFixed(2)} | Vagas: ${trecho.numeroPassagens}`);
    });
}

// -------------------------------------------
// FUNÇÕES DE COMPRA
// -------------------------------------------

function exibirCarrinho(carrinho) {
    console.log('\n==== SEU CARRINHO ====');
    if (carrinho.length === 0) {
        console.log('Carrinho vazio.');
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        console.log(`${index + 1} - ${item.origem} -> ${item.destino} | R$${item.valor.toFixed(2)} | ${item.nomeCompanhia}`);
        total += item.valor;
    });
    console.log(`\nSubtotal: R$${total.toFixed(2)}`);
}

function adicionarAoCarrinho(carrinho) {
    listarTodosOsTrechos();

    const idTrecho = parseInt(prompt('\nDigite o ID do trecho para adicionar: '));

    // CORREÇÃO: Ajustado para usar Trecho e idCompanhia
    const buscarT = `
        SELECT Trecho.*, Companhia.nome AS nomeCompanhia
        FROM Trecho
        JOIN Companhia ON Trecho.idCompanhia = Companhia.id
        WHERE Trecho.id = ?
    `;
    const trecho = db.prepare(buscarT).get(idTrecho);

    if (!trecho) {
        console.log('\nTrecho não encontrado.');
        return;
    }

    if (trecho.numeroPassagens <= 0) {
        console.log('\nSem passagens disponíveis para esse trecho.');
        return;
    }

    carrinho.push(trecho);
    console.log(`\nTrecho ${trecho.origem} -> ${trecho.destino} adicionado ao carrinho!`);
}

function removerDoCarrinho(carrinho) {
    if (carrinho.length === 0) {
        console.log('\nCarrinho já está vazio');
        return;
    }

    exibirCarrinho(carrinho);
    const index = parseInt(prompt('\nDigite o numero do item para remover: ')) - 1;

    if (index >= 0 && index < carrinho.length) {
        const removido = carrinho.splice(index, 1)[0]; // CORREÇÃO: Adicionado [0] para pegar o objeto removido corretamente
        console.log(`\nTrecho ${removido.origem} -> ${removido.destino} removido.`);
    } else {
        console.log('\nNúmero inválido.');
    }
}

function aplicarCupom() {
    const codigo = prompt('\nDigite o codigo do cupom ou ENTER para pular: ').trim().toUpperCase();

    if (!codigo) return 0;

    const cupom = db.prepare('SELECT * FROM Cupom WHERE codigo = ?').get(codigo);
    
    if (!cupom) {
        console.log('\nCupom inválido ou não encontrado.');
        return 0;
    }

    // CORREÇÃO: Alterado de quantidade para numeroCupons (conforme seu banco)
    if (cupom.numeroCupons <= 0) {
        console.log('\nEste cupom já esgotou.');
        return 0;
    }

    // CORREÇÃO: Alterado de desconto para percentualDesconto (conforme seu banco)
    console.log(`\nCupom aplicado! Você ganhou ${cupom.percentualDesconto}% de desconto.`);
    
    // Guardamos o código usado para diminuir a quantidade depois se a compra fechar
    return { percentual: cupom.percentualDesconto, codigo: cupom.codigo };
}

function finalizarCompra(carrinho) {
    if (carrinho.length === 0) {
        console.log('\nSeu carrinho está vazio.');
        return false;
    }

    let subtotal = 0;
    carrinho.forEach(item => subtotal += item.valor);

    const infoCupom = aplicarCupom();
    const descontoPercentual = infoCupom ? infoCupom.percentual : 0;
    const valorDesconto = subtotal * (descontoPercentual / 100);
    const valorFinal = subtotal - valorDesconto;

    console.log('\n==== NOTA FISCAL ====');
    carrinho.forEach(item => {
        console.log(`${item.origem} -> ${item.destino} (${item.nomeCompanhia}): R$${item.valor.toFixed(2)}`);
    });
    console.log('---------------------');
    console.log(`Subtotal: R$${subtotal.toFixed(2)}`);
    console.log(`Desconto (${descontoPercentual}%): R$${valorDesconto.toFixed(2)}`);
    console.log(`Valor Final: R$${valorFinal.toFixed(2)}`);
    console.log('=====================');

    const confirmacao = prompt('Digite "comprar" para confirmar o pagamento: ').trim().toLowerCase();

    if (confirmacao === 'comprar') {
        // CORREÇÃO: Mudado para Trecho e decrementa as vagas
        carrinho.forEach(item => {
            db.prepare('UPDATE Trecho SET numeroPassagens = numeroPassagens - 1 WHERE id = ?').run(item.id);
        });

        // CORREÇÃO: Se usou cupom, diminui 1 da quantidade disponível dele no banco
        if (infoCupom && infoCupom.codigo) {
            db.prepare('UPDATE Cupom SET numeroCupons = numeroCupons - 1 WHERE codigo = ?').run(infoCupom.codigo);
        }

        console.log('\nCompra realizada com sucesso! Boa viagem!');
        return true;
    } else {
        console.log('\nCompra cancelada.');
        return false;
    }
}

// -------------------------------------------
// MENU PRINCIPAL (Mantido igual)
// -------------------------------------------
let opcao = -1;
const carrinho = []; // <-- ADICIONADO AQUI PARA CORRIGIR O ERRO!

while (opcao !== 0) {
    console.log('\n---- MENU ----');
    console.log('1 - Ver trechos disponiveis');
    console.log('2 - Adicionar trecho ao carrinho');
    console.log('3 - Remover trecho do carrinho');
    console.log('4 - Ver carrinho');
    console.log('5 - Finalizar compra');
    console.log('0 - Sair');
    console.log('-------------------------\n');

    opcao = parseInt(prompt('Escolha uma opcao: '));

    switch (opcao) {
        case 1:
            console.log('\n---- VISUALIZAR TRECHOS ----');
            console.log('1 - Todos os trechos');
            console.log('2 - Por companhia');
            const opcaoVisualizacao = parseInt(prompt('Escolha: '));

            if (opcaoVisualizacao === 1) listarTodosOsTrechos();
            else if (opcaoVisualizacao === 2) listarTrechosPorCompanhia();
            else console.log('\nOpcao invalida.');

            pausar();
            break;

        case 2:
            adicionarAoCarrinho(carrinho);
            pausar();
            break;

        case 3:
            removerDoCarrinho(carrinho);
            pausar();
            break;

        case 4:
            exibirCarrinho(carrinho);
            pausar();
            break;

        case 5:
            const compraFinalizada = finalizarCompra(carrinho);
            if (compraFinalizada) {
                carrinho.length = 0; 
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
