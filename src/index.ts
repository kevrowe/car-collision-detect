import {
  Interface as ReadlineInterface,
  createInterface,
} from 'node:readline/promises'
import createIO from './io'
import { mainMenu } from './commands/mainMenu'
import { Simulation } from './types/Simulation'

const program = async (rl: ReadlineInterface) => {
  const io = createIO(rl)
  const simulation: Simulation = {
    fieldWidth: 0,
    fieldHeight: 0,
  }

  io.write('Welcome to Auto Driving Car Simulation!', 2)

  const gridSize = await io.read(
    'Please enter the width and height of the simulation field in x y format: \n',
  )
  const [x, y] = gridSize.split(' ').map((val) => parseInt(val, 10))
  simulation.fieldWidth = x
  simulation.fieldHeight = y

  const grid = Array.from({ length: y }, () =>
    Array.from({ length: x }, () => ' '),
  )

  const cars = await mainMenu(io, simulation)

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
