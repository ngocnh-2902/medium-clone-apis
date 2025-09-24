import { Controller, Get } from '@nestjs/common';

import { AppService } from '@app/app.service';
import {BcryptService} from "@module/auth/bcrypt.service";
import { Public } from '@app/common/decorators/public.decorator';


@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly bcryptService: BcryptService
  ) {}

  @Public()
  @Get('hello')
  async getHello(): Promise<string> {
    const pass = 'mypassword';
    const hased = await this.bcryptService.hash(pass);
    const isMatch = await this.bcryptService.compare(pass, hased);
    console.log('hased', hased);
    console.log('isMatch', isMatch);


    return this.appService.getHello();
  }
}
