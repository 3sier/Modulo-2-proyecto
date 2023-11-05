import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail({}, { message: "Please enter correct email" } )
    readonly email: string;
    
    @IsString()
    @IsString()
    @MinLength(6)
    readonly password: string;
    }