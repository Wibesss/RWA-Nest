import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { UserEntity } from "../user/user.entity";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt/dist";
import { GameEntity } from "src/game/game.entity";
import { GameModule } from "src/game/game.module";
import { UserModule } from "src/user/user.module";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([GameEntity]),
    GameModule,
    UserModule,
    PassportModule,
    JwtModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    },
    {
      provide: "USER_SERVICE",
      useClass: UserService,
    },
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthModule {}
