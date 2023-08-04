# Next.js Authentication Boilerplate

### Next.js JWT Authentication Boilerplate with edge middleware and serverless api routes, deployed to Vercel.

## Description

Boilerplate with JWT authentication, edge middleware and serverless api routes.

Built with NextJS, Typescript, Prisma, PostgreSQL and Tailwind

-- [Deployed to Vercel, open app.](https://nextjs-fullstack-auth-boilerplate.vercel.app/)

## Requirements

`Node 18.x`
`npm 8.x or npm 9.x`

## Installation

Clone the repo:

```shell
git clone git@github.com:scottjason/nextjs-authentication-boilerplate.git
```

Then cd into the root directory and run `npm install`.

Next, add a `.env` file to the root directory, then copy and paste the following and replace the values:

```shell
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-postgres-db-url
BCRYPT_PASSWORD=your-bycrpt-password
```

Next run `prisma generate` to generate the Prisma Client based on the schema under the `/prisma` directory. Then to create a migration and synch the schema with the database, run `npx prisma migrate dev`.

To apply the migrations to testing and production environments, run `npx prisma migrate deploy`, ideally as part of an automated CI/CD pipeline. Read more at [prisma.io.](https://www.prisma.io/docs/guides/deployment)

Next run `npm run dev` to start development and open up your browser to `http://locahost:3000`.

To build the production bundle, run `npm run build`.

## License

MIT License

Copyright (c) 2023 Scott Jason

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
