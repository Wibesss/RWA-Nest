import { Module } from "@nestjs/common";
import { DeveloperService } from "./developer.service";
import { DeveloperController } from "./developer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeveloperEntity } from "./developer.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([DeveloperEntity]),
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}
