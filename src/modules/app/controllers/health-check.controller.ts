import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

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
            background: linear-gradient(270deg, #ff3d00, #f7b500, #00bfa5);
            background-size: 600% 600%;
            animation: gradientBG 15s ease infinite;
            color: #333;
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

          footer {
            background: #222;
            color: #fff;
            padding: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p align="center">
            <a href="https://nestjs.com/" target="_blank">
              <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" />
            </a>
          </p>
          <h1>AUTOMATION API</h1>
          <p>Server is running ✅</p>
        </div>
        <footer>
          &copy; ${new Date().getFullYear()} Automation API by Anderson Aguiar. All rights reserved.
        </footer>
      </body>
      </html>
    `;

    return res.status(HttpStatus.OK).send(html);
  }
}
