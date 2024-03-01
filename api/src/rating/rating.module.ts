import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { RatingController } from "./rating.controller";
import { GameModule } from "src/game/game.module";
import { UserModule } from "src/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingEntity } from "./rating.entity";
import { JwtModule } from "@nestjs/jwt";
import { RoleMiddleware } from "src/middleware/middleware";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [
    GameModule,
    UserModule,
    TypeOrmModule.forFeature([RatingEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService],
})
export class RatingModule {}
