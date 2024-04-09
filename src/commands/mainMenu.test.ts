import { mainMenu } from './mainMenu'
import { IO } from '../io'
import { Car } from '../types/Car'
import { Simulation } from '../types/Simulation'
import * as AddCar from './addCar'

describe('mainMenu', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should return an array of cars when 2 are added', async () => {
    const mockRead = jest.fn()
    const io: IO = {
      read: mockRead,
      write: jest.fn(),
    }

    const simulation: Simulation = {
      fieldHeight: 3,
      fieldWidth: 3,
      initialCars: [],
    }

    const mockCar: Car = {
      commands: 'FRLFF',
      heading: 'N',
      name: 'A',
      x: 2,
      y: 1,
    }

    const options = ['1', '1', '2']
    options.forEach(mockRead.mockResolvedValueOnce)

    const mockCLIAddCar = jest
      .spyOn(AddCar, 'cliAddCar')
      .mockResolvedValueOnce(mockCar)
      .mockResolvedValueOnce({ ...mockCar, x: 1, y: 1 })

    const result: Car[] = await mainMenu(io, simulation)

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toEqual(2)
    expect(mockCLIAddCar).toHaveBeenCalledTimes(2)
    expect(result[0]).toEqual(mockCar)
  })
  it('should not add car if there is already a car with specified coordinates', async () => {
    const mockRead = jest.fn()
    const io: IO = {
      read: mockRead,
      write: jest.fn(),
    }

    const simulation: Simulation = {
      fieldHeight: 3,
      fieldWidth: 3,
      initialCars: [],
    }

    const mockCar: Car = {
      commands: 'FRLFF',
      heading: 'N',
      name: 'A',
      x: 2,
      y: 1,
    }

    const options = ['1', '1', '1', '2']
    options.forEach(mockRead.mockResolvedValueOnce)

    const mockCLIAddCar = jest
      .spyOn(AddCar, 'cliAddCar')
      .mockResolvedValue(mockCar)

    const result: Car[] = await mainMenu(io, simulation)

    expect(mockCLIAddCar).toHaveBeenCalledTimes(3)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(mockCar)
  })
})
