import dotenv from 'dotenv'

dotenv.config()

export const config = {
  userApiBaseUrl: process.env.USER_API_BASE_URL,
  userApiKey: process.env.USER_API_KEY,
  userApiAdminEmail: process.env.USER_API_ADMIN_EMAIL,
  userApiAdminPass: process.env.USER_API_ADMIN_PASS
}