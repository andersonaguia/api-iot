import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRelayDto {
  @IsNotEmpty({ message: "Campo activeAtLowLevel não pode ser vazio" })
  @IsBoolean({ message: "Campo activeAtLowLevel deve ser um boolean" })
  readonly activeAtLowLevel: boolean;

  @IsNotEmpty({ message: "Campo surname não pode ser vazio" })
  @IsString({ message: "Campo surname deve ser uma string" })
  readonly surname: string;

  @IsNotEmpty({ message: "Campo controllerId não pode ser vazio" })
  @IsNumber({}, { message: "Campo controllerId deve ser uma string" })
  readonly controllerId: number;

  @IsNotEmpty({ message: "Campo controllerPort não pode ser vazio" })
  @IsNumber({}, { message: "Campo controllerPort deve ser um number" })
  readonly controllerPort: number;
}
