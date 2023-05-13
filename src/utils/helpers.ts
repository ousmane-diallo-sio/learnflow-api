import crypto from 'crypto'

export const generateSalt = () => { 
  const rounds = 10
  return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
}

export const hashPassword = (password: string, salt: string) => {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const hashedPassword = hash.digest('hex')
  return hashedPassword
}

   
