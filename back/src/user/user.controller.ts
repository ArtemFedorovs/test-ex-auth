import { Controller, Get, Post, Body, Param, Put, Query, Delete, Headers, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import {UserDto} from './user.dto';
import {UserDataDto} from './userData.dto';
import {IUserData} from "./interfaces/userData.interface";
import DecodeJWT from "../utils/decodeJwt";

@Controller()
export class UserController {
    constructor(private readonly authService:  UserService) {}

    @Post("/register")
    register(@Body() user: UserDto):  Promise<string> {
      return this.authService.register(user);
    }
  
    @Post("/login")
    login(@Body() user: UserDto):  Promise<string>{
      return this.authService.login(user);
    }

    @Get("/user-data")     
    getUserInfo(@Headers("authorization") userEmail: string): Promise<IUserData[]|false> {  //переписать - надо получить id из токена
      return this.authService.getUserData(DecodeJWT(userEmail));  
    }

    @Put("/user-data")
    newUserData(@Headers("authorization") userEmail: string, @Body() userData: UserDataDto):  Promise<IUserData> {  
      return this.authService.newUserData(DecodeJWT(userEmail), userData);  
    }

    @Patch("/user-data/:id")
    editUserData(@Headers("authorization") userEmail: string, @Body() userData: UserDataDto, @Param("id") id: string):  Promise<{success: boolean}|IUserData> {  
        return this.authService.editUserData(DecodeJWT(userEmail), userData, id);  
    }

    @Delete("/user-data/:id")
    deleteUserData(@Headers("authorization") userEmail: string, @Param("id") id: string):  Promise<{success: boolean}|void> { 
      return this.authService.deleteUserData(DecodeJWT(userEmail), id);  
    }


  }

