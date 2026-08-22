"use strict";

// node:test e node:assert já fazem parte do Node.js.
// Por isso, não precisamos instalar nenhuma biblioteca para testar o projeto.
const test = require("node:test");
const assert = require("node:assert/strict");
const Calculadora = require("../assets/js/calculadora.js");

// Cria uma calculadora nova antes de cada cenário.
// Os objetos com textContent representam os dois elementos do display.
function criarCalculadora() {
  const telaAnterior = { textContent: "" };
  const telaAtual = { textContent: "" };
  const calculadora = new Calculadora(telaAnterior, telaAtual);

  return { calculadora, telaAnterior, telaAtual };
}

// Evita repetir a sequência de adicionar valores, operador e calcular.
function fazerConta(primeiroValor, operador, segundoValor) {
  const { calculadora } = criarCalculadora();

  String(primeiroValor)
    .split("")
    .forEach((numero) => {
      calculadora.adicionarNumero(numero);
    });

  calculadora.escolherOperador(operador);

  String(segundoValor)
    .split("")
    .forEach((numero) => {
      calculadora.adicionarNumero(numero);
    });

  calculadora.calcular();
  return calculadora;
}

test("inicia mostrando o número zero", () => {
  const { calculadora, telaAtual } = criarCalculadora();

  assert.equal(calculadora.valorAtual, "0");
  assert.equal(telaAtual.textContent, "0");
});

test("soma dois números", () => {
  const calculadora = fazerConta(12, "+", 8);
  assert.equal(calculadora.valorAtual, "20");
});

test("subtrai dois números", () => {
  const calculadora = fazerConta(15, "−", 4);
  assert.equal(calculadora.valorAtual, "11");
});

test("multiplica dois números", () => {
  const calculadora = fazerConta(7, "×", 6);
  assert.equal(calculadora.valorAtual, "42");
});

test("divide dois números", () => {
  const calculadora = fazerConta(20, "÷", 4);
  assert.equal(calculadora.valorAtual, "5");
});

test("mostra erro ao dividir por zero", () => {
  const calculadora = fazerConta(10, "÷", 0);
  assert.equal(calculadora.valorAtual, "Erro");
});

test("não permite mais de um separador decimal", () => {
  const { calculadora } = criarCalculadora();

  calculadora.adicionarNumero("2");
  calculadora.adicionarDecimal();
  calculadora.adicionarDecimal();
  calculadora.adicionarNumero("5");

  assert.equal(calculadora.valorAtual, "2.5");
});

test("troca o sinal e calcula a porcentagem", () => {
  const { calculadora } = criarCalculadora();

  calculadora.adicionarNumero("5");
  calculadora.trocarSinal();
  assert.equal(calculadora.valorAtual, "-5");

  calculadora.calcularPorcentagem();
  assert.equal(calculadora.valorAtual, "-0.05");
});

test("apaga somente o último dígito", () => {
  const { calculadora } = criarCalculadora();

  calculadora.adicionarNumero("1");
  calculadora.adicionarNumero("2");
  calculadora.adicionarNumero("3");
  calculadora.apagarUltimoDigito();

  assert.equal(calculadora.valorAtual, "12");
});

test("faz operações encadeadas", () => {
  const { calculadora } = criarCalculadora();

  calculadora.adicionarNumero("2");
  calculadora.escolherOperador("+");
  calculadora.adicionarNumero("3");
  calculadora.escolherOperador("×");
  calculadora.adicionarNumero("4");
  calculadora.calcular();

  assert.equal(calculadora.valorAtual, "20");
});
