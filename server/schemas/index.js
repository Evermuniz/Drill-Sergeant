// initialize typeDefs and resolvers and export them for use in server.js
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };
