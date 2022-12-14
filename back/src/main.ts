// npm i -g @nestjs/cli
// nest new project-name
// npm install mongoose
//npm install --save @nestjs/mongoose
//npm install jsonwebtoken
//npm install --save-dev @types/jsonwebtoken
//npm install bcrypt    (для щифрования пароля в базе данных))
// npm install @types/bcrypt 

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start(): Promise<any>{
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000, () => { console.log("Сервер запущен")});
}

start()