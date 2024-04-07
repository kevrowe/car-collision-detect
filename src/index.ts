import {
  Interface as ReadlineInterface,
  createInterface,
} from 'node:readline/promises'
import { Car } from './types/Car'
import { isValidCommands, isValidHeading, isValidPosition } from './validation'

const wl = (rl: ReadlineInterface, message: string, linesAfter: number = 1) => {
  rl.write(message + '\n'.repeat(linesAfter))
}

const cliAddCar = async (rl: ReadlineInterface): Promise<Car> => {
  const writeLine = wl.bind(null, rl)
  let name = '',
    x = '',
    y = '',
    heading = '',
    commands = ''

  while (name.trim() === '') {
    writeLine('Please enter the car name:')
    name = await rl.question('')
    writeLine('')
  }

  while (
    !isValidHeading(heading) ||
    !isValidPosition(5, 5, parseInt(x, 10), parseInt(y, 10))
  ) {
    writeLine(
      `Please enter the initial position of car ${name} in x y Direction format:`,
    )

    const input = (await rl.question('')).split(' ')
    x = input[0]
    y = input[1]
    heading = input[2]

    writeLine('')
  }

  while (!isValidCommands(commands)) {
    writeLine(`Please enter the commands for car ${name}:`)
    commands = await rl.question('')
    writeLine('')
  }

  return {
    name,
    heading,
    commands,
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  }
}

const mainMenu = async (rl: ReadlineInterface): Promise<Car[]> => {
  const cars: Car[] = []
  const writeLine = wl.bind(null, rl)

  writeLine('Please choose from the following options:')
  writeLine('[1] Add a car to field')
  writeLine('[2] Run simulation')
  let option = await rl.question('')

  while (option === '1') {
    cars.push(await cliAddCar(rl))

    writeLine(`Your current list of cars are:`)
    cars.forEach((car) => {
      writeLine(
        `- ${car.name}, (${car.x}, ${car.y}) ${car.heading}, ${car.commands}`,
      )
    })

    writeLine('')
    writeLine('Please choose from the following options:')
    writeLine('[1] Add a car to field')
    writeLine('[2] Run simulation')
    option = await rl.question('')
  }

  return cars
}

const program = async (rl: ReadlineInterface) => {
  const writeLine = wl.bind(null, rl)

  writeLine('Welcome to Auto Driving Car Simulation!', 2)

  const gridSize = await rl.question(
    'Please enter the width and height of the simulation field in x y format: \n',
  )
  const [x, y] = gridSize.split(' ').map((val) => parseInt(val, 10))

  const grid = Array.from({ length: y }, () =>
    Array.from({ length: x }, () => ' '),
  )

  const cars = await mainMenu(rl)

  console.log({ grid, cars })
}

const rlInterface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

try {
  await program(rlInterface)
} catch (error) {
  console.error(error)
} finally {
  rlInterface.close()
}
