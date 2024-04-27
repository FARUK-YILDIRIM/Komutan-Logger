class Timestamp {
    // eslint-disable-next-line no-restricted-syntax
    constructor() {
        this.timeZone = process.env.TIMEZONE || "UTC";
    }

    get = () => {
        const now = new Date();
        const timestamp = now
            .toLocaleString("sv", {
                timeZone: this.timeZone,
                timeZoneName: "short",
            })
            .replace(" ", "T");
        return timestamp;
    };
}

module.exports = Timestamp;
