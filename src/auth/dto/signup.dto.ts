import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

class SignupDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    
    @IsString()
    @IsEmail({}, { message: "Please enter correct email" } )
    readonly email: string;
    
    @IsString()
    @IsString()
    @MinLength(6)
    readonly password: string;
    }

    export default SignupDto;