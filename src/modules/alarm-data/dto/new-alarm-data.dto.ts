import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewAlarmDataDto {
  @IsNotEmpty({ message: "Obrigatório informar o campo enabled" })
  @IsBoolean({ message: "Campo enabled deve ser um booleano" })
  enabled: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo sendMessage" })
  @IsBoolean({ message: "Campo sendMessage deve ser um booleano" })
  sendMessage: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo visible" })
  @IsBoolean({ message: "Campo visible deve ser um booleano" })
  visible: boolean;

  @IsNotEmpty({ message: "Obrigatório informar o campo alarmId" })
  @IsNumber({}, { message: "Campo alarmId deve ser um número" })
  alarmId: number;
}
