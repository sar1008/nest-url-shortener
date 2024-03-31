import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';
import { ShortUrlResolver } from './short-url.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ShortUrlController],
  providers: [PrismaService, ShortUrlService, ShortUrlResolver],
})
export class ShortUrlModule {}
