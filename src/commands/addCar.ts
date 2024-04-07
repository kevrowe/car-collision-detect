import { Car } from '../types/Car'
import { IO } from '../io'
import { isValidCommands, isValidHeading, isValidPosition } from '../validation'
import { Simulation } from '../types/Simulation'

const cliAddCar = async (
  io: IO,
  { fieldWidth, fieldHeight }: Simulation,
): Promise<Car> => {
  let name = '',
    x = '',
    y = '',
    heading = '',
    commands = ''

  while (name.trim() === '') {
    io.write('Please enter the car name:')
    name = await io.read('')
    io.write('')
  }

  while (
    !isValidHeading(heading) ||
    !isValidPosition(fieldWidth, fieldHeight, parseInt(x, 10), parseInt(y, 10))
  ) {
    io.write(
      `Please enter the initial position of car ${name} in x y Direction format:`,
    )

    const input = (await io.read('')).split(' ')
    x = input[0]
    y = input[1]
    heading = input[2]

    io.write('')
  }

  while (!isValidCommands(commands)) {
    io.write(`Please enter the commands for car ${name}:`)
    commands = await io.read('')
    io.write('')
  }

  return {
    name,
    heading,
    commands,
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  }
}

export { cliAddCar }
