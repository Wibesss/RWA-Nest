import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { ReviewModule } from "src/review/review.module";
import { JwtModule } from "@nestjs/jwt";
import { DeveloperModule } from "src/developer/developer.module";
import { RoleMiddleware } from "src/middleware/middleware";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [
    DeveloperModule,
    TypeOrmModule.forFeature([GameEntity]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [GameService],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {
}
