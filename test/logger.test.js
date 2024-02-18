/* eslint-disable */
const fastify = require("fastify")({ logger: true });
const { logRoutes } = require("../src/routes");
const request = require("supertest");

describe("Test Logger", () => {
    beforeAll(async () => {
        logRoutes.forEach((route) => {
            fastify.route(route);
        });
        await fastify.listen(12721);
    });

    afterAll(async () => {
        await fastify.close();
    });

    test("POST /log endpoint should add a log record successfully", async () => {
        const logData = {
            name: "TestLog",
            data: "Test data",
            level: "info",
        };

        const response = await request(fastify.server)
            .post("/log")
            .send(logData);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            success: true,
            message: "Log record added successfully",
        });
    });
});
