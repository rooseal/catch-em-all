export async function stall (stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}

export function getRandomNumbersInRange (amount = 1, start = 0, end = 10, unique = false) {
  let chosenNumbers = {}

  let numbers = Array.from({ length: unique ? Math.min(amount, end - start) : amount }, (x, i) => {
    do {
      x = Math.floor(Math.random() * (end - start) + start)
    } while (unique && chosenNumbers[x] === true)
    chosenNumbers[x] = true
    return x
  })

  return amount === 1 ? numbers[0] : numbers
}
