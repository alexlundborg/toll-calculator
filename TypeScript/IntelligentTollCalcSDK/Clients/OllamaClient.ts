// non streaming API client for local Ollama model provider without API key
// This client is used to send car type to Ollama model and get back a boolean value for whether the car is a Volvo or not.

import { IModelClient } from "./ModelClient";

export class OllamaClient implements IModelClient {
    async isVolvo(carType: string): Promise<boolean> {
        return OllamaClient.isVolvoStatic(carType);         
    }

    // send car type to Ollama model and get back a boolean value for whether the car is known to be a Volvo or not
    public static async isVolvoStatic(carType: string): Promise<boolean> {
        const normalizedType = carType.toLowerCase().trim();
        
        try {
            const response = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama2",
                    prompt: `Is "${normalizedType}" a Volvo car model? Answer with only "yes" or "no".`,
                    stream: false,
                }),
            });

            if (!response.ok) {
                console.error("Ollama API error:", response.statusText);
                return false;
            }

            const data = await response.json();
            const result = data.response?.toLowerCase().includes("yes") ?? false;
            return result;
        } catch (error) {
            console.error("Error calling Ollama API:", error);
            return false;
        }
    }
}