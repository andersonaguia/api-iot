export interface EnvProps {
  port: number;
  socketIoPort: number;
  webSocketPort: number;
  database: {
    dialect: string;
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
  };
  apiUrl: {
    whatsapp: {
      connect: string;
      sendMessage: string;
    };
  };
}
