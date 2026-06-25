// non streaming API client for local Anthropic model provider without API key
// This client is used to send car type to Anthropic model and get back a boolean value for whether the car is a Volvo or not.

import { IModelClient } from "./ModelClient";
import { AnthropicClient as AnthropicSDKClient } from "@anthropic-ai/sdk";

export class AnthropicClient implements IModelClient {
    async isVolvo(carType: string): Promise<boolean> {
        return AnthropicClient.isVolvo(carType);
    }

    // send car type to Anthropic model and get back a boolean value for whether the car is known to be a Volvo or not
    public static async isVolvo(carType: string): Promise<boolean> {
        if (!carType) {
            return false;
        }

        const client = new AnthropicSDKClient();
        // Implementation for sending car type to Anthropic model and getting back a boolean value will go here
        // For now, we will just return false as a placeholder
        return false;
    }
}