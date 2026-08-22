"use strict";

// A classe guarda os valores e reúne toda a lógica da calculadora.
// Assim, o código da conta fica separado dos eventos dos botões.
class Calculadora {
  constructor(telaAnterior, telaAtual) {
    this.telaAnterior = telaAnterior;
    this.telaAtual = telaAtual;

    this.limparTudo();
  }

  // Volta a calculadora para o estado inicial.
  limparTudo() {
    this.valorAtual = "0";
    this.valorAnterior = null;
    this.operador = null;
    this.deveLimparTela = false;
    this.expressao = "";

    this.atualizarTela();
  }

  // Adiciona um número ao valor que está aparecendo na tela.
  adicionarNumero(numero) {
    // Depois de escolher uma operação ou obter um resultado,
    // o próximo número deve substituir o que estava na tela.
    if (this.valorAtual === "Erro" || this.deveLimparTela) {
      this.valorAtual = numero;
      this.deveLimparTela = false;
    } else if (this.valorAtual === "0") {
      this.valorAtual = numero;
    } else if (this.contarDigitos() < 12) {
      // Limitar os dígitos evita que o número ultrapasse o display.
      this.valorAtual += numero;
    }

    this.atualizarTela();
  }

  contarDigitos() {
    return this.valorAtual.replace(/[-.,]/g, "").length;
  }

  // Insere o ponto decimal somente se o número ainda não tiver um.
  adicionarDecimal() {
    if (this.valorAtual === "Erro" || this.deveLimparTela) {
      this.valorAtual = "0.";
      this.deveLimparTela = false;
    } else if (!this.valorAtual.includes(".")) {
      this.valorAtual += ".";
    }

    this.atualizarTela();
  }

  // Guarda o primeiro valor e a operação escolhida.
  escolherOperador(novoOperador) {
    if (this.valorAtual === "Erro") return;

    // Se já existe uma conta em andamento, calcula antes de continuar.
    // Exemplo: ao digitar 2 + 3 +, primeiro encontramos o resultado 5.
    if (this.operador && !this.deveLimparTela) {
      this.calcular();
    }

    this.valorAnterior = Number(this.valorAtual);
    this.operador = novoOperador;
    this.expressao = `${this.formatarNumero(this.valorAnterior)} ${novoOperador}`;
    this.deveLimparTela = true;

    this.atualizarTela();
  }

  // Executa a operação usando o valor anterior e o valor atual.
  calcular() {
    const contaIncompleta = this.operador === null || this.valorAnterior === null;

    if (contaIncompleta || this.valorAtual === "Erro") return;

    const segundoValor = Number(this.valorAtual);
    const operadorUsado = this.operador;
    let resultado;

    switch (operadorUsado) {
      case "+":
        resultado = this.valorAnterior + segundoValor;
        break;
      case "−":
        resultado = this.valorAnterior - segundoValor;
        break;
      case "×":
        resultado = this.valorAnterior * segundoValor;
        break;
      case "÷":
        // Uma divisão por zero não possui resultado numérico válido.
        resultado = segundoValor === 0 ? NaN : this.valorAnterior / segundoValor;
        break;
      default:
        return;
    }

    this.expressao = `${this.formatarNumero(this.valorAnterior)} ${operadorUsado} ${this.formatarNumero(segundoValor)} =`;

    // toPrecision reduz pequenos erros comuns em cálculos com decimais.
    this.valorAtual = Number.isFinite(resultado) ? String(Number(resultado.toPrecision(12))) : "Erro";

    // A conta terminou, então não precisamos mais do valor nem do operador.
    this.valorAnterior = null;
    this.operador = null;
    this.deveLimparTela = true;

    this.atualizarTela();
  }

  // Transforma um número positivo em negativo e vice-versa.
  trocarSinal() {
    if (this.valorAtual !== "0" && this.valorAtual !== "Erro") {
      this.valorAtual = String(Number(this.valorAtual) * -1);
      this.atualizarTela();
    }
  }

  // Dividir por 100 é o mesmo que transformar um valor em porcentagem.
  calcularPorcentagem() {
    if (this.valorAtual !== "Erro") {
      this.valorAtual = String(Number(this.valorAtual) / 100);
      this.atualizarTela();
    }
  }

  // Remove apenas o último caractere digitado.
  apagarUltimoDigito() {
    if (this.deveLimparTela || this.valorAtual === "Erro") {
      this.limparTudo();
      return;
    }

    this.valorAtual = this.valorAtual.length > 1 ? this.valorAtual.slice(0, -1) : "0";

    // Evita que somente o sinal negativo permaneça no display.
    if (this.valorAtual === "-") this.valorAtual = "0";

    this.atualizarTela();
  }

  // Mostra vírgula e pontos no padrão usado no Brasil.
  // A conta continua usando o formato numérico normal do JavaScript.
  formatarNumero(valor) {
    if (valor === "Erro") return valor;

    const numero = Number(valor);
    if (!Number.isFinite(numero)) return "Erro";

    return new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 10,
    }).format(numero);
  }

  // Atualiza os dois elementos visuais do display.
  atualizarTela() {
    this.telaAnterior.textContent = this.expressao || "\u00a0";
    this.telaAtual.textContent = this.formatarNumero(this.valorAtual);
  }
}

// No Node.js, exportamos a classe para conseguir testar sua lógica.
// No navegador, este bloco é ignorado porque "module" não existe.
if (typeof module !== "undefined") {
  module.exports = Calculadora;
}

// Os eventos abaixo só devem ser criados quando o código estiver no navegador.
if (typeof document !== "undefined") {
  // Busca os elementos do display e cria a calculadora.
  const calculadora = new Calculadora(
    document.querySelector("#operacao-anterior"),
    document.querySelector("#operacao-atual"),
  );

  // Cada data-acao do HTML aponta para uma função da calculadora.
  const acoesDosBotoes = {
    numero: (valor) => calculadora.adicionarNumero(valor),
    decimal: () => calculadora.adicionarDecimal(),
    operador: (valor) => calculadora.escolherOperador(valor),
    igual: () => calculadora.calcular(),
    limpar: () => calculadora.limparTudo(),
    sinal: () => calculadora.trocarSinal(),
    porcentagem: () => calculadora.calcularPorcentagem(),
  };

  // Um único evento atende todos os botões dentro do teclado.
  // Essa técnica é chamada de delegação de eventos.
  document.querySelector(".teclado-calculadora").addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    if (!botao) return;

    const acao = botao.dataset.acao;
    const valor = botao.dataset.valor;

    acoesDosBotoes[acao]?.(valor);
  });

  // Os símbolos do teclado físico são diferentes dos símbolos da interface.
  const operadoresDoTeclado = {
    "/": "÷",
    "*": "×",
    "-": "−",
    "+": "+",
  };

  // Permite usar a calculadora sem clicar nos botões.
  document.addEventListener("keydown", (evento) => {
    let seletorDoBotao;

    if (/^\d$/.test(evento.key)) {
      calculadora.adicionarNumero(evento.key);
      seletorDoBotao = `[data-valor="${evento.key}"]`;
    } else if (evento.key === "." || evento.key === ",") {
      calculadora.adicionarDecimal();
      seletorDoBotao = '[data-acao="decimal"]';
    } else if (operadoresDoTeclado[evento.key]) {
      const operador = operadoresDoTeclado[evento.key];
      calculadora.escolherOperador(operador);
      seletorDoBotao = `[data-valor="${operador}"]`;
    } else if (evento.key === "Enter" || evento.key === "=") {
      evento.preventDefault();
      calculadora.calcular();
      seletorDoBotao = '[data-acao="igual"]';
    } else if (evento.key === "Escape" || evento.key === "Delete") {
      calculadora.limparTudo();
      seletorDoBotao = '[data-acao="limpar"]';
    } else if (evento.key === "Backspace") {
      calculadora.apagarUltimoDigito();
    } else if (evento.key === "%") {
      calculadora.calcularPorcentagem();
      seletorDoBotao = '[data-acao="porcentagem"]';
    }

    // Mostra rapidamente o botão correspondente à tecla pressionada.
    const botaoPressionado = seletorDoBotao ? document.querySelector(seletorDoBotao) : null;

    if (botaoPressionado) {
      botaoPressionado.classList.add("pressionado");

      window.setTimeout(() => {
        botaoPressionado.classList.remove("pressionado");
      }, 120);
    }
  });
}
