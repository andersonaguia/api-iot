import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfigDataDto {
  @IsNotEmpty({ message: 'Obrigatório informar o número serial' })
  @IsNumber({}, { message: 'serialNumber deve ser do tipo number' })
  readonly serialNumber: number;
}


