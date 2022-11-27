import * as jwt from "jsonwebtoken";
import { HttpException } from '@nestjs/common';

export default (hash) =>{ //мидлвар для проверки авторизации
    const token = (hash || "").replace(/Bearer\s?/,""); //получаем токен из заголовка запроса и редактируем его 
    if(token) {
        try {
            const decodedToken = jwt.verify(token, "secretkey");  
            return decodedToken["user"]
        } catch(err) {throw new HttpException("Нет доступа", 500)}
        
    } else {
        throw new HttpException("Нет доступа", 500)
    }
    
};
