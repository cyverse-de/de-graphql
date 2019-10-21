const { ApolloServer, gql } = require('apollo-server');
const { 
    FunctionAPI, 
    AppsAPI, 
    UserInfoAPI,
    PGDataSource,
 } = require('./dataSources');
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            functionAPI: new FunctionAPI(),
            appsAPI: new AppsAPI(),
            userInfoAPI: new UserInfoAPI(),
            pgAPI: new PGDataSource(),
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
