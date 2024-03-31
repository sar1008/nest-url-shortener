import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ShortUrl } from '@prisma/client';

@Injectable()
export class ShortUrlService {
  constructor(private prisma: PrismaService) {}

  // Method to get all short URLs.
  async getAllShortUrls(): Promise<ShortUrl[]> {
    return this.prisma.shortUrl.findMany();
  }

  // Method to generate a unique short code.
  generateShortCode(): string {
    // Simple example: Generate a random 6-character string
    // For a more robust implementation, consider checking for uniqueness
    return Math.random().toString(36).substring(2, 8);
  }

  // Method to create a short code for a long URL.
  async createShortUrl(longUrl: string): Promise<ShortUrl> {
    if (!longUrl) {
      throw new BadRequestException('Long URL cannot be empty');
    }

    // Check if the longUrl has already been used
    const existingUrl = await this.prisma.shortUrl.findFirst({
      where: { longUrl },
    });

    if (existingUrl) {
      throw new BadRequestException('Long URL has already been shortened');
    }

    const shortCode = this.generateShortCode();
    const shortUrl = await this.prisma.shortUrl.create({
      data: {
        longUrl,
        shortCode,
      },
    });
    return shortUrl;
  }

  // Method to delete short URL.
  async deleteShortUrl(longUrl: string): Promise<void> {
    if (!longUrl) {
      throw new BadRequestException('Long URL cannot be empty');
    }

    const existingUrl = await this.prisma.shortUrl.findFirst({
      where: { longUrl },
    });

    if (!existingUrl) {
      throw new NotFoundException('Long URL not found');
    }

    await this.prisma.shortUrl.delete({
      where: { id: existingUrl.id },
    });
  }

  // Method to find a long URL by its short code.
  async getLongUrl(shortCode: string): Promise<ShortUrl> {
    if (!shortCode) {
      throw new BadRequestException('Short code cannot be empty');
    }

    const url = await this.prisma.shortUrl.findUnique({
      where: { shortCode },
    });

    if (!url) {
      throw new NotFoundException('Short code not found');
    }

    return url;
  }
}
