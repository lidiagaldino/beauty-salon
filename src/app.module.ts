import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { StatusModule } from './modules/status/status.module';
import { ClientsModule } from './modules/clients/clients.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    CategoriesModule,
    StatusModule,
    ClientsModule,
    ProfessionalsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
