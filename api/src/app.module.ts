import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { GameModule } from "./game/game.module";
import { ReviewModule } from "./review/review.module";
import { DeveloperModule } from "./developer/developer.module";
import { RatingModule } from "./rating/rating.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "10h" },
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    GameModule,
    ReviewModule,
    DeveloperModule,
    RatingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
