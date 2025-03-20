import { ApolloServer } from '@apollo/server';
import { ApolloGateway }  from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';

async function main() {
  const supergraphSdl = readFileSync('./supergraph.graphql').toString();
  const gateway = new ApolloGateway({ supergraphSdl });
  const server = new ApolloServer({ gateway });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
  });
  
  console.log(`🚀  Server ready at ${url}`);
}

main().catch(console.error)