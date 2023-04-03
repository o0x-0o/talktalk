import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";

import { schema, resolvers } from "./schema";

const app = express();
const port = process.env.APP_PORT || 5880;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: resolvers,
		graphiql: true
	})
);

app.get("/", (_req, resp) => {
	resp.send({});
});

app.listen(port, () => {
	console.log(`Rodando servidor em http://localhost:${port}`);
});
