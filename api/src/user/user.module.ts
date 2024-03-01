import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { JwtModule } from "@nestjs/jwt/dist";
import { GameModule } from "src/game/game.module";
import { ReviewModule } from "src/review/review.module";
import { RatingModule } from "src/rating/rating.module";
import { RoleMiddleware } from "src/middleware/middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    GameModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleMiddleware).forRoutes({
      path: "getGamesforUser/:userId",
      method: RequestMethod.GET,
    });
  }}
