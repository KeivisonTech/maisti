// Seleciona o primeiro botão e o título
const meuBotao1 = document.getElementById("botao1");
const titulo = document.getElementById("tituloPrincipal");
// 1. DECLARAÇÃO DE FUNÇÃO
function mudarTexto() {
	// Modifica o conteúdo de texto do H1
	titulo.textContent = "FAÇAM: OOOOOOOOOOOH";
}
// Associa a função ao evento de clique do botão1
meuBotao1.addEventListener("click", mudarTexto);

// Seleciona o segundo botão
const meuBotao2 = document.getElementById("botao2");
// 2. EXPRESSÃO DE FUNÇÃO
const mudarCor = function () {
	// Modifica o estilo CSS do H1
	titulo.style.color = "blue";
};
// Associa a função ao evento de clique
meuBotao2.addEventListener("click", mudarCor);

// Seleciona o terceiro botão
const meuBotao3 = document.getElementById("botao3");

var cont = 0;
// 3. ARROW FUNCTION
const esconderTitulo = () => {
	if (cont % 2 === 0) {
		titulo.style.display = "none";
	} else if (cont % 2 === 1) {
		titulo.style.display = "block";
	}
	cont++; // cont = cont + 1; ou cont += 1;
};
// Associa a função ao evento de clique
meuBotao3.addEventListener("click", esconderTitulo);

const meubotao4 = document.getElementById("botao4");
function mostrarTitulo() {
	titulo.style.display = "block";
}
meubotao4.addEventListener("click", mostrarTitulo);

let cores = [
	"red",
	"green",
	"blue",
	"yellow",
	"purple",
	"orange",
	"pink",
	"cyan",
	"magenta",
	"lime",
	"aqua-marine",
	"fuxia",
];

rosa = cores[6];
cores.push("melon");

function mudarCorAleatoria() {
	let indiceAleatorio = Math.floor(Math.random() * cores.length);
	titulo.style.color = cores[indiceAleatorio];
}

const meubotao5 = document.getElementById("botao5");
meubotao5.addEventListener("click", mudarCorAleatoria);

// let nome = prompt("Qual é o seu nome?");
// console.log(nome);

// let resposta = confirm("Tem certeza?");
// console.log(resposta); // true ou false

// HTML a adicionar:
// <button id="botao6">Personalizar Título</button>

const botao6 = document.getElementById("botao6");
function verificaTexto() {
	let novoTexto = prompt("Digite o novo título:");
	if (
		novoTexto !== null &&
		novoTexto !== "" &&
		5 <= novoTexto.length &&
		novoTexto.length <= 50
	) {
		titulo.textContent = novoTexto;
	} else {
		alert("Nenhuma alteração feita.");
	}
}
botao6.addEventListener("click", verificaTexto);

const botao7 = document.getElementById("botao7");
function reinicia() {
	window.location.reload();
}
botao7.addEventListener("click", reinicia);

// ========== SCRIPT DO FORMULÁRIO ========== //

const form = document.getElementById("formCadastro");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	// Captura os valores do formulário
	let nome = document.getElementById("inputNome").value;
	let email = document.getElementById("inputEmail").value.trim();
	let idade = document.getElementById("inputIdade").value;
	let cor = document.getElementById("inputCor").value;
	let senha = document.getElementById("inputSenha").value;

// função para  validar o email
 function validarEmail(email) {
  const partes = email.split("@"); // quebra o @

  
  if (partes.length !== 2) return false;

  const usuario = partes[0]; 
  const dominio = partes[1];

  // 
  if (usuario.length === 0) return false;
  if (dominio.length === 0) return false;
  if (!dominio.includes("mail")) return false; // se tiver email  ele confirma
  if (!dominio.includes("com")) return false;  // se tiver .com ele confirma

  isNaN(parseInt(usuario[0]));

  return true;
}

if (!validarEmail(email)) {
		alert("Email inválido! Verifique o formato ou se inicia com número.");
		return; // Para a execução do formulário aqui
	}



	//    victorbenevides4@gmail.com
	//break
	// if (typeof(mail[0][0]) === 'number'){

	// }
	// else if (!isNaN(mail[0][0])){
	// 	alert("Email inválido! O nome de usuário não pode começar com um número.");
	// 	return; //break
	// }

	// Exibe tudo em um alert formatado
	alert(
		"===== DADOS DO CADASTRO =====\n" +
			"Nome: " +
			nome +
			"\n" +
			"Email: " +
			email +
			"\n" +
			"Idade: " +
			idade +
			" anos\n" +
			"Cor favorita: " +
			cor +
			"\n" +
			"Senha: " +
			"*******",
	);
});