import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const emailConfig = {
  host: process.env.EMAIL_HOST || 'server54.web-hosting.com',
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'sadik@sadikul.me',
    pass: process.env.EMAIL_PASS || '',
  },
  from: process.env.EMAIL_FROM || 'sadik@sadikul.me',
}; 