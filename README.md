# Fastify in Typescript with Graphql, Typeorm & Tests

I've been a seasoned and very satisfied user of PHP's [API Platform](https://api-platform.com/) and since I'm still looking for a framework that lets me build APIs equally swiftly, I evaluated a lot of libraries in the JS space. [Fastify](https://www.fastify.io) turned out to be one promising candidate for the foundation. 


Even though it's a much more general purpose framework, it deals with many advantages that API Platform comes with.

After cloning you can test it yourself:
```
yarn
yarn run test
yarn run dev
```

The administrative endpoints are
```
http://localhost:3000/docs
http://localhost:3000/graphql
```


This application demonstrates REST API based persistence based on entity definitions. I defined two entities (Token, Transaction) that relate to each other as one to many. 

It's using
- [TypeORM](https://typeorm.io/#/) as persistence layer (analoguous to DoctrineORM)
- [TypeGraphQL](https://typegraphql.com/) for GraphQL definitions
- [TypeDI](https://www.npmjs.com/package/typedi) for dependency injection (mandatory for TypeGraphQL's ORM resolvers)
- Fastify's JSON schema support and [typebox](https://github.com/sinclairzx81/typebox) for Typescript translation
- [fastify-swagger](https://github.com/fastify/fastify-swagger) to generate a dynamic OpenAPI documentation
- mocha as test runner
- declaration merging for type safety and IDE completion 

## Opinion

There are lesser cobbles on the path to glory when you use API Platform. It's built around Doctrine ORM and JSON-LD and allows you to build complete REST APIs out of simple entity definitions by adding a mere `ApiResource` annotation. 

In this repository's approach you'll still have to define schemas and fastify types along your entity (it's likely possible to infer them by analyzing the entity types but that's not clearly documented).

In this approach it's far more obvious  how to customize things since you're not relying on an opinionated framework. That leads to more boilerplate code but makes you feel much more in control after all.

## execute migrations

gen
yarn run typeorm migration:generate -n initial -f src/config/ormconfig.json

run
yarn run typeorm migration:run -f src/config/ormconfig.json