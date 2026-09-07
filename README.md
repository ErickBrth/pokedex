# Pokédex — Orbital Frontend Challenge

Aplicação web que consome a [PokéAPI v2](https://pokeapi.co/) e exibe uma grade com oito Pokémon em destaque. Ao clicar em qualquer card, um modal se abre com informações detalhadas do Pokémon: artwork oficial, peso, altura, habilidades, e a cadeia evolutiva completa navegável.

O projeto foi desenvolvido como entrega do desafio técnico de frontend da Orbital.

---

## Tecnologias

- **React 18** com Vite
- **SCSS Modules** para estilos escopados por componente
- **MUI Icons** (`@mui/icons-material`) para ícones de interface (fechar, navegar)
- **Vitest** + **Testing Library** para testes unitários e de componente
- **ESLint 9** com as regras recomendadas de React e React Hooks

---

## Arquitetura

O projeto segue uma separacão em camadas bem definidas:

```
UI (componentes React)
    ↓
hooks/             ←  toda a lógica de estado e efeitos colaterais fica aqui
    ↓
services/          ←  comunicação com a API e gerenciamento de cache
    ↓
models/            ←  transformação e validação dos dados brutos da API
```

**Componentes** são puramente apresentacionais: recebem dados e callbacks por props, não fazem fetch e não guardam estado de domínio. A única exceção intencional é o controle de foco no modal, que é estado de interface, não de negócio.

**`usePokemons`** é o hook central. Ele orcãestra o carregamento inicial dos oito Pokémon, gerencia qual está selecionado, qual está aberto no modal, e expõe os handlers de navegação para o `App`. Nenhum componente acessa a API diretamente.

**`Pokemon.js`** é uma classe de domínio imutável (via `Object.freeze`). Ela recebe os dados brutos da API e disponibiliza getters já formatados (`formattedId`, `formattedHeight`, `formattedWeight`, `displayName`), eliminando lógica de formatação espalhada nos componentes. A instanciação é feita pelo método estático `Pokemon.fromApiResponse(details, species, evolutions)`.

**`cacheService`** opera em dois níveis: um `Map` em memória para requisicões dentro da mesma sessão, e `localStorage` para persistir entre visitas. Cada entrada carrega um `expiry` de 7 dias. O `pokeApi.js` consulta o cache antes de qualquer `fetch`.

**Estilos** usam SCSS Modules por componente. Variáveis globais de design (cores, sombras, bordas, transições) ficam centralizadas em `src/styles/_variables.scss` e são importadas onde necessário via `@use`.

---

## Requisitos

- Node.js 18 ou superior
- npm 9 ou superior

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/ErickBrth/pokedex.git
cd pokedex
npm install
```

---

## Rodando o projeto

### Modo desenvolvimento

```bash
npm run dev
```

O servidor sobe em `http://localhost:5173` por padrão. Qualquer alteração nos arquivos recarrega o browser automaticamente.

### Build de produção

```bash
npm run build
```

Os arquivos compilados ficam na pasta `dist/`. Para visualizar o build localmente antes de publicar:

```bash
npm run preview
```

---

## Testes

Rodar todos os testes uma vez:

```bash
npm test
```

Modo watch (re-executa ao salvar arquivos):

```bash
npm run test:watch
```

Gerar relatório de cobertura:

```bash
npm run test:coverage
```

O relatório de cobertura é gerado na pasta `coverage/` e pode ser aberto pelo arquivo `coverage/index.html` em qualquer browser.

### Bibliotecas de teste

| Biblioteca | Papel |
|---|---|
| [Vitest](https://vitest.dev/) | Runner e assertions (`describe`, `it`, `expect`, `vi`) |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | Renderiza componentes e consulta o DOM por papel acessível |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) | Simula interações reais de usuário (click, keyboard, tab) |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | Matchers adicionais (`toBeInTheDocument`, `toHaveAttribute`, etc.) |
| [jsdom](https://github.com/jsdom/jsdom) | Implementação do DOM no Node.js para os testes rodarem fora do browser |

### O que está coberto

- **Modelos**: todos os getters e o método `fromApiResponse` da classe `Pokemon`
- **Serviços**: `cacheService` (hit/miss em memória e localStorage, TTL) e `pokeApi` (com mocks de `fetch`)
- **Utiliários**: todas as funções de `formatters.js`
- **Componentes**: renderização, interações de teclado, aria-labels, callbacks e estados condicionais de todos os componentes de Pokémon

### Factories de teste

Os testes não criam objetos `Pokemon` manualmente. Em vez disso, usam factories centralizadas em `src/test/factories/pokemonFactory.js`:

```js
import { createPokemon, createEvolutionList, createRawPokeApiDetails } from '../factories/pokemonFactory'

// Instancia um Pokemon com dados reais da PokeAPI (Charmander por padrão)
const pokemon = createPokemon()

// Sobrescreve campos específicos
const semGenus = createPokemon({ genus: '' })

// Cria lista de evoluções da linha Charmander com URLs reais de sprite
const evolutions = createEvolutionList()
```

Todos os sprites usados nas factories apontam para URLs reais do repositório de sprites da PokeAPI no GitHub, não para URLs fictícias.

---

## Linting

```bash
npm run lint
```

---

## Estrutura do projeto

```
src/
├── components/
│   ├── common/               # Componentes genéricos reutilizáveis
│   │   ├── Button/           # Botão base com suporte a variantes
│   │   ├── IconButton/       # Botão de ícone com aria-label obrigatório
│   │   └── Icons/            # Re-exporta ícones do MUI com tamanho configurável
│   ├── layout/
│   │   └── Header/           # Cabeçalho com logo e título do desafio
│   └── pokemon/
│       ├── EvolutionList/    # Lista horizontal da cadeia evolutiva
│       ├── PokemonCard/      # Card clicável da grade principal
│       ├── PokemonDetailModal/ # Modal com informações completas do Pokémon
│       ├── PokemonMetaItem/  # Item de metadado (altura, peso, habilidades)
│       ├── PokemonSpriteImage/ # Imagem de sprite com lazy load e estilo pixelado
│       └── SkeletonCard/     # Placeholder animado durante o carregamento
├── hooks/
│   └── usePokemons.js        # Hook central com toda a lógica de estado e navegação
├── models/
│   └── Pokemon.js            # Classe de domínio com getters formatados (id, altura, peso)
├── services/
│   ├── cacheService.js       # Cache em memória + localStorage com TTL de 7 dias
│   └── pokeApi.js            # Funções de acesso à PokéAPI com cache integrado
├── styles/
│   ├── _variables.scss       # Tokens de design (cores, espaçamentos, tipografia)
│   ├── _mixins.scss          # Mixins de SCSS reutilizáveis
│   └── index.scss            # Reset e estilos globais
├── test/
│   ├── components/           # Testes de componentes React
│   ├── factories/            # Factories de dados para os testes
│   │   └── pokemonFactory.js # Cria instâncias de Pokemon com URLs reais da PokeAPI
│   ├── models/               # Testes da classe Pokemon
│   └── utils/                # Testes dos utilitários de formatação
└── utils/
    └── formatters.js         # Funções puras: formatPokemonId, formatHeight, formatWeight, capitalize
```

---

## Navegação na aplicação

A aplicação é uma SPA de página única sem roteamento por URL. Toda a navegação acontece por estado de interface.

**Grade principal**

Ao abrir a aplicação, oito Pokémon são carregados em paralelo. O Charmander começa selecionado por padrão (borda colorida no card). Clicar em qualquer card abre o modal de detalhes.

**Modal de detalhes**

- `Esc` fecha o modal e volta para a grade
- `Seta esquerda` navega para o Pokémon anterior na grade
- `Seta direita` navega para o próximo Pokémon na grade
- Clicar no fundo escuro (backdrop) também fecha o modal
- O foco do teclado fica preso dentro do modal enquanto ele está aberto (focus trap)

**Cadeia evolutiva**

Dentro do modal, a lista de evoluções mostra toda a cadeia do Pokémon. Clicar em uma evolução que não seja a atual busca os dados dela na API e substitui o conteúdo do modal sem fechar.

---

## Cache e fair use da PokéAPI

A PokéAPI pede que as aplicações evitem requisições repetidas desnecessárias. Este projeto implementa dois níveis de cache:

1. **Memória**: os dados ficam disponíveis enquanto a aba está aberta, sem nenhuma requisição adicional
2. **localStorage**: os dados persistem por 7 dias entre sessões. Na próxima visita, a aplicação carrega sem fazer nenhuma chamada à API

---

## Pokémon exibidos

A lista de destaque está definida em `src/hooks/usePokemons.js` na constante `FEATURED_CATEGORIES`:

```
bulbasaur, charmander, squirtle, caterpie, pidgey, rattata, ekans, pikachu
```

Para alterar os Pokémon exibidos, basta editar essa lista com os nomes em inglês e minúsculas, exatamente como aparecem na PokéAPI.
