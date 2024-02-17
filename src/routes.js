const LogController = require("./controllers/logController");

const logController = new LogController();

const logRoutes = [
    {
        method: "POST",
        url: "/log",
        schema: {
            body: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    data: { type: ["string", "object"] },
                    level: {
                        type: "string",
                        enum: ["error", "warn", "info", "debug", "trace"],
                    },
                },
                required: ["name", "data"],
            },
        },
        handler: logController.addLog.bind(logController),
    },
    {
        method: "GET",
        url: "/log",
        schema: {
            querystring: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    level: {
                        type: "string",
                        enum: ["error", "warn", "info", "debug", "trace"],
                    },
                    lines: { type: "number" },
                    raw: { type: "boolean" },
                },
                required: ["name"],
            },
        },
        handler: logController.getLog.bind(logController),
    },
];

module.exports = { logRoutes };
