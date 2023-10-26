import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "src/common/env";
import { join } from "path";
import { dataSourceOptions } from "src/core/database/data-source";
import { AuthModule } from "src/core/auth/auth.module";
import { DeviceDataModule } from "../device-data/device-data.module";
import { ControllersModule } from "../controllers/controllers.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "..", "public"),
    }),
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceOptions }),
    AuthModule,
    ControllersModule,
    DeviceDataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
