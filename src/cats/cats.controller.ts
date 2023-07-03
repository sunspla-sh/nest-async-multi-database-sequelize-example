import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return;
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return;
  }
}
