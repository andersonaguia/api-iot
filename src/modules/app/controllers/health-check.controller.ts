import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

const WS_URL = `ws://${process.env.SERVER_IP}:${process.env.WEBSOCKET_PORT}`;
const SOCKETIO_URL = `http://${process.env.SERVER_IP}:${process.env.SOCKETIO_PORT}`;

@Controller('health-check')
export class HealthCheckController {
  constructor() {}

  @Get()
  @Header('Content-Type', 'text/html')
  async healthCheck(@Res() res: Response) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Automation API</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: linear-gradient(270deg, #212529, #2f3e46, #0a100d);
            background-size: 600% 600%;
            animation: gradientBG 35s ease infinite;
            color: #f8f9fa;
            text-align: center;
          }

          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          img {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
            animation: pulse 2s infinite ease-in-out;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }

          h1 {
            font-size: 2rem;
            margin: 10px 0;
            opacity: 0;
            animation: fadeIn 2s forwards;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .btn {
            padding: 10px 20px;
            margin: 10px;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            color: #fff;
            width: 10rem;
          }

          .btn {
            padding: 10px 20px;
            margin: 10px;
            font-size: 1rem;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            width: 10rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .btn:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          }

          .btn-websocket { background-color: #007bff; }
          .btn-socketio { background-color: #28a745; }

          footer {
            background: #222;
            padding: 15px 0;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>

        <div class="container">
          <a href="https://nestjs.com/" target="_blank">
            <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" />
          </a>
          <h1>AUTOMATION API</h1>

          <div class="btn-test">
            <button class="btn btn-websocket" onclick="testWebSocket()">Test WebSocket</button>  
            <button class="btn btn-socketio" onclick="testSocketIO()">Test Socket.IO</button>             
          </div>

          <p>Server is running ✅</p>
          <p id="ws-status" class="status"></p>
          <p id="socketio-status" class="status"></p>          
        </div>

        <footer>
          &copy; ${new Date().getFullYear()} Automation API by Anderson Aguiar. All rights reserved.
        </footer>

        <script src="https://cdn.socket.io/4.7.2/socket.io.min.js"></script>
        <script>
          function testWebSocket() {
            const statusEl = document.getElementById('ws-status');
            const ws = new WebSocket('${WS_URL}');
            
            statusEl.textContent = 'Connecting...';
            
            ws.onopen = () => statusEl.textContent = 'WebSocket connected! ✅';
            ws.onerror = (err) => statusEl.textContent = 'WebSocket error ❌';
            ws.onclose = () => statusEl.textContent = 'WebSocket closed ⚠️';
          }

          function testSocketIO() {
            const statusEl = document.getElementById('socketio-status');
            const socket = io('${SOCKETIO_URL}');
            
            statusEl.textContent = 'Connecting...';
            
            socket.on('connect', () => statusEl.textContent = 'Socket.IO connected! ✅');
            socket.on('connect_error', () => statusEl.textContent = 'Socket.IO error ❌');
            socket.on('disconnect', () => statusEl.textContent = 'Socket.IO disconnected ⚠️');
          }
        </script>
      </body>
      </html>
    `;

    return res.status(HttpStatus.OK).send(html);
  }
}
