import readline from 'readline'

const getInput = (rl: readline.Interface, prompt: string): Promise<string> => {
  const p = new Promise<string>((resolve) => {
    rl.question(prompt, resolve)
  })

  return p
}

const program = async (rlInterface: readline.Interface) => {
  const readLine = getInput.bind(null, rlInterface)

  const gridSize = await readLine('What is the size of the grid? (e.g. 5x5): ')
  const [x, y] = gridSize.split('x').map((val) => parseInt(val, 10))

  const grid = Array.from({ length: y }, () =>
    Array.from({ length: x }, () => ' '),
  )

  console.log('wat', grid.length, grid[0].length)
}

const rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

try {
  await program(rlInterface)
} catch (error) {
  console.error(error)
} finally {
  rlInterface.close()
}
