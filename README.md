# Multiplayer Conway's Game of Life

This project is a multiplayer version of Conway's Game of Life implemented using Deno/Fresh and Preact. Players can connect to the game via WebSockets and interact with the grid in real-time.

## Features

- Real-time multiplayer interaction
- Color picker for cell customization
- Automatic game iteration
- Responsive grid layout

## Prerequisites

- [Deno](https://deno.land/manual/getting_started/installation)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/gaarf/mp-gol.git
cd mp-gol
```

## Usage

1. Start the Deno Fresh project:

```sh
deno task dev
```

This will install dependencies, watch the project directory and restart as necessary.

2. Open [local server](http://localhost:8000)


## Relevant files / project Structure

```filetree
mp-gol
├── app
│   └── game-of-life
│       ├── instance.ts
│       └── logic.ts
├── islands
│   └── Game
│       ├── ColorPicker.tsx
│       ├── Controls.tsx
│       └── index.tsx
├── routes
│   └── index.tsx
└── README.md
```

## Components

### `ColorPicker.tsx`

A React component that allows users to choose a hex color.

### `Controls.tsx`

A React component that provides a set of buttons for adding pre-defined grid patterns.

### `logic.ts`

Contains the game logic for Conway's Game of Life, including grid creation, cell updates, and game iteration.

### `islands/Game/index.tsx`

The main game component that renders the grid and handles user interactions.

## License

This project is not licensed.

## Known issues

- TODO: support for drawing shapes via touch events

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Acknowledgements

- [Deno](https://deno.land/)
- [React](https://reactjs.org/)
- [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)