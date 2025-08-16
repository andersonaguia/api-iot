<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# <p align="center">API-IOT</p>

## 💻 Sobre o projeto

[ApiIot](https://github.com/andersonaguia/api-manutencoes) é uma API para cadastro de usuários, cadastro e controle de dispositivos.

## 🚧 Funcionalidades

- [x] Criar um usuário
- [x] Realizar login
- [x] Alterar senha do usuário
- [x] Adicionar controlador
- [x] Buscar controlador pelo ID
- [x] Buscar controlador pelo endereço IP
- [x] Buscar controlador pelo endereço MAC
- [x] Buscar controlador pelo endereço IP
- [x] Adicionar termistor ao controlador
- [x] Buscar termistor pela número da porta do controlador
- [x] Adicionar valor de temperatura ao termistor
- [x] Buscar última temperatura registrada pelo termistor
- [x] Buscar paginada de temperaturas registradas pelo termistor a partir de um range de datas
- [x] Buscar termistor pela número da porta do controlador

## ⚠️ Pré-requisitos
- Ter o [NodeJS](https://nodejs.org/en/) instalado na máquina;
- Ter o [NestJS](https://nestjs.com/) instalado na máquina;
- Ter o [MySql](https://www.mysql.com/) instalado na máquina;

#

## ⚙️ Configuração da aplicação em modo desenvolvimento

1. Realizar o clone desse repositório

```
git clone https://github.com/andersonaguia/api-iot.git
```

2. Acessar a pasta do projeto;

```
cd api-iot
```

3. Instalar as dependências;

```
npm install
```

4. Renomear o arquivo `.env_example` para `.env` e inserir os dados conforme sua configuração do MySQL;

Exemplo:

```
#Port number
PORT=3001

#Database
DB_DIALECT=mysql
DB_HOST=localhost ou endereço do servidor de banco de dados
DB_PORT=3306
DB_USER="nome de usuário do banco de dados"
DB_PASS="senha do banco de dados"
DB_NAME=automation

#Jwt Secret
JWT_SECRET="sua senha para utilizar na autenticação JWT"
```
5. Criar um database no `MySQL` chamado `automation` para utilizar no projeto;
```
mysql -u root -p
Enter password: 

mysql> CREATE DATABASE automation CHARACTER SET utf8 COLLATE utf8_general_ci;
```
6. Instalar o cross-env e rodar as migrations para criar as tabelas do banco de dados automaticamente

```
npm install --save-dev cross-env

npm run migration:run
```
7. Servir a aplicação em modo desenvolvimento;
```
npm run start:dev
```
#
## 💻 Acessando as rotas da aplicação

### Endpoints disponíveis

#### 🔓 Criar um usuário

##### Para criar um usuário basta realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Para o campo `role` os seguintes valores serão aceitos: 

```
ADMIN = "admin"
SUPERVISOR = "supervisor"
MANAGER = "manager"
USER = "user"
```

```
POST: http://localhost:3001/auth/signup

Headers: {
	"Content-Type": "application/json"
}
Body: {  
	"fullName": "My Name",
	"email": "my_email@email.com",
	"password": "aA123@456!",
	"passwordConfirmation": "aA123@456!",
	"occupation": "Supervisor",
	"role": "supervisor"	
}
```

**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Usuário cadastrado com sucesso"
	}
}
``` 

#### 🔓 Fazer login

##### Para fazer login na aplicação você realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Você receberá um `Token JWT`` para acesso às rotas protegidas da aplicação.

```
POST: http://localhost:3001/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: {  
	"email": "my_email@email.com",
	"password": "aA123@456!"	
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQW5kZXJzb24iLCJvY2N1cGF0aW9uIjoiVMOpY25pY28gZW0gTWFudXRlbsOnw6NvIiwiZW1haWwiOiJhbmRlcnNvbmxhZ3VpYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4MDkwMDU1LCJleHAiOjE2OTg2OTQ4NTV9.At1l6IXX2bnBgVdPpCFLmV63-y3YHJp-ZMTzON4twJI"
	}
}
```

#### 🔒 Alterar senha

##### Para alterar a senha do usuário você realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login.

```
PATCH: http://localhost:3001/auth/changepassword
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"email": "my_email@email.com",
	"oldPassword": "aA123@456!",
	"newPassword": "bB123@456!",
	"newPasswordConfirmation": "bB123@456!"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"message": "Senha alterada com sucesso"		
	}
}
```

#### 🔒 Adicionar Controlador

##### Para adicionar um novo controlador você deve realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo:

```
POST: http://localhost:3001/controllers/create
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"name": "CONT-TER-001",
	"model": "ESP32", 
	"connectionType": "wifi", 
	"ipAddress": "172.31.210.183", 
	"macAddress": "2E:3D:4B:AD:EF",
	"location": "Sala de Máquinas"
}
```
**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Dispositivo cadastrado com sucesso",
		"data": {
			"name": "CONT-TER-001",
			"model": "ESP32",
			"connectionType": "wifi",
			"ipAddress": "172.31.210.183",
			"macAddress": "2E:3D:4B:AD:EF",
			"createdAt": "2023-10-31T21:55:36.193Z",
			"location": "Sala de Automação",
			"updatedAt": "2023-10-31T21:55:36.214Z",
			"deletedAt": null,
			"id": 1
		}
	}
}
```

#### 🔒 Buscar Controlador pelo ID

##### Para buscar um controlador pelo ID você deve realizar uma requisição do tipo `GET` utilizando `Route` params conforme indicado abaixo:

```
GET: http://localhost:3001/controllers/findbyid/1
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": {
			"id": 1,
			"createdAt": "2023-10-31T21:55:36.193Z",
			"updatedAt": "2023-10-31T21:55:36.214Z",
			"deletedAt": null,
			"name": "CONT-TER-001",
			"model": "ESP32",
			"connectionType": "wifi",
			"ipAddress": "172.31.210.183",
			"macAddress": "2E:3D:4B:AD:EF",
			"location": "Sala de Automação"
		}
	}
}
```

#### 🔒 Buscar Controlador pelo Endereço IP

##### Para buscar um controlador pelo endereço de IP você deve realizar uma requisição do tipo `GET` utilizando `Query` params conforme indicado abaixo:

```
GET: http://localhost:3001/controllers/findbyip?ipAddress=172.31.210.183
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": {
			"id": 1,
			"createdAt": "2023-10-31T21:55:36.193Z",
			"updatedAt": "2023-10-31T21:55:36.214Z",
			"deletedAt": null,
			"name": "CONT-TER-001",
			"model": "ESP32",
			"connectionType": "wifi",
			"ipAddress": "172.31.210.183",
			"macAddress": "2E:3D:4B:AD:EF",
			"location": "Sala de Automação"
		}
	}
}
```

#### 🔒 Buscar Controlador pelo Endereço MAC

##### Para buscar um controlador pelo endereço de IP você deve realizar uma requisição do tipo `GET` utilizando `Query` params conforme indicado abaixo:

```
GET: http://localhost:3001/controllers/findbymac?macAddress=84%3A0D%3A8E%3A3B%3A19%3ABA
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": {
			"id": 1,
			"createdAt": "2023-10-31T21:55:36.193Z",
			"updatedAt": "2023-10-31T21:55:36.214Z",
			"deletedAt": null,
			"name": "CONT-TER-001",
			"model": "ESP32",
			"connectionType": "wifi",
			"ipAddress": "172.31.210.183",
			"macAddress": "2E:3D:4B:AD:EF",
			"location": "Sala de Automação"
		}
	}
}
```

#### 🔒 Adicionar um termistor ao controlador

##### Para adicionar um termistor ao controlador você deve realizar uma requisição do tipo `POST` informando os dados conforme indicado abaixo:

```
POST: http://localhost:3001/thermistors/add
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"controllerId" : 1, 
	"controllerPort": 34, 
	"location": "Subsolo", 
	"manufacturer": "Full Gauge", 
	"minRange": -50, 
	"maxRange": 105, 	
	"model": "SB-41", 
	"nominalResistance": 10000, 
	"voltageDividerResistance": 4700
}
```
**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Termistor cadastrado com sucesso"
	}
}
```

#### 🔒 Buscar Termistor pela Porta do Controlador

##### Para buscar um termistor pelo controlador informando a porta você deve realizar uma requisição do tipo `GET` utilizando `Query` params conforme indicado abaixo:

```
GET: http://172.31.210.101:3004/thermistors/findbycontrollerport/?controllerId=1&controllerPort=34
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": {
			"id": 1,
			"createdAt": "2023-10-30T17:36:51.589Z",
			"updatedAt": "2023-10-30T17:36:51.589Z",
			"deletedAt": null,
			"manufacturer": "Full Gauge",
			"model": "SB-41",
			"minRange": "-50.00",
			"maxRange": "105.00",
			"nominalResistance": "10000.00",
			"voltageDividerResistance": "4700.00",
			"controllerPort": 34,
			"location": "Sala de Automação"
		}
	}
}
```

#### 🔒 Adicionar Valor de Temperatura ao Termistor

##### Para adicionar o valor de leitura do termistor você deve realizar uma requisição do tipo `POST` informando os dados conforme indicado abaixo:

```
POST: http://localhost:3001/thermistordata/add
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}

Body: {  
	"thermistorId" : 1, 
	"value": 25.10
}
```
**Resultado:**
```
{
	"status": 201,
	"headers": {},
	"body": {
		"statusCode": 201,
		"message": "Termistor cadastrado com sucesso"
	}
}
```

#### 🔒 Buscar Última Temperatura Registrada pelo ID do Termistor

##### Para buscar o último valor registrado pelo termistor você deve realizar uma requisição do tipo `GET` informando o ID do termistor como `Route` params conforme indicado abaixo:

```
GET: http://localhost:3001/thermistordata/findactualvalue/1
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": [
			{
				"id": 1,
				"createdAt": "2023-10-31T21:55:54.643Z",
				"updatedAt": "2023-10-31T21:55:54.643Z",
				"deletedAt": null,
				"value": "22.39",
				"thermistor": {
					"id": 1,
					"createdAt": "2023-10-31T21:55:41.842Z",
					"updatedAt": "2023-10-31T21:55:41.842Z",
					"deletedAt": null,
					"manufacturer": "Full Gauge",
					"model": "SB-41",
					"minRange": "-50.00",
					"maxRange": "105.00",
					"nominalResistance": "10000.00",
					"voltageDividerResistance": "4700.00",
					"controllerPort": 34,
					"location": "Sala de Automação"
				}
			}
		]
	}
}
```

#### 🔒 Buscar Temperaturas Registradas pelo Termistor por Data

##### Para as temperaturas registradas pelo termistor ao longo de um período você deve realizar uma requisição do tipo `GET` utilizando `Query` params para informar a data inicial, final, número de páginas e itens por página conforme indicado abaixo:

```
GET: http://localhost:3001/thermistordata/find-values-by-date/?thermistorId=2&startDate=2023-10-27&endDate=2023-10-28&page=1&limit=10
Headers: {
	"Content-Type": "application/json",
	"Authorization": "Bearer SEU_TOKEN_AQUI"
}
```
**Resultado:**
```
{
	"status": 200,
	"headers": {},
	"body": {
		"statusCode": 200,
		"data": {
			"total": 3,
			"values": [
				{
					"id": 4,
					"createdAt": "2023-10-27T00:25:20.677Z",
					"updatedAt": "2023-10-27T00:25:20.677Z",
					"deletedAt": null,
					"value": "18.90"
				},
				{
					"id": 6,
					"createdAt": "2023-10-27T11:02:12.925Z",
					"updatedAt": "2023-10-27T11:02:12.925Z",
					"deletedAt": null,
					"value": "21.99"
				},
				{
					"id": 7,
					"createdAt": "2023-10-27T11:28:16.017Z",
					"updatedAt": "2023-10-27T11:28:16.059Z",
					"deletedAt": null,
					"value": "22.39"
				}
			]
		}
	}
}
```

## 🛠 Tecnologias

[![NodeJS Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&link=https://nodejs.org/en/)](https://nodejs.org/en/)

[![TypeScript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&link=https://www.typescriptlang.org/)](https://www.typescriptlang.org/)	

[![NestJS Badge](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white&link=https://nestjs.com/)](https://nestjs.com/)

[![ExpressJS Badge](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white&link=https://expressjs.com/)](https://expressjs.com/)

[![NpmJS Badge](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white&link=https://www.npmjs.com/)](https://www.npmjs.com/)

[![Insomnia Badge](
https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white&link=https://insomnia.rest/)](https://insomnia.rest/)

[![Prettier Badge](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E&link=https://prettier.io/)](https://prettier.io/)

[![Mysql Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 🦸 Autor

<div style="display: flex; flex-direction: column; align-items: center">
<h3>Anderson Aguiar</h3>
<a href="https://www.linkedin.com/in/andersonlaguiar/" target="_blank">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="logo linkedin" style="width: 150px; height: 30px;">
</a>
</div>

## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE).


