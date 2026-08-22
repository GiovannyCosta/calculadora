<a href="https://basicscalcs.netlify.app/" target="_blank">
  <img src="assets/images/banner-calculadora.png" alt="Banner da Calculadora moderna" width="100%" />
</a>

# Calculadora moderna

<p align="center">
  <a href="https://basicscalcs.netlify.app/"><strong>Acessar a calculadora online</strong></a>
</p>

Uma calculadora web responsiva, rápida e acessível, desenvolvida com HTML, CSS e JavaScript puro. O projeto foi reformulado a partir de uma versão antiga para oferecer uma interface atual e uma base de código simples de manter.

O JavaScript utiliza nomes em português e comentários didáticos. Além de ser uma aplicação funcional, o projeto serve como material de estudo sobre lógica, classes, estado, operações matemáticas, manipulação do DOM e eventos.

## Funcionalidades

- Soma, subtração, multiplicação e divisão
- Porcentagem e troca de sinal
- Números decimais e operações encadeadas
- Uso completo pelo teclado
- Histórico da operação atual
- Tratamento de divisão por zero
- Layout responsivo para desktop, tablet e celular
- Foco acessível e preferência por movimento reduzido

## Como executar

Não é necessário instalar dependências. Baixe o projeto e abra `index.html` no navegador ou clone o repositório:

```bash
git clone https://github.com/GiovannyCosta/calculadora.git
cd Calculadora
```

## Atalhos de teclado

| Tecla              | Ação                 |
| ------------------ | -------------------- |
| `0`–`9`            | Inserir números      |
| `+`, `-`, `*`, `/` | Selecionar operação  |
| `.` ou `,`         | Inserir decimal      |
| `Enter` ou `=`     | Calcular resultado   |
| `Backspace`        | Apagar último dígito |
| `Esc` ou `Delete`  | Limpar tudo          |
| `%`                | Calcular porcentagem |

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, variáveis e media queries)
- JavaScript ES6+

## Estrutura

```text
Calculadora/
├── .gitignore
├── assets/
│   ├── css/style.css
│   ├── icons/favicon.ico
│   ├── images/banner-calculadora.png
│   └── js/calculadora.js
├── docs/
│   └── DOCUMENTACAO.md
├── tests/
│   └── calculadora.test.js
├── index.html
├── package.json
└── README.md
```

## Testes

Com o Node.js instalado, execute `npm test`. Nenhuma dependência precisa ser instalada. Consulte a documentação técnica para entender cada cenário.

## Documentação

Detalhes de arquitetura, responsividade e manutenção estão em [`docs/DOCUMENTACAO.md`](docs/DOCUMENTACAO.md).

## Licença

Projeto disponível para fins de estudo e portfólio.

<p align="center">
    Desenvolvido com matemática e dedicação por <strong>Giovanny Costa | Arghata</strong>.
</p>
