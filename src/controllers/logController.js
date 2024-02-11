const LogService = require("../services/logService");

class LogController {
    // eslint-disable-next-line no-restricted-syntax
    constructor() {
        this.logService = new LogService();
    }

    addLog = (request, reply) => {
        const { name, data, level } = request.body;
        const result = this.logService.addLog(name, data, level);
        reply.code(result.success ? 201 : 500).send(result);
    };
}

module.exports = LogController;
