import {
  Controller,
  Get,
  Post,
  Delete,
  Redirect,
  Param,
  Body,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @Get()
  async getAllShortUrls() {
    const urls = await this.shortUrlService.getAllShortUrls();
    return urls;
  }

  @Post()
  async createShortUrl(@Body('longUrl') longUrl: string) {
    const shortUrl = await this.shortUrlService.createShortUrl(longUrl);
    return shortUrl;
  }

  @Get(':code')
  @Redirect()
  async redirectToLongUrl(@Param('code') code: string) {
    const url = await this.shortUrlService.getLongUrl(code);
    if (url) {
      return { url: url.longUrl, statusCode: 302 };
    } else {
      return { url: '/not-found', statusCode: 302 };
    }
  }

  @Delete(':longUrl')
  async deleteShortUrl(@Param('longUrl') longUrl: string) {
    const result = await this.shortUrlService.deleteShortUrl(longUrl);
    return result;
  }
}
