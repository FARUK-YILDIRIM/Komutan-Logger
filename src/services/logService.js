const fs = require("fs");
const path = require("path");

class LogService {
    // eslint-disable-next-line no-restricted-syntax
    constructor() {
        this.defaultLogFilePath = path.join(__dirname, "../..", "records");
    }

    addLog = (name, data, level = "info") => {
        try {
            const logFilePath = this.logFilePath(name);
            const timestamp = new Date().toISOString();
            const logEntry = { level, timestamp, name, data };
            const logText = JSON.stringify(logEntry) + "\n";

            this.appendToLogFile(logFilePath, logText);

            return {
                success: true,
                message: "Log record added successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: error,
            };
        }
    };

    logFilePath = (name) => {
        return path.join(this.defaultLogFilePath, `${name}.log`);
    };

    appendToLogFile = (logFilePath, logText) => {
        fs.appendFileSync(logFilePath, logText);
    };
}

module.exports = LogService;
