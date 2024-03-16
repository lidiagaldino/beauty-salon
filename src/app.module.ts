import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [CategoriesModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
