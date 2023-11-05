import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import  SignupDto  from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    if (name === '') {
      throw new UnauthorizedException('Please enter your name');
    }
    if (email === '') {
      throw new UnauthorizedException('Please enter your email');
 
    }
    if (password === '') {
      throw new UnauthorizedException('Please enter your password');

    }
    if (password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters long');

    }
    if (email.indexOf('@') === -1) {
      throw new UnauthorizedException('Please enter a valid email');

    }
    if (email.indexOf('.') === -1) {
      throw new UnauthorizedException('Please enter a valid email');
    }

    const isEmailExist = await this.userModel.findOne({ email });

    if (isEmailExist) {
      throw new UnauthorizedException('Email already exist');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
} 