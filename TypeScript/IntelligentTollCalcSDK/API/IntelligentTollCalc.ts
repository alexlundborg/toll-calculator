// API for Intelligent Toll Calculation SDK

// This file defines the IntelligentTollCalc class, which provides methods for calculating tolls based on time of day, vehicle type, and model provider.

import { TollModel } from '../Core/TollModel';
import { ModelProvider } from '../Core/tollConfig';

export { ModelProvider } from '../Core/tollConfig';

export class IntelligentTollCalc {
    private static tollModel: TollModel = new TollModel();

    // calculate the toll based on the provided parameters
    public static async calculateToll(dateTime: Date, vehicleID: string, vehicleType: string, modelProvider: ModelProvider): Promise<number> {
        return this.tollModel.calculateToll(dateTime, vehicleID, vehicleType, modelProvider);
    }

    // add OpenAI model provider
    public static addOpenAI(apiKey: string): void {
        // Implementation for adding OpenAI model provider will go here
    }

    // add Anthropic model provider
    public static addAnthropic(apiKey: string): void {
        // Implementation for adding Anthropic model provider will go here
    }

    // add Ollama model provider
    public static addOllama(apiKey: string): void {
        // Implementation for adding Ollama model provider will go here
    }
}