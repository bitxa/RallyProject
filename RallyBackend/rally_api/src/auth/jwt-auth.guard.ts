import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   // genera el aqui el manejo de roles
//   canActivate(context: ExecutionContext) {
//     // Add your custom authentication logic here
//     // for example, call super.logIn(request) to establish a session.
//     return super.canActivate(context);
//   }
// }