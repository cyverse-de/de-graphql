const { ApolloServer, gql } = require('apollo-server');
const { FunctionAPI, AppsAPI, UserInfoAPI } = require('./dataSources');
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
        };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
