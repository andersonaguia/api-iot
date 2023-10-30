import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ThermistorValueDto {
  @IsNotEmpty({ message: "Campo manufacturer não pode ser vazio" })
  @IsString({ message: "Campo manufacturer deve ser uma string" })
  readonly manufacturer: string;

  @IsNotEmpty({ message: "Campo model não pode ser vazio" })
  @IsString({ message: "Campo model deve ser uma string" })
  readonly model: string;

  @IsNotEmpty({ message: "Campo minRange não pode ser vazio" })
  @IsNumber({}, { message: "Campo minRange deve ser uma string" })
  readonly minRange: number;

  @IsNotEmpty({ message: "Campo maxRange não pode ser vazio" })
  @IsNumber({}, { message: "Campo maxRange deve ser uma string" })
  readonly maxRange: number;

  @IsNotEmpty({ message: "Campo nominalResistance não pode ser vazio" })
  @IsNumber({}, { message: "Campo nominalResistance deve ser uma string" })
  readonly nominalResistance: number;

  @IsNotEmpty({ message: "Campo voltageDividerResistance não pode ser vazio" })
  @IsNumber(
    {},
    { message: "Campo voltageDividerResistance deve ser uma string" }
  )
  readonly voltageDividerResistance: number;

  @IsNotEmpty({ message: "Campo controllerId não pode ser vazio" })
  @IsNumber({}, { message: "Campo controllerId deve ser uma string" })
  readonly controllerId: number;

  @IsNotEmpty({ message: "Campo controllerPort não pode ser vazio" })
  @IsNumber({}, { message: "Campo controllerPort deve ser um number" })
  readonly controllerPort: number;

  @IsNotEmpty({ message: "Campo location não pode ser vazio" })
  @IsString({ message: "Campo location deve ser uma string" })
  readonly location: string;
}
