import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateThermistorDataDto {
  @IsNotEmpty({ message: "Obrigatório informar o campo thermistorId" })
  @IsNumber({}, { message: "Campo thermistorId deve ser um número" })
  readonly thermistorId: number;

  @IsNotEmpty({ message: "Obrigatório informar o campo value" })
  @IsNumber({}, { message: "Campo value deve ser um número" })
  readonly value: number;
}
