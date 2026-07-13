// Seleciona o primeiro botão e o título
const meuBotao1 = document.getElementById('botao1');
const titulo = document.getElementById('tituloPrincipal');

// 1. DECLARAÇÃO DE FUNÇÃO
function mudarTexto() {
  // Modifica o conteúdo de texto do H1
  titulo.textContent = 'Texto alterado com sucesso!';
}

// Associa a função ao evento de clique do botão
meuBotao1.addEventListener('click', mudarTexto);

// Seleciona o segundo botão
const meuBotao2 = document.getElementById('botao2');

// 2. EXPRESSÃO DE FUNÇÃO
const mudarCor = function() {
  // Modifica o estilo CSS do H1
  const cor = [ "#0097a7", // Azul Turquesa
  "#e91e63", // Rosa Choque (Substituiu o preto)
  "#2634f1", // Azul Caneta
  "#16b616", // Verde Bandeira
  "#a33737", // Vermelho Queimado
  "#ff9800", // Laranja (Substituiu o azul escuro)
  "#9c27b0", // Roxo (Substituiu a repetição do turquesa)
  "#4caf50", // Verde Lima (Substituiu a repetição do preto)
  "#ffeb3b"  // Amarelo Vivo (Substituiu a repetição do azul 
  ];
  const corAleatoria = cor[Math.floor(Math.random() * cor.length)];
  titulo.style.color = corAleatoria;
};

// Associa a função ao evento de clique
meuBotao2.addEventListener('click', mudarCor);

// Seleciona o terceiro botão
const meuBotao3 = document.getElementById('botao3');

// 3. ARROW FUNCTION
const esconderTitulo = () => {
  // Modifica o estilo para esconder o elemento
  titulo.style.display = 'none';
};

// Associa a função ao evento de clique
meuBotao3.addEventListener('click', esconderTitulo);

const meubotao4 = document.getElementById('botao4');

// 3. ARROW FUNCTION
const mostrarTitulo = () => {
  // Modifica o estilo para esconder o elemento
  titulo.style.display = 'block';
};

// Associa a função ao evento de clique
meubotao4.addEventListener('click', mostrarTitulo);

const meuBotao5 = document.getElementById("botao5");

const mudarFundo = function () {
  const h1 = document.querySelector('h1');
   h1.style.backgroundColor = "blue";
};
meuBotao5.addEventListener('click', mudarFundo);



// NOTA: O atributo 'type="text/javascript"' era obrigatório antigamente,
        // mas hoje em dia é o padrão e pode ser omitido. Apenas <script> funciona.

        // Esta mensagem só aparecerá no console do navegador (F12) após a página ser carregada.
        console.log("Script do <body> executado! A página já está visível.");
        
        // --- DEFINIÇÃO DE UMA FUNÇÃO ---
        // A função é um bloco de código que pode ser chamado/executado quando quisermos.
        // Esta função será chamada quando o botão for clicado (pelo 'onclick').
        function iniciarInteracao() {
            
            // --- USO DE UMA FUNÇÃO PRÉ-DEFINIDA: prompt() ---
            // A função prompt() abre uma caixa de diálogo para solicitar uma entrada do usuário.
            const nomeUsuario = prompt("Por favor, digite o seu nome:");

            // --- MANIPULAÇÃO DO DOM (Document Object Model) ---
            // Usamos document.getElementById() para encontrar um elemento na página pelo seu 'id'.
            const elementoTitulo = document.getElementById("tituloPrincipal");

            // Verificamos se o usuário digitou um nome.
            if (nomeUsuario) {
                // Modificamos o conteúdo do elemento <h1> para incluir o nome do usuário.
                elementoTitulo.textContent = "Olá, " + nomeUsuario + "!";

                // --- USO DE UMA FUNÇÃO PRÉ-DEFINIDA: alert() ---
                // Usamos alert() para dar um feedback ao usuário.
                alert("O título da página foi alterado!");
            } else {
                alert("Você não digitou um nome, então o título não foi alterado.");
            }
            // --- FIM DA FUNÇÃO ---
        }