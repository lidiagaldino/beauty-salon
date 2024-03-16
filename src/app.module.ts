import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { StatusModule } from './modules/status/status.module';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [CategoriesModule, StatusModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
