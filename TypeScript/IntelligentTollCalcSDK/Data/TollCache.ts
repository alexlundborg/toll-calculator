
// uses a hash map to store issued tolls based on license plate and timestamp
class TollCache {
    private cache: Map<string, number>;

    constructor() {
        this.cache = new Map<string, number>();
    }

    // generate a unique key based on license plate and timestamp
    private generateKey(licensePlate: string, timestamp: number): string {
        return `${licensePlate}_${timestamp}`;
    }
    
    // store the toll in the cache
    public setToll(licensePlate: string, timestamp: number, toll: number): void {
        const key = this.generateKey(licensePlate, timestamp);
        this.cache.set(key, toll);
    }

    // retrieve the toll from the cache
    public getToll(licensePlate: string, timestamp: number): number | undefined {
        const key = this.generateKey(licensePlate, timestamp);
        return this.cache.get(key);
    }
}

export default TollCache;