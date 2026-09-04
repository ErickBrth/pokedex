# Pokédex - Orbital Frontend Challenge

A responsive web application built with **React** and **SCSS** consuming the official **PokéAPI v2**, designed precisely according to the Orbital Frontend Challenge specification.

## Tech Stack

- **React 18**
- **Vite**
- **SCSS Modules**
- **Montserrat** (Google Fonts)
- **ESLint 9**

## Features

- **Prototype-accurate Layout**: Minimalist dark theme (`#1c1c1c`) with 4x2 responsive grid matching the challenge prototype.
- **Dynamic API Color Theming**: Card selection outlines and detail modal backgrounds dynamically adapt to each Pokémon's official `color.name` returned by `/api/v2/pokemon-species/{id}`.
- **Detailed Pokémon Modal**: Displays formatted ID (`#007`), name, genus (`Tiny Turtle Pokémon`), measures (`HEIGHT`, `WEIGHT`), abilities, and high-definition official artwork.
- **Multi-tiered Caching**: Complies with PokéAPI Fair Use policy via in-memory cache and persistent `localStorage` with TTL.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Linting

```bash
npm run lint
```
