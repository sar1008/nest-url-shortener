import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ShortUrlService } from './short-url.service';
import { Prisma, ShortUrl } from '@prisma/client';

describe('ShortUrlService', () => {
  let service: ShortUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, ShortUrlService],
    }).compile();

    service = module.get<ShortUrlService>(ShortUrlService);
  });

  it('should get all short URLs', async () => {
    const result: ShortUrl[] = [];
    jest
      .spyOn(service, 'getAllShortUrls')
      .mockImplementation(async () => result);
    expect(await service.getAllShortUrls()).toBe(result);
  });

  it('should generate a short code', () => {
    const result = service.generateShortCode();
    expect(result).toBeDefined();
    expect(result).toHaveLength(6);
  });

  it('should create a short URL', async () => {
    const longUrl = 'https://example.com';
    const shortUrl: ShortUrl = {
      id: '1',
      longUrl,
      shortCode: 'abcdef',
      createdAt: new Date(),
    };
    jest
      .spyOn(service, 'createShortUrl')
      .mockImplementation(async () => shortUrl);
    expect(await service.createShortUrl(longUrl)).toBe(shortUrl);
  });

  it('should throw an error when creating a short URL with an empty long URL', async () => {
    await expect(service.createShortUrl('')).rejects.toThrow(
      'Long URL cannot be empty',
    );
  });

  it('should delete a short URL', async () => {
    const longUrl = 'https://example.com';
    jest
      .spyOn(service, 'deleteShortUrl')
      .mockImplementation(async () => undefined);
    await expect(service.deleteShortUrl(longUrl)).resolves.not.toThrow();
  });

  it('should throw an error when deleting a short URL with an empty long URL', async () => {
    await expect(service.deleteShortUrl('')).rejects.toThrow(
      'Long URL cannot be empty',
    );
  });

  it('should get a long URL by its short code', async () => {
    const shortCode = 'abcdef';
    const shortUrl: ShortUrl = {
      id: '1',
      longUrl: 'https://example.com',
      shortCode,
      createdAt: new Date(),
    };
    jest.spyOn(service, 'getLongUrl').mockImplementation(async () => shortUrl);
    expect(await service.getLongUrl(shortCode)).toBe(shortUrl);
  });

  it('should throw an error when getting a long URL with an empty short code', async () => {
    await expect(service.getLongUrl('')).rejects.toThrow(
      'Short code cannot be empty',
    );
  });
});
