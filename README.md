# Driving Simulator

## Getting Started

### Prerequisites

- Node@20

### Running locally

1. `npm install`: Install dependencies
2. `npm start`: Run application

### Testing

- `npm run test`: Run unit tests
- `npm run test:watch`: Run tests and listen for file changes

### Building

This project uses `esbuild`

- `npm run build`: Produce a bundled build to the `dist/` folder

## TODO

- Add debug option which outputs a grid visualisation

## Assumptions

- Cars are considered collided when they both occupy the same cell on the field
- Cars cannot start in the same locations
