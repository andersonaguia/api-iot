import { EnvProps } from './interfaces';

export default (): EnvProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  socketIoPort: parseInt(process.env.SOCKETIO_PORT, 10) || 8001,
  webSocketPort: parseInt(process.env.WEBSOCKET_PORT, 10)|| 8002,
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  apiUrl: {
    whatsapp: {
      connect: process.env.WHATSAPP_API_CONNECT,
      sendMessage: process.env.WHATSAPP_API_SEND_MESSAGE_URL,
    },
  },
});
