class ConfigService {
    JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET ?? "secret";
    }
}

export default new ConfigService()