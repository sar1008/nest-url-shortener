import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlController } from './short-url/short-url.controller';
import { PrismaService } from './prisma/prisma.service';
import { ShortUrlService } from './short-url/short-url.service';

@Module({
  controllers: [AppController, ShortUrlController],
  providers: [AppService, PrismaService, ShortUrlService],
})
export class AppModule {}
