import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    ShortUrlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // This will generate the schema.gql file automatically
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
