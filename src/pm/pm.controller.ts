import { Controller, Get, Query } from '@nestjs/common';
import { PmService } from './pm.service';

@Controller('pm')
export class PmController {
    constructor(private pmService: PmService) {}

    @Get('getTaskFromNull')
    async getTaskFromNull(@Query('userId') userId: number) {
        
    }
}
