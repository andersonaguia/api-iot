import { IsNotEmpty, IsNumber } from "class-validator";

export class ThermistorValueDto {
  @IsNotEmpty({ message: "Campo deviceId não pode ser vazio" })
  @IsNumber({}, { message: "Campo deviceId deve ser um número" })
  readonly controllerId: number;
  
  @IsNotEmpty({ message: "Campo temperature não pode ser vazio" })
  @IsNumber({}, { message: "Campo temperatura deve ser um número" })
  readonly temperature: number;
}
