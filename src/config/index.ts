import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()

if (envFound.error) {
  throw new Error('Não foi possível encontrar o arquivo .env')
}

export default {
  port:  process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  databaseURL: process.env.MONGODB_URI || 'URL inválida',
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api'
  }
}