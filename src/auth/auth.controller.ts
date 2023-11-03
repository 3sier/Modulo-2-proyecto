import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import  SignupDto  from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('/signup')
    signUp(@Body() SignUpDto: SignupDto): Promise<{ token: string }> {
        return this.authService.signUp(SignUpDto);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}