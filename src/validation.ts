import { Heading } from './types/Heading'

const isValidPosition = (
  gridLength: number,
  gridHeight: number,
  x: number,
  y: number,
): boolean => {
  return x >= 0 && x < gridLength && y >= 0 && y < gridHeight
}

const isValidHeading = (heading: string): heading is Heading => {
  return ['N', 'E', 'S', 'W'].includes(heading)
}

const isValidCommands = (commands: string): boolean => {
  if (!commands) return false

  return !commands
    .split('')
    .some((command) => !['F', 'L', 'R'].includes(command))
}

export { isValidPosition, isValidHeading, isValidCommands }
