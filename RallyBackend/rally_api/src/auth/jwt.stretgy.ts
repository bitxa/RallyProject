import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //? si el token expiro o no
      secretOrKey: 'secret', //? esto mandar a .env
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, role: payload.role };
  }
}
