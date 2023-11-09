import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class NewRelayStateDto {
  @IsNotEmpty({ message: "Obrigatório informar o campo expectedLevel" })
  @IsBoolean({ message: "Campo expectedLevel deve ser um booleano" })
  expectedLevel: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo currentLevel" })
  @IsBoolean({ message: "Campo currentLevel deve ser um booleano" })
  currentLevel: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo relayId" })
  @IsNumber({}, { message: "Campo relayId deve ser um número" })
  relayId: number;
}
