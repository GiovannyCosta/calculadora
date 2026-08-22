# Documentação técnica

## Visão geral

A aplicação é uma calculadora de página única, sem bibliotecas ou etapa de compilação. Interface, regras de cálculo e estilos ficam separados para facilitar manutenção e publicação estática.

## Arquitetura

- `index.html`: estrutura semântica, conteúdo e atributos de acessibilidade.
- `assets/css/style.css`: identidade visual, estados interativos e responsividade.
- `assets/js/calculadora.js`: estado, operações, formatação e eventos.
- `assets/icons/favicon.ico`: ícone exibido na aba do navegador.
- `tests/calculadora.test.js`: testes automatizados da lógica.

## Estado da calculadora

A classe `Calculadora` mantém as seguintes informações. Os nomes estão em português para facilitar o estudo da lógica:

| Propriedade      | Responsabilidade                                |
| ---------------- | ----------------------------------------------- |
| `valorAtual`     | Valor exibido e em edição                       |
| `valorAnterior`  | Primeiro número armazenado                      |
| `operador`       | Operação matemática selecionada                 |
| `deveLimparTela` | Define se a próxima entrada inicia outro número |

Os valores são armazenados no formato numérico do JavaScript e exibidos com `Intl.NumberFormat` no padrão brasileiro.

## Fluxo de uma operação

1. O usuário digita o primeiro valor.
2. Ao escolher um operador, o valor é armazenado.
3. A próxima entrada inicia o segundo valor.
4. `=` executa a operação, atualiza o histórico e exibe o resultado.
5. O resultado pode iniciar uma nova operação encadeada.

## Responsividade

No desktop, a página usa duas colunas: apresentação e calculadora. Abaixo de `760px`, o conteúdo passa para uma coluna, os atalhos visuais são ocultados e o componente ocupa a largura disponível. Abaixo de `390px`, espaçamentos e botões são reduzidos para telas compactas.

## Acessibilidade

- Resultado anunciado por leitores de tela com `aria-live`.
- Rótulos descritivos nos botões com símbolos.
- Navegação por teclado e foco visível.
- Contraste alto e suporte a `prefers-reduced-motion`.
- Áreas de toque amplas para dispositivos móveis.

## Manutenção e evolução

Novas ações devem ser incluídas no HTML com `data-acao` e conectadas ao objeto `acoesDosBotoes`. Para alterar o tema, edite as variáveis no bloco `:root` do CSS. Não há dependências para atualizar.

### Como testar

Os testes ficam em `tests/calculadora.test.js` e usam o executor nativo do Node.js. Eles verificam o estado e os resultados da classe `Calculadora` sem precisar abrir o navegador ou instalar bibliotecas.

Com o Node.js instalado, execute na raiz do projeto:

```bash
npm test
```

Os cenários automatizados validam:

- estado inicial da calculadora;
- soma, subtração, multiplicação e divisão;
- tentativa de divisão por zero;
- bloqueio de separadores decimais repetidos;
- troca de sinal e porcentagem;
- remoção do último dígito;
- operações encadeadas.

Para criar outro teste, use `test("descrição", () => { ... })`, prepare os valores, execute o método que deseja estudar e compare o resultado com `assert.equal(valorRecebido, valorEsperado)`.

Os testes automatizados cuidam da lógica. A interface ainda deve ser aberta no navegador para conferir cliques, atalhos, foco e responsividade.

## Verificação recomendada

- Testar as quatro operações com inteiros, decimais e números negativos.
- Confirmar o tratamento da divisão por zero.
- Validar cliques e atalhos do teclado.
- Conferir larguras de 320px, 768px e 1440px.
- Publicar em servidor estático para confirmar os caminhos relativos.
