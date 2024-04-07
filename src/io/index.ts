import { Interface as ReadlineInterface } from 'node:readline/promises'

type IO = {
  write: (message: string, linesAfter?: number) => void
  read: (message?: string) => Promise<string>
}

const write = (
  rl: ReadlineInterface,
  message: string,
  linesAfter: number = 1,
) => {
  rl.write(message + '\n'.repeat(linesAfter))
}

const read = (rl: ReadlineInterface, message: string = '') => {
  return rl.question(message)
}

const io = (rl: ReadlineInterface): IO => ({
  write: write.bind(null, rl),
  read: read.bind(null, rl),
})

export { type IO }
export default io
