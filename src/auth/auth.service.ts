import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

import  SignupDto  from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        private jwtService: JwtService
    )   {}

    async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
        const { name, email, password } = signUpDto;


        console.log('Password:', password);
        const hashedPassword = await hash(password, 10);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {

        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });
        
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatched = await compare(password, user.password);

        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }
}