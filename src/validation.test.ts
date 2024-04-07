import { isValidCommands, isValidHeading, isValidPosition } from './validation'

describe('isValidCommands', () => {
  it('should return true for valid commands', () => {
    expect(isValidCommands('F')).toBe(true)
    expect(isValidCommands('L')).toBe(true)
    expect(isValidCommands('FL')).toBe(true)
    expect(isValidCommands('FFL')).toBe(true)
  })

  it('should return false for invalid commands', () => {
    expect(isValidCommands('')).toBe(false)
    expect(isValidCommands('A')).toBe(false)
    expect(isValidCommands('FLRA')).toBe(false)
    expect(isValidCommands('FFLRRXF')).toBe(false)
  })
})

describe('isValidHeading', () => {
  it('should return true for valid headings', () => {
    expect(isValidHeading('N')).toBe(true)
    expect(isValidHeading('E')).toBe(true)
    expect(isValidHeading('S')).toBe(true)
    expect(isValidHeading('W')).toBe(true)
  })

  it('should return false for invalid headings', () => {
    expect(isValidHeading('')).toBe(false)
    expect(isValidHeading('A')).toBe(false)
    expect(isValidHeading('NE')).toBe(false)
    expect(isValidHeading('NSWE')).toBe(false)
  })
})

describe('isValidPosition', () => {
  it('should return true for valid positions', () => {
    expect(isValidPosition(5, 5, 0, 0)).toBe(true)
    expect(isValidPosition(5, 5, 4, 4)).toBe(true)
    expect(isValidPosition(5, 5, 2, 3)).toBe(true)
    expect(isValidPosition(5, 5, 0, 4)).toBe(true)
  })

  it('should return false for invalid positions', () => {
    expect(isValidPosition(5, 5, -1, 0)).toBe(false)
    expect(isValidPosition(5, 5, 0, -1)).toBe(false)
    expect(isValidPosition(5, 5, 5, 0)).toBe(false)
    expect(isValidPosition(5, 5, 0, 5)).toBe(false)
  })
})
