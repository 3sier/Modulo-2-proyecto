import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



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