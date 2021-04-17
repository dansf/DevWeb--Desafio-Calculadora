'use strict';

const display = document.getElementById("display-output");
const historico = document.getElementById("display-history");
//[id*=tecla] chama a tag com o id que tenha parte do nome a plavra tecla
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador = null;
let numeroAnterior = null;
let operadorHistorico = null;
let numeroHistorico = null;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
	if(operacaoPendente() == true){
		const numeroAtual = parseFloat(display.textContent.replace(',','.'));
		novoNumero = true;
		switch (operador){
			case "+":
				atualizarDisplay(numeroAnterior	+ numeroAtual);
				break;
			
			case "-":
				atualizarDisplay(numeroAnterior - numeroAtual);
				break;
			
			case "x":
				atualizarDisplay(numeroAnterior * numeroAtual);
				break;
			
			case "/":
				atualizarDisplay((numeroAnterior / numeroAtual));
				break;
			
			case "%":
				atualizarDisplay((numeroAnterior % numeroAtual));
				break;
		}
	}
}

//Histórico
const atualizarHistorico = () => {
	numeroHistorico = numeroAnterior;
	operadorHistorico = operador;
	historico.textContent = texto;
	// historico.textContent += " " + numeroHistorico +" "+ operadorHistorico;
}

const atualizarDisplay = (texto) => {
	if(novoNumero == true){
		display.textContent = texto.toLocaleString('br');
		novoNumero = false;
		
	}
	else{
		display.textContent += texto.toLocaleString('br');
	}
}

const inserirNumero = (evento) => {
	atualizarDisplay(evento.target.textContent);
}

numeros.forEach(numero => {
	numero.addEventListener('click', inserirNumero)
});

const selecionarOperador = (evento) => {
	if(!novoNumero){
		calcular();
		novoNumero = true;
		operador = evento.target.textContent;
		numeroAnterior = parseFloat(display.textContent.replace(',','.'));
	}
	//Parte do histórico
	atualizarHistorico();
}

operadores.forEach(operador => {
	operador.addEventListener('click', selecionarOperador)
});

const ativarIgual = () => {
	calcular();
	operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

const removerCaracter = () => {
	display.textContent = display.textContent.substr(0, display.textContent.length -1)
}
document.getElementById('CE').addEventListener('click', removerCaracter);

const limparDisplay = () => display.textContent = "";
const limparCalculo = () => {
	limparDisplay();
	operador = undefined;
	novoNumero = true;
	numeroAnterior = undefined;
}

document.getElementById("C").addEventListener('click', limparCalculo);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
	if(!existeDecimal()){
		if(existeValor()){
			atualizarDisplay(',');
		}
		else{
			atualizarDisplay('0,');
		}
	}
}
document.getElementById("decimal").addEventListener('click', inserirDecimal);