import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";
import { ReviewEntity } from "./review.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameModule } from "src/game/game.module";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";
import { RoleMiddleware } from "src/middleware/middleware";

@Module({
  imports: [
    GameModule,
    UserModule,
    TypeOrmModule.forFeature([ReviewEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
