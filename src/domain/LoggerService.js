const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

class LoggerService {
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

    getLog = async (
        name,
        level = "error",
        numberOfLines = 10,
        second = 3600,
        raw = false,
    ) => {
        try {
            const checkLogFilePath = this.checkLogFilePath(name);

            return new Promise((resolve, reject) => {
                const tail = spawn("bash", [
                    "-c",
                    `tail -n ${numberOfLines} ${checkLogFilePath} | jq ${raw ? "-r" : "-c"} 'select(.timestamp > (now - ${second} | strftime("%Y-%m-%dT%H:%M:%S.%3NZ"))) | select(.level == "${level}")'`,
                ]);

                let logData = "";

                tail.stdout.on("data", (data) => {
                    logData += data.toString();
                });

                tail.stderr.on("data", (data) => {
                    console.error(`Tail command error: ${data}`);
                    reject(data.toString());
                });

                tail.on("close", (code) => {
                    if (code !== 0) {
                        console.error(`Tail process exited with code ${code}`);
                        const error = new Error(
                            `Tail process exited with code ${code}`,
                        );
                        reject(error);
                    }
                    resolve(logData);
                });
            });
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };

    logFilePath = (name) => {
        return path.join(this.defaultLogFilePath, `${name}.log`);
    };

    checkLogFilePath = (name) => {
        const logFilePath = this.logFilePath(name);
        if (fs.existsSync(logFilePath)) {
            return logFilePath;
        } else {
            throw new Error(`Log file ${name} does not exist.`);
        }
    };

    appendToLogFile = (logFilePath, logText) => {
        fs.appendFileSync(logFilePath, logText);
    };
}

module.exports = LoggerService;
