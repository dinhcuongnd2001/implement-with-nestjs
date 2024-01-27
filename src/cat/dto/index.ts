import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCatDto {
  @IsString({ message: 'Id Must be string' })
  id: string;

  @IsNotEmpty({ message: 'Must be string' })
  name: string;

  @IsNumber(undefined, { message: 'Number required' })
  @IsOptional()
  check: boolean;
}
