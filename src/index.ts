import { createInterface } from 'node:readline/promises'
import { main } from './main'
;(async () => {
  const rlInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  })

  try {
    await main(rlInterface)
  } catch (error) {
    console.error(error)
  } finally {
    rlInterface.close()
  }
})()
