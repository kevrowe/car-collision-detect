import { Car } from '../types/Car'
import { Heading } from '../types/Heading'
import { Result } from '../types/Result'
import { Simulation } from '../types/Simulation'

const moveCar = (car: Car): [number, number] => {
  let nextX = car.x
  let nextY = car.y
  switch (car.heading) {
    case 'N':
      nextY += 1
      break
    case 'E':
      nextX += 1
      break
    case 'S':
      nextY -= 1
      break
    case 'W':
      nextX -= 1
      break
  }
  return [nextX, nextY]
}

const rotateLeft = (direction: Heading): Heading => {
  switch (direction) {
    case 'N':
      return 'W'
    case 'W':
      return 'S'
    case 'S':
      return 'E'
    case 'E':
      return 'N'
  }
}

const rotateRight = (direction: Heading): Heading => {
  switch (direction) {
    case 'N':
      return 'E'
    case 'E':
      return 'S'
    case 'S':
      return 'W'
    case 'W':
      return 'N'
  }
}

const execute = (cars: Car[], simulation: Simulation): Result => {
  const { fieldWidth, fieldHeight } = simulation
  const grid = Array.from({ length: fieldHeight }, () =>
    Array.from({ length: fieldWidth }, () => ' '),
  )

  const collisions: {
    name: string[]
    x: number
    y: number
    iteration: number
  }[] = []

  let iteration = 1
  let allCarsFinished = false

  while (!allCarsFinished) {
    allCarsFinished = true

    for (const car of cars) {
      if (car.commands.length === 0) {
        continue
      }

      const command = car.commands[0]

      if (command === 'F') {
        const { x, y } = car
        const [newX, newY] = moveCar(car)

        if (newX < 0 || newX >= fieldWidth || newY < 0 || newY >= fieldHeight) {
          car.commands = car.commands.substring(1)
          continue
        }

        car.x = newX
        car.y = newY

        if (grid[newY][newX] === ' ') {
          grid[y][x] = ' '
          grid[newY][newX] = car.name

          car.commands = car.commands.substring(1)
        } else {
          const stationaryCar = cars.find((c) => c.name === grid[newY][newX])
          if (stationaryCar) {
            car.commands = ''
            stationaryCar.commands = ''

            collisions.push({
              name: [stationaryCar.name, car.name],
              x: newX,
              y: newY,
              iteration,
            })
            collisions.push({
              name: [car.name, stationaryCar.name],
              x: newX,
              y: newY,
              iteration,
            })
          }
        }
      } else if (command === 'L') {
        car.heading = rotateLeft(car.heading)
        car.commands = car.commands.substring(1)
      } else if (command === 'R') {
        car.heading = rotateRight(car.heading)
        car.commands = car.commands.substring(1)
      }

      if (car.commands.length > 0) {
        allCarsFinished = false
      }
    }

    iteration++
  }

  return { positions: cars, collisions }
}

export { execute, moveCar, rotateLeft, rotateRight }
