import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      secret:
        '77cc6d8fc3a76bbdd00ec3e3260ff9126dfa14a00b03f9fffe801976369b9f10656011eda565ccdb8ce01b1ea7e6ff3a3468aeeddc5d4d15a5a71bb09e73c043', // Clé secrète pour JWT
      signOptions: { expiresIn: '1d' }, // Durée de validité du token
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard], // Export du garde JWT pour l'utiliser dans d'autres modules
})
export class AuthModule {}
