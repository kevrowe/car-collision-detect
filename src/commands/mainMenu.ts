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

  while (option === '1') {
    cars.push(await cliAddCar(io, simulation))

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
