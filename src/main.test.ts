import { main } from './main'
import readline from 'node:readline/promises'

describe('main', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should run the main function with 1 car', async () => {
    const rlInterface = {
      question: jest.fn(),
      write: jest.fn(),
    }

    const commands = ['1 1', '1', 'name', '0 0 N', 'FFF', '2', '2']
    rlInterface.question.mockImplementation(() => {
      return commands.shift()
    })

    await main(rlInterface as unknown as readline.Interface)
    expect(rlInterface.question).toHaveBeenCalled()
    expect(rlInterface.write).toHaveBeenCalled()
  })
  it('should run the main function', async () => {
    const rlInterface = {
      question: jest.fn(),
      write: jest.fn(),
    }

    const commands = ['1 1', '1', 'name', '0 0 N', 'FFF', '2', '2']
    rlInterface.question.mockImplementation(() => {
      return commands.shift()
    })

    await main(rlInterface as unknown as readline.Interface)
    expect(rlInterface.question).toHaveBeenCalled()
    expect(rlInterface.write).toHaveBeenCalled()
  })
})
