import { Injectable, HttpException } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import {IUser} from "./interfaces/user.interface";
import {IUserData} from "./interfaces/userData.interface";
import {UserDto} from './user.dto';
import {UserDataDto} from './userData.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly  userModel: Model<IUser>, @InjectModel("UserData") private readonly  userDataModel: Model<IUserData>) {}
    
    public async  register(newUser: UserDto): Promise<string> {
            const findedUser = await this.userModel.findOne({email: newUser.email}); //проверка на наличие такого пользователя в базе
            if(findedUser) { 
                throw new HttpException("Такой пользователь уже есть", 400)
            } 

            const password = newUser.password; //шифруем пароль
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const user = await new this.userModel({...newUser, password: passwordHash})
            user.save();

            const token = jwt.sign({user: newUser.email}, "secretkey", {expiresIn: "30d"});  //Зашивровываем id в токене
            return token;
    }

    public async login(user: UserDto): Promise<string> {
            const findedUser = await this.userModel.findOne({email: user.email});  //проверка на наличие такого пользователя в базе
            if(!findedUser) {throw new HttpException("Неверный логин", 400)};

            const isValidPass = await bcrypt.compare(user.password, findedUser.password); //проверка правильности пароля
            if(!isValidPass) {  // Если пароль неверный отправляем ошибку
                throw new HttpException("Неверный пароль", 400)
            } 

            const token = jwt.sign({user: user.email}, "secretkey", {expiresIn: "30d"});  //Зашивровываем id в токене
            return token;
    }

    public async newUserData(userLogin: string|jwt.JwtPayload, newUserData: UserDataDto): Promise<IUserData> { 
            const userData = await new this.userDataModel({...newUserData, user: userLogin})
            userData.save();
            return userData;  
    }

    public async getUserData(userLogin: string|jwt.JwtPayload): Promise<IUserData[]|[]> { 
            const userData = await this.userDataModel.find({user: userLogin});
            return userData;
    }

    public async deleteUserData(userLogin: string|jwt.JwtPayload, id:  string): Promise<{success: boolean}> { 
            const userData = await this.userDataModel.findById(id);
                if(userData.user != userLogin) {throw new HttpException("Недостаточно прав", 400)}; // проверка на авторизацию
            await this.userDataModel.deleteOne({ _id: String(id) })
            return {success: true}
    }

    public async editUserData(userLogin: string|jwt.JwtPayload, editedUserData: UserDataDto, id: string): Promise<{success: boolean}|IUserData> { 
            if (id === "undefined") { // Если id записи не передан, то создаум новую запись
                const userData = await new this.userDataModel({...editedUserData, user: userLogin})
                userData.save();
                return userData;
            }
            const userData = await this.userDataModel.findById(id);
            if(userData?.user != userLogin) {throw new HttpException("Недостаточно прав", 400)} // проверка на авторизацию
            await this.userDataModel.updateOne({_id: id}, { header: editedUserData.header,  body: editedUserData.body});
            return userData
    }

}
