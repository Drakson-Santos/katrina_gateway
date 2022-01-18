const Redis = require("ioredis");

export class Cache {
    public redis: any;
    
    constructor() {
        this.redis = new Redis({
            host: "localhost",
            port: 6379,
            keyPrefix: "cache:",
        });
    }

    async get(key: string) {
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }

    set(key: string, value: any, ttl: number = 60) {
       return this.redis.set(key, JSON.stringify(value), "EX", ttl); 
    }

    del(key: string) {
        return this.redis.del(key);
    }
    
    async delPrefix(prefix: string): Promise<any> {
        const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key: string) => {
            key.replace(`cache:`, "")
        });
        return this.redis.del(keys);
    }
}