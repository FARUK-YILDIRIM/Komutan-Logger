const LoggerService = require("../domain/LoggerService");

class LoggerController {
    // eslint-disable-next-line no-restricted-syntax
    constructor() {
        this.LoggerService = new LoggerService();
    }

    addLog = (request, reply) => {
        const { name, data, level } = request.body;
        const result = this.LoggerService.addLog(name, data, level);
        reply.code(result.success ? 201 : 500).send(result);
    };

    getLog = async (request, reply) => {
        const { name, level, lines, second, raw } = request.query;
        const result = await this.LoggerService.getLog(
            name,
            level,
            lines,
            second,
            raw,
        );
        reply.code(200).send(result);
    };
}

module.exports = LoggerController;
