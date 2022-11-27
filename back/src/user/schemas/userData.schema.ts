import { Schema} from 'mongoose';


export const UserDataSchema = new Schema({
        header: String,
        body: String,
        role: String,
        user: String
}, {
   timestamps: true 
})


