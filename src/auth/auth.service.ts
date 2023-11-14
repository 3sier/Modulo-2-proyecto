import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { SignupDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
  }

  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const secretKey = this.generateUniqueSecretKey();

    const hashedPassword = await hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      secretKey,
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

  async validateUser(email: string, password: string, secretKey: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.secretKey !== secretKey) {
      throw new UnauthorizedException('Invalid secret key');
    }

    return user;
  }

  private generateUniqueSecretKey(): string {
    const secretKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return secretKey;
  }
}