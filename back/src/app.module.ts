import { Module } from '@nestjs/common';
import { AuthModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
    exclude: ['/user-data*', '/login*', '/register*'],
  }),
    MongooseModule.forRoot("mongodb+srv://admin:bestadmin@cluster0.xiw9f4k.mongodb.net/auth2?retryWrites=true&w=majority"),
    AuthModule],
})
export class AppModule {}



