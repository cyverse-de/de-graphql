const { ApolloServer, gql } = require('apollo-server');
const { 
    Functions, 
    AppsService, 
    UserInfoService,
    DEDatabase,
 } = require('./dataSources');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            functions: new Functions(),
            appsService: new AppsService(),
            userInfoService: new UserInfoService(),
            deDatabase: new DEDatabase(),
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
