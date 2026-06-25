// interface for the ModelClient class that defines the methods that must be implemented by any model client
export interface IModelClient {
    isVolvo(carType: string): Promise<boolean>;
}