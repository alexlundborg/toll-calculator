export type TollLimits = {
    minimum: number;
    maximum: number;
}

export type RushHour = number[];

export type TollConfig = {
    tollLimits: TollLimits;
    rushHour: RushHour;
}

export const OfficialHolidays: Date[] = [
    new Date('01-01'), // New Year's Day
    new Date('12-24'), // Christmas Eve
];

export const DefaultTollConfig: TollConfig = {
    tollLimits: {
        minimum: 8,
        maximum: 18
    },
    rushHour: [7, 8, 9, 16, 17, 18]
}

// Enum for model providers
export enum ModelProvider {
    OpenAI = "OpenAI",
    Anthropic = "Anthropic",
    Ollama = "Ollama",
    None = "None"
}