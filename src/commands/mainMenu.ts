import { type IO } from '../io'
import { Car } from '../types/Car'
import { Simulation } from '../types/Simulation'
import { cliAddCar } from './addCar'

const mainMenu = async (io: IO, simulation: Simulation): Promise<Car[]> => {
  const cars: Car[] = []

  io.write('Please choose from the following options:')
  io.write('[1] Add a car to field')
  io.write('[2] Run simulation')
  let option = await io.read('')

  const usedCoords = new Set<string>()

  while (option === '1') {
    const newCar = await cliAddCar(io, simulation)

    if (usedCoords.has(`${newCar.x},${newCar.y}`)) {
      io.write(
        'Car already exists at this position. Please try a different car configuration.',
        2,
      )
    } else {
      cars.push(newCar)
      usedCoords.add(`${newCar.x},${newCar.y}`)
    }

    io.write(`Your current list of cars are:`)
    cars.forEach((car) => {
      io.write(
        `- ${car.name}, (${car.x}, ${car.y}) ${car.heading}, ${car.commands}`,
      )
    })

    io.write('')
    io.write('Please choose from the following options:')
    io.write('[1] Add a car to field')
    io.write('[2] Run simulation')
    option = await io.read('')
  }

  return cars
}

export { mainMenu }
