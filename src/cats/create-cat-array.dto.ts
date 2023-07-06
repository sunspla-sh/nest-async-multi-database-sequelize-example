import { CreateCatDto } from './create-cat.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateCatArrayDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateCatDto)
  action: CreateCatDto[];
}
