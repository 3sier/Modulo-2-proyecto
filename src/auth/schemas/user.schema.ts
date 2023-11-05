import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


@Schema({
    timestamps: true,

})
export class User {
    @Prop()
    name: string;

    @Prop({Uniqe: [true, 'Duplicate email not allowed'] })
    email: string;
    
    @Prop()
    password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);