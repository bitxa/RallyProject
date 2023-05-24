import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument, User } from 'src/users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UsersDocument>,
    private jwtAuthService: JwtService,
  ) {}
  async register(userObject: RegisterAuthDto): Promise<User> {
    const { password } = userObject;

    //? Nunca guardar texto plano de contraseñas en la base de datos
    //? para evitar eso aqui las vamos a encriptar

    const plainToHash = await hash(password, 10);
    userObject.password = plainToHash;
    return this.userModel.create(userObject);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    //comparamos con la contraseña que viene en el body mediante bcrypt compare
    const isMatch = await compare(password, findUser.password);
    if (!isMatch) {
      // throw new HttpException('Password Incorrect', 403);
      throw new UnauthorizedException(HttpException, 'Password Incorrect');
    }

    const payload = { id: findUser._id, name: findUser.name };
    const token = await this.jwtAuthService.signAsync(payload);

    const data = {
      user: findUser,
      token: token,
    };
    return data;
  }
}