import dotenv from 'dotenv'

dotenv.config()

export const config = {
  userApiBaseUrl: process.env.USER_API_BASE_URL,
  userApiKey: process.env.USER_API_KEY,
  userApiAdminEmail: process.env.USER_API_ADMIN_EMAIL,
  userApiAdminPass: process.env.USER_API_ADMIN_PASS,
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  secretKey: process.env.SECRET_KEY,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbSsl: process.env.DB_SSL === 'true',
}