<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# <p align="center">API-IOT</p>

<<<<<<< HEAD
## 💻 Sobre o projeto

[ApiIot](https://github.com/andersonaguia/api-manutencoes) é uma API para cadastro de usuários e controle de dispositivos.

## ⚙️ Funcionalidades

- [x] Criar um usuário

---

## :construction: Pré-requisitos
- Ter o [NodeJS](https://nodejs.org/en/) instalado na máquina;
- Ter o [Postgres](https://www.postgresql.org/) instalado na máquina;
#

## :warning: Configuração da aplicação

1) Criar um database no MySQL chamado `iot` para utilizar no projeto;
2) Utilizar o comando `npm install` para instalar as dependências;
3) Utilizar o `.env_example` como base para o `.env` e colocar as suas configurações;
=======
## 🚀 Sobre o projeto

`Api IOT` é uma API Rest para cadastro de usuários, controle e obtenção de dados de dispositivos previamente cadastrados no sistema.

## 📃 Funcionalidades

- ☑️ Criar um usuário
- ☑️ Realizar login
- ☑️ Alterar senha do usuário
- ☑️ Criar um usuário
- ☑️ Criar um usuário

---

## ⚠️ Pré-requisitos
- Ter o [NodeJS](https://nodejs.org/en/) instalado na máquina;
- Ter o [MySQL](https://www.mysql.com/) instalado na máquina;
#

## ⚙️ Configuração da aplicação

1) Criar um database no MySQL chamado `automation` para utilizar no projeto;
2) Utilizar o comando `npm install` para instalar as dependências;
3) Utilizar o `.env_example` como base para o `.env` e inserir as suas configurações;
>>>>>>> develop
4) Utilizar o comando `npm run migration:run` para criar as tabelas após a configuração das variáveis de ambiente no passo 3
5) Utilizar o comando `npm run start:dev` para executar a aplicação no ambiente de desenvolvimento.

#
## 💻 Acessando as rotas da aplicação

## Endpoints disponíveis
<<<<<<< HEAD
### Criar um responsável pela manutenção
```
POST: http://localhost:3000/users/create
=======

### 🔓 Criar um usuário

#### Para criar um usuário basta realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Para o campo `role` os seguintes valores serão aceitos: 

```
ADMIN = "admin"
SUPERVISOR = "supervisor"
MANAGER = "manager"
USER = "user"
```


```
POST: http://localhost:3001/auth/signup
>>>>>>> develop
Headers: {
	"Content-Type": "application/json"
}
Body: {  
<<<<<<< HEAD
	"responsible": "Anderson"
=======
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

### 🔓 Fazer login

#### Para fazer login na aplicação você realizar uma requisição do tipo `POST` com os dados do `Body` conforme indicado abaixo. Você receberá um `Token JWT`` para acesso às rotas protegidas da aplicação.

```
POST: http://localhost:3001/auth/signin
Headers: {
	"Content-Type": "application/json"
}

Body: {  
	"email": "my_email@email.com",
	"password": "aA123@456!"	
>>>>>>> develop
}
```
**Resultado:**
```
{
<<<<<<< HEAD
	"responsible": "ANDERSON",
	"created_at": "2023-02-03T00:56:36.985Z",
	"updated_at": "2023-02-03T00:56:36.985Z",
	"id": 1
}
``` 

#
=======
	"status": 200,
	"headers": {},
	"body": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiQW5kZXJzb24iLCJvY2N1cGF0aW9uIjoiVMOpY25pY28gZW0gTWFudXRlbsOnw6NvIiwiZW1haWwiOiJhbmRlcnNvbmxhZ3VpYXJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4MDkwMDU1LCJleHAiOjE2OTg2OTQ4NTV9.At1l6IXX2bnBgVdPpCFLmV63-y3YHJp-ZMTzON4twJI"
	}
}
```

### 🔒 Alterar senha

#### Para alterar a senha do usuário você realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login.

```
POST: http://localhost:3001/auth/signin
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


### 🔒 Alterar senha

#### Para alterar a senha do usuário você realizar uma requisição do tipo `PATCH` com os dados do `Body` conforme indicado abaixo. No cabeçalho da requisição você deverá enviar o `TOKEN` recebido no momento da realização do login.

```
POST: http://localhost:3001/auth/signin
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

>>>>>>> develop

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

<<<<<<< HEAD
[![AmazonAWSBadge](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

=======
>>>>>>> develop

## 🦸 Autor
 <b>Anderson Aguiar</b>🚀
 <br />
[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/andersonlaguiar/)](https://www.linkedin.com/in/andersonlaguiar/) 

---

<<<<<<< HEAD
## 📝 Licença

Este projeto está sob a licença [MIT](./LICENSE).
=======
## ©️ Licença

Este projeto está sob a licença [MIT](./LICENSE).

>>>>>>> develop
