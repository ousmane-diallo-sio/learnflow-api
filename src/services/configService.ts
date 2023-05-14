class ConfigService {
    JWT_SECRET: string | undefined;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
}

export default new ConfigService()