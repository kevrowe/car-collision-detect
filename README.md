# Driving Simulator

## Getting Started

### Prerequisites

- `node@20` - NodeJS at version 20.x.x

#### Optional

- `nvm` - Node Version Manager, can be installed with homebrew
- `nvm use` - Command to ensure you are using a compatible version of NodeJS

### Running locally

1. `npm install` - Install dependencies
2. `npm start` - Run application

### Testing

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests and listen for file changes

### Building

This project uses `esbuild`

- `npm run build`: Produce a bundled build to the `dist/` folder

## TODO

- Add debug option which outputs a grid visualisation

## Assumptions

- Cars are considered collided when they both occupy the same cell on the field
- Cars cannot start in the same locations
