// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Adjust the path to your UsersModule
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Access the secret from environment variables
        signOptions: { expiresIn: '1h' }, // Example expiration time
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    UsersModule, // Import and include UsersModule here
    ConfigModule.forRoot(), // Import and include ConfigModule
  ],
  providers: [AuthService, JwtStrategy, ConfigService], // Include ConfigService in providers
  exports: [AuthService],
  controllers:  [AuthController],
})
export class AuthModule {}
