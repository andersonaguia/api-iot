import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class NewRelayStateDto {
  @IsNotEmpty({ message: "Obrigatório informar o campo expectedLevel" })
  @IsBoolean({ message: "Campo expectedLevel deve ser um booleano" })
  readonly expectedLevel: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo currentLevel" })
  @IsBoolean({ message: "Campo currentLevel deve ser um booleano" })
  readonly currentLevel: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo relayId" })
  @IsNumber({}, { message: "Campo relayId deve ser um número" })
  readonly relayId: number;
}
