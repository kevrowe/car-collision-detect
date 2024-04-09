import { IO } from '../io'
import { cliAddCar } from './addCar'

describe('cliAddCar', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should add a car to the simulation with invalid followed by valid inputs', async () => {
    const inputs = ['A', '1 1 N', 'ASDA', 'FRFF']

    const mockRead = jest.fn()
    inputs.forEach((e) => mockRead.mockResolvedValueOnce(e))

    const io: IO = {
      read: mockRead,
      write: jest.fn(),
    }

    const simulation = {
      fieldWidth: 10,
      fieldHeight: 10,
      initialCars: [],
    }

    const car = await cliAddCar(io, simulation)

    expect(car).toEqual({
      name: 'A',
      heading: 'N',
      commands: 'FRFF',
      x: 1,
      y: 1,
    })
  })
  it('should add a car to the simulation with valid inputs', async () => {
    const inputs = ['A', '1 1 N', 'FRFF']

    const mockRead = jest.fn()
    inputs.forEach((e) => mockRead.mockResolvedValueOnce(e))

    const io: IO = {
      read: mockRead,
      write: jest.fn(),
    }

    const simulation = {
      fieldWidth: 10,
      fieldHeight: 10,
      initialCars: [],
    }

    const car = await cliAddCar(io, simulation)

    expect(car).toEqual({
      name: 'A',
      heading: 'N',
      commands: 'FRFF',
      x: 1,
      y: 1,
    })
  })
})
