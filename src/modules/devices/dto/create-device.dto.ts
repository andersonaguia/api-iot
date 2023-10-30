import { IsNotEmpty, IsString } from "class-validator";
import { ConnectionType } from "../enum/connection.type";

export class CreateDeviceDto {
  @IsNotEmpty({ message: "Obrigatório informar o nome" })
  @IsString({ message: "Nome deve ser uma string" })
  readonly name: string;

  @IsNotEmpty({ message: "Obrigatório informar o modelo" })
  @IsString({ message: "Modelo deve ser uma string" })
  readonly model: string;

  @IsNotEmpty({ message: "Obrigatório informar o tipo de conexão" })
  readonly connectionType: ConnectionType;

  @IsNotEmpty({ message: "Obrigatório informar o endereço de IP" })
  @IsString({ message: "Endereço de IP deve ser uma string" })
  readonly ipAddress: string;

  @IsNotEmpty({ message: "Obrigatório informar o endereço MAC" })
  @IsString({ message: "Endereço MAC deve ser uma string" })
  readonly macAddress: string;

  @IsNotEmpty({ message: "Obrigatório informar o local do dispositivo" })
  @IsString({ message: "Local do dispositivo deve ser uma string" })
  readonly location: string;
}
