import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtModule} from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';
import {UserRepository} from "../users/repositories/user.repository";
import jwtConfig from "../../config/jwt.config";
import {UserModule} from "../users/user.module";
import {User} from "../users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, UserRepository],
  exports: [JwtModule],
})
export class AuthModule {}
