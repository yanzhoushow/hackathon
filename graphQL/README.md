### Why GraphQL
- Better than REST?
  - https://www.howtographql.com/basics/1-graphql-is-the-better-rest/

### GraphQL
- GraphQL is a specification typically used for remote client-server communications. 
- Unlike SQL, GraphQL is agnostic to the data source(s) used to retrieve data and persist changes
- Resolver
  - aribtrary functions to access and manipulate data. 
- GraphQL coordinates and aggregates the data from these resolver functions, then returns result to the client. 
  - Generally, resolver functions should delegate to business logic layer responsible for communicating with various underlying data sources. 
  - These data sources could be remote APIs, databases, local cache, and nearly anything else your programming language can access.
  
### GraphQL vs REST
- both handle APIs and can serve similar purposes from a business perspective.
- GraphQL is considered an alternative to REST, not a replacement.
- GraphQL and REST can co-exist in stack. 
  - Example: abstract REST APIs behind a GraphQL server. Mask REST endpoints into a GraphQL endpoint using root resolvers.

