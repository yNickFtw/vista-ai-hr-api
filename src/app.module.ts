import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './infra/http/http.module';
import { MessagingModule } from './core/messaging/messaging.module';

@Module({
  imports: [
    HttpModule,
    MessagingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
