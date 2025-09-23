import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import {UserRepository} from "../users/user.repository";
import jwtConfig from "../../config/jwt.config";
import {UserModule} from "../users/user.module";
import {User} from "../users/user.entity";
import {AccessTokenStrategy} from "./strategies/access-token.strategy";
import {RefreshTokenStrategy} from "./strategies/refresh-token.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    PassportModule,
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, AccessTokenStrategy, RefreshTokenStrategy, UserRepository],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
