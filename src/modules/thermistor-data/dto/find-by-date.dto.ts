import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class FindValuesByDateDto {
  @IsNotEmpty({ message: "Obrigatório enviar o dado thermistorId" })
  @IsNumber({}, { message: "thermistorId deve ser um numero" })
  thermistorId: number;

  @IsNotEmpty({message: "Obrigatório enviar o dado startDate"})
  @IsDateString({}, {message: "startDate deve ver do tipo string"})
  startDate: Date;

  @IsNotEmpty({message: "Obrigatório enviar o dado endDate"})
  @IsDateString({}, {message: "endDate deve ver do tipo string"})
  endDate: Date;

  @IsNotEmpty({ message: "Obrigatório enviar o dado page" })
  @IsNumber({}, { message: "page deve ser um numero" })
  page: number;

  @IsNotEmpty({ message: "Obrigatório enviar o dado limit" })
  @IsNumber({}, { message: "limit deve ser um numero" })
  limit: number;
}
