// non streaming API client for local OpenAI model provider without API key
// This client is used to send car type to OpenAI model and get back a boolean value for whether the car is a Volvo or not.

import { IModelClient } from "./ModelClient";

export class OpenAIClient implements IModelClient {
    isVolvo(carType: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    // send car type to OpenAI model and get back a boolean value for whether the car is known to be a Volvo or not
    public static async isVolvo(carType: string): Promise<boolean> {
        // Implementation for sending car type to OpenAI model and getting back a boolean value will go here
        // For now, we will just return false as a placeholder
        return false;
    }
}