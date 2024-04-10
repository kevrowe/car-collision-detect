import { Car } from '../types/Car'
import { Simulation } from '../types/Simulation'
import { execute, moveCar, rotateLeft, rotateRight } from './execute'

describe('moveCar', () => {
  it('should move car north', () => {
    const car = { x: 0, y: 0, heading: 'N' } as Car
    const result = moveCar(car)
    expect(result).toEqual([0, 1])
  })

  it('should move car east', () => {
    const car = { x: 0, y: 0, heading: 'E' } as Car
    const result = moveCar(car)
    expect(result).toEqual([1, 0])
  })

  it('should move car south', () => {
    const car = { x: 0, y: 0, heading: 'S' } as Car
    const result = moveCar(car)
    expect(result).toEqual([0, -1])
  })

  it('should move car west', () => {
    const car = { x: 0, y: 0, heading: 'W' } as Car
    const result = moveCar(car)
    expect(result).toEqual([-1, 0])
  })
})

describe('rotateLeft', () => {
  it('should rotate north to west', () => {
    const result = rotateLeft('N')
    expect(result).toEqual('W')
  })

  it('should rotate west to south', () => {
    const result = rotateLeft('W')
    expect(result).toEqual('S')
  })

  it('should rotate south to east', () => {
    const result = rotateLeft('S')
    expect(result).toEqual('E')
  })

  it('should rotate east to north', () => {
    const result = rotateLeft('E')
    expect(result).toEqual('N')
  })
})

describe('rotateRight', () => {
  it('should rotate north to east', () => {
    const result = rotateRight('N')
    expect(result).toEqual('E')
  })

  it('should rotate east to south', () => {
    const result = rotateRight('E')
    expect(result).toEqual('S')
  })

  it('should rotate south to west', () => {
    const result = rotateRight('S')
    expect(result).toEqual('W')
  })

  it('should rotate west to north', () => {
    const result = rotateRight('W')
    expect(result).toEqual('N')
  })
})

describe('execute', () => {
  it('should execute the simulation with 1 car', () => {
    const cars = [
      { name: 'A', x: 0, y: 0, heading: 'N', commands: 'FFRFFFFRRL' } as Car,
    ]

    const simulation = { fieldWidth: 10, fieldHeight: 10 } as Simulation
    const result = execute(cars, simulation)
    expect(result).toEqual({
      positions: [
        expect.objectContaining({ name: 'A', x: 4, y: 2, heading: 'S' }),
      ],
      collisions: [],
    })
  })
  it('should execute the simulation with 2 cars and detect collision', () => {
    const simulation = { fieldWidth: 10, fieldHeight: 10 } as Simulation
    const cars = [
      { name: 'A', x: 0, y: 0, heading: 'N', commands: 'FFRFFFFRRL' } as Car,
      { name: 'B', x: 3, y: 2, heading: 'E', commands: 'F' } as Car,
    ]

    const result = execute(cars, simulation)
    expect(result).toEqual({
      positions: [
        expect.objectContaining({ name: 'A', x: 4, y: 2, heading: 'E' }),
        expect.objectContaining({ name: 'B', x: 4, y: 2, heading: 'E' }),
      ],
      collisions: [
        expect.objectContaining({
          name: ['B', 'A'],
          x: 4,
          y: 2,
          iteration: 7,
        }),
        expect.objectContaining({
          name: ['A', 'B'],
          x: 4,
          y: 2,
          iteration: 7,
        }),
      ],
    })
  })
})
