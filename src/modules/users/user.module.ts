import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@module/users/entities/user.entity';
import { UserController } from '@module/users/user.controller';
import { UserService } from '@module/users/user.service';
import {UserRepository} from '@module/users/repositories/user.repository';
import {AuthModule} from '@module/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule {}