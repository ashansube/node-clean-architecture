import express from 'express';
const helmet = require("helmet");

const server = express();
server.use(express.json());
server.use(helmet());

export default server