# URL Shortener

This is a URL shortener service built with NestJS, Prisma, and GraphQL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn
- PostgreSQL

### Installing

1. Clone the repository
2. Install dependencies with `yarn install`
3. Set up your PostgreSQL database and update the connection details in `prisma/schema.prisma`
4. Run `yarn prisma migrate dev` to run migrations
5. Start the server with `yarn start:dev`

## Running the tests

Run `yarn test` to execute the unit tests via [Jest](https://jestjs.io).

## Built With

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [GraphQL](https://graphql.org/) - A query language for APIs.