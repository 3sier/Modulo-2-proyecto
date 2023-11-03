import { Controller, Get } from '@nestjs/common';



@Controller('api/health')
export class HealthController {
  constructor() {}

  @Get()
  async health() {
    return 'ok';
  }
}
