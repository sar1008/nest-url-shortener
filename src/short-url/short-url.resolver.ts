import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ShortUrlService } from './short-url.service';

@Resolver()
export class ShortUrlResolver {
  constructor(private shortUrlService: ShortUrlService) {}

  // This query returns all the short codes in the system.
  @Query(() => [String])
  async getAllShortUrls(): Promise<string[]> {
    const urls = await this.shortUrlService.getAllShortUrls();
    return urls.map((url) => url.shortCode);
  }

  // This query takes a short code and returns the corresponding long URL.
  @Query(() => String)
  async resolveShortUrl(@Args('shortCode') shortCode: string): Promise<string> {
    const url = await this.shortUrlService.getLongUrl(shortCode);
    return url.longUrl;
  }

  // This mutation takes a long URL and returns a short code for it.
  @Mutation(() => String)
  async shortenUrl(@Args('longUrl') longUrl: string): Promise<string> {
    const shortUrl = await this.shortUrlService.createShortUrl(longUrl);
    return shortUrl.shortCode;
  }

  //  This mutation deletes a short URL.
  @Mutation(() => String)
  async deleteShortUrl(@Args('longUrl') longUrl: string): Promise<string> {
    await this.shortUrlService.deleteShortUrl(longUrl);
    return 'URL deleted successfully';
  }
}
