import {Document } from "mongoose";

export interface IUserData extends Document {
    header: string;
    body: string;
    user: string;
    role?: string;
}
