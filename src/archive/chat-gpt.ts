type Direction = "N" | "E" | "S" | "W"
type Command = "L" | "R" | "F"

interface Car {name: string;
x: number;
  y: number
  heading: Direction
  commands: Command[]
}

interface Collision {
  car1: string
  car2: string
  position: [number, number]
  iteration: number
}

class Field {
  width: number
  height: number
  grid: (string | null)[][]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.grid = Array.from({ length: height }, () => Array(width).fill(null))
  }

  placeCar(car: Car): boolean {
    if (this.grid[car.y][car.x] === null) {
      this.grid[car.y][car.x] = car.name
      return true
    }
    return false
  }

  moveCar(
    oldX: number,
    oldY: number,
    newX: number,
    newY: number,
    name: string,
  ): boolean {
    if (this.grid[oldY][oldX] === name) {
      this.grid[oldY][oldX] = null
      this.grid[newY][newX] = name
      return true
    }
    return false
  }

  isInsideGrid(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height
  }
}

class Simulation {
  field: Field
  cars: Map<string, Car>
  collisions: Collision[]

  constructor(width: number, height: number, cars: Car[]) {
    this.field = new Field(width, height)
    this.cars = new Map()
    this.collisions = []

    cars.forEach((car) => {
      this.cars.set(car.name, car)
      this.field.placeCar(car)
    })
  }

  turnLeft(heading: Direction): Direction {
    const headings: Direction[] = ["N", "W", "S", "E"]
    const currentIndex = headings.indexOf(heading)
    return headings[(currentIndex + 1) % 4]
  }

  turnRight(heading: Direction): Direction {
    const headings: Direction[] = ["N", "E", "S", "W"]
    const currentIndex = headings.indexOf(heading)
    return headings[(currentIndex + 1) % 4]
  }

  move(car: Car): void {
    const { x, y, heading } = car
    let newX = x
    let newY = y

    switch (heading) {
      case "N":
        newY = y + 1
        break
      case "E":
        newX = x + 1
        break
      case "S":
        newY = y - 1
        break
      case "W":
        newX = x - 1
        break
    }

    if (this.field.isInsideGrid(newX, newY)) {
      if (this.field.moveCar(x, y, newX, newY, car.name)) {
        car.x = newX
        car.y = newY
      }
    }
  }

  executeCommand(command: Command, car: Car): void {
    switch (command) {
      case "L":
        car.heading = this.turnLeft(car.heading)
        break
      case "R":
        car.heading = this.turnRight(car.heading)
        break
      case "F":
        this.move(car)
        break
    }
  }

  run(): void {
    let iteration = 1
    let allCarsFinished = false

    while (!allCarsFinished) {
      const collisionPositions: Map<string, string[]> = new Map()
      let allCarsDone = true

      this.cars.forEach((car) => {
        if (car.commands.length > 0) {
          allCarsDone = false // At least one car has remaining commands
          const command = car.commands.shift()!
          this.executeCommand(command, car)
        }

        const position = `${car.x},${car.y}`
        if (collisionPositions.has(position)) {
          const collidingCarName = collisionPositions.get(position)![0]
          this.collisions.push({
            car1: collidingCarName,
            car2: car.name,
            position: [car.x, car.y],
            iteration,
          })
        } else {
          collisionPositions.set(position, [car.name])
        }
      })

      iteration++

      // Check if all cars have finished or collided
      allCarsFinished = allCarsDone
    }
  }
}

;(() => {
  // Example usage
  const cars: Car[] = [
    { name: "Car1", x: 0, y: 0, heading: "N", commands: ["L", "R", "F", "F"] },
    {
      name: "Car2",
      x: 1,
      y: 1,
      heading: "W",
      commands: ["R", "L", "F", "R", "F"],
    },
  ]

  const simulation = new Simulation(2, 2, cars)
  simulation.run()

  console.log("Final Positions:")
  simulation.cars.forEach((car, name) => {
    console.log(`${name}: (${car.x}, ${car.y}), Heading: ${car.heading}`)
  })

  console.log("\nCollisions:")
  simulation.collisions.forEach((collision) => {
    console.log(
      `Cars ${collision.car1} and ${collision.car2} collided at (${collision.position[0]}, ${collision.position[1]}) on iteration ${collision.iteration}`,
    )
  })
})()
