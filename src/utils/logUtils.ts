export const logConfirmation = (message: string) => {
  console.log("\x1b[32m%s\x1b[0m", `[OK] ${message}`)
  process.stdout.write(('\x1b[0m')) // reset text color to default
}