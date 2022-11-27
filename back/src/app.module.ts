import { Module } from '@nestjs/common';
import { AuthModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [ MongooseModule.forRoot("mongodb+srv://admin:bestadmin@cluster0.xiw9f4k.mongodb.net/auth2?retryWrites=true&w=majority"),
    AuthModule],
})
export class AppModule {}



