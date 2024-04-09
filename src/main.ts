import { Interface as ReadlineInterface } from 'node:readline/promises'
import { execute } from './commands/execute'
import { mainMenu } from './commands/mainMenu'
import createIO from './io'
import { Simulation } from './types/Simulation'
import { complete } from './commands/complete'
import { Car } from './types/Car'

const main = async (rl: ReadlineInterface) => {
  const io = createIO(rl)
  const simulation: Simulation = {
    fieldWidth: 0,
    fieldHeight: 0,
    initialCars: [],
  }
  let restart = true

  while (restart) {
    io.write('Welcome to Auto Driving Car Simulation!', 2)

    let gridSize: string = ''

    while (gridSize.match(/^\d+ \d+$/) === null) {
      gridSize = await io.read(
        'Please enter the width and height of the simulation field in x y format: \n',
      )
    }

    const [x, y] = gridSize.split(' ').map((val) => parseInt(val, 10))
    simulation.fieldWidth = x
    simulation.fieldHeight = y

    const cars = await mainMenu(io, simulation)

    // Deep copy car array to preserve initial states
    simulation.initialCars = cars.reduce((collection, el) => {
      collection.push({ ...el })
      return collection
    }, [] as Car[])

    const result = execute(cars, simulation)
    restart = await complete(io, simulation, result)
  }
}

export { main }
