import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class RoleMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
