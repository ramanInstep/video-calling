import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/types/combinedTypes';
import resolvers from './graphql/resolvers/combinedResolvers';
import models from './models';
import { port } from './config';
import { getUser } from './utils';
import CapitalizeDirective, { FormattableDateDirective } from './graphql/directives';
const mongoose = require('mongoose');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    capitalize: CapitalizeDirective,
    date: FormattableDateDirective,
  },

  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    return {
      authScope: await getUser(req.headers.authorization),
      models,
    };
  },
  subscriptions: {
    onConnect: () => console.log('Connected to websocket....../n'),
  },
  tracing: true,
});

const app = express();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@merakidb.cikbc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
      console.log(`Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
    });
  })
  .catch(err => {
    console.log(err);
  });


