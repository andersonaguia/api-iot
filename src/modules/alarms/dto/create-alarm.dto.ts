import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateAlarmDto {
  @IsNotEmpty({ message: 'Campo surname não pode ser vazio' })
  @IsString({ message: 'Campo surname deve ser uma string' })
  readonly surname: string;

  @IsNotEmpty({ message: 'Campo controllerId não pode ser vazio' })
  @IsNumber({}, { message: 'Campo controllerId deve ser uma string' })
  readonly controllerId: number;

  @IsNotEmpty({ message: 'Campo controllerPort não pode ser vazio' })
  @IsString({ message: 'Campo controllerPort deve ser uma string' })
  readonly controllerPort: string;

  @IsOptional()
  @IsString({ message: 'Campo controllerPort deve ser uma string' })
  readonly message: string;
}
