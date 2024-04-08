import { Car } from './Car'

type Collision = {
  name: string[]
  x: number
  y: number
  iteration: number
}

type Result = {
  positions: Car[]
  collisions: Collision[]
}

export { Result, Collision }
