# Driving Simulator

## Getting Started

### Prerequisites

- Node@20

### Running locally

1. `npm install`: Install dependencies
2. `npm start`: Run application

### Testing

- `npm run test`: Run unit tests
- `npm run test -- --watch`: Run tests on file changes

### Building

This project uses `esbuild`

- `npm run build`: Produce a bundled build to the `dist/` folder

## TODO

- Detect initial collision with cars starting in same location
- Add debug visualisation
- Validate field size input

## Assumptions

- Cars can start at the same location and immediately collide
- Cars are considered collided when they both occupy the same cell on the field
