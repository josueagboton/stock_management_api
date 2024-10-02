/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement accessibles globalement
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql', // Type de la base de données
    //     host: configService.get<string>('DATABASE_HOST'),
    //     port: configService.get<number>('DATABASE_PORT'),
    //     username: configService.get<string>('DATABASE_USERNAME'),
    //     password: configService.get<string>('DATABASE_PASSWORD') || '', // Remplacer null par '' si pas de mot de passe
    //     database: configService.get<string>('DATABASE_DATABASE'),
    //     entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Assure-toi que les entités sont bien référencées
    //     synchronize: true, // Synchronise les schémas, à utiliser uniquement en dev
    //   }),
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'stockmanagment',
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserEntity],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
