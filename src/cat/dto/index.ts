import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty({ message: 'Name must be string' })
  name: string;
}
