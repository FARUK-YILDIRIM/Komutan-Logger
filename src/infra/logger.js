const fastify = require("fastify")();
const dotenv = require("dotenv");
const { logRoutes } = require("../routes");

dotenv.config();

logRoutes.forEach((route) => {
    fastify.route(route);
});

const PORT = process.env.PORT || 3000;
fastify.listen(PORT, (err, address) => {
    if (err) {
        console.error(err);
        throw new Error(err);
    }
    console.warn(`An object is approaching, sir. ${address}`);
});
