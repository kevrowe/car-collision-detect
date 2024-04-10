import { main } from './main'
import readline from 'node:readline/promises'

describe('main', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should run the main function with 1 car (as per brief)', async () => {
    const rlInterface = {
      question: jest.fn(),
      write: jest.fn(),
    }

    const commands = ['10 10', '1', 'A', '1 2 N', 'FFRFFFFRRL', '2', '2']
    rlInterface.question.mockImplementation(() => {
      return commands.shift()
    })

    await main(rlInterface as unknown as readline.Interface)
    expect(rlInterface.question).toHaveBeenCalled()
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      17,
      'Your current list of cars are:\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      18,
      '- A, (1, 2) N, FFRFFFFRRL\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      20,
      'After simulation, the result is:\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(21, '- A, (5, 4) S\n')
  })
  it('should run the main function with 2 cars (as per brief)', async () => {
    const rlInterface = {
      question: jest.fn(),
      write: jest.fn(),
    }

    const carCommands = [
      'A',
      '1 2 N',
      'FFRFFFFRRL',
      '1',
      'B',
      '7 8 W',
      'FFLFFFFFFF',
    ]
    const commands = ['10 10', '1', ...carCommands, '2', '2']
    rlInterface.question.mockImplementation(() => {
      return commands.shift()
    })

    await main(rlInterface as unknown as readline.Interface)

    expect(rlInterface.write).toHaveBeenNthCalledWith(
      30,
      'Your current list of cars are:\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      31,
      '- A, (1, 2) N, FFRFFFFRRL\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      32,
      '- B, (7, 8) W, FFLFFFFFFF\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(33, '\n')
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      34,
      'After simulation, the result is:\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      35,
      '- A, collides with B at (5,4) at step 7\n',
    )
    expect(rlInterface.write).toHaveBeenNthCalledWith(
      36,
      '- B, collides with A at (5,4) at step 7\n',
    )
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
