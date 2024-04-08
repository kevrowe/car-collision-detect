import { IO } from '../io'
import { Result } from '../types/Result'
import { Simulation } from '../types/Simulation'

const complete = async (
  io: IO,
  { initialCars }: Simulation,
  { collisions, positions }: Result,
): Promise<boolean> => {
  io.write(`Your current list of cars are:`)
  initialCars.forEach((car) => {
    io.write(
      `- ${car.name}, (${car.x}, ${car.y}) ${car.heading}, ${car.commands}`,
    )
  })
  io.write('')

  const collidedCars = collisions.flatMap((e) => e.name)

  io.write('After simulation, the result is:')
  positions
    .filter((e) => !collidedCars.includes(e.name))
    .forEach((c) => io.write(`- ${c.name}, (${c.x}, ${c.y}) ${c.heading}`))
  collisions.forEach((c) =>
    io.write(
      `- ${c.name[0]}, collides with ${c.name[1]} at (${c.x},${c.y}) at step ${c.iteration}`,
    ),
  )
  io.write('')

  io.write('Please choose from the following options:')
  io.write('[1] Start over')
  io.write('[2] Exit')

  return (await io.read()) === '1'
}

export { complete }
