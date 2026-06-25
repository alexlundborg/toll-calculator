import { IntelligentTollCalc, ModelProvider } from '../IntelligentTollCalcSDK/API/IntelligentTollCalc';
IntelligentTollCalc.addOpenAI("");
let toll = IntelligentTollCalc.calculateToll(new Date(), "ABC123", "Volvo XC90", ModelProvider.OpenAI);
IntelligentTollCalc.addOllama("");

let tollVolvo = await IntelligentTollCalc.calculateToll(new Date(), "DEF456", "Volvo Amazon",  ModelProvider.Anthropic);

let tollMarsRover = await IntelligentTollCalc.calculateToll(new Date(), "GHI789", "Perserverence Mars Rover",  ModelProvider.Ollama);

let tollNoAIProvider = await IntelligentTollCalc.calculateToll(new Date(), "JKL012", "Perserverence Mars Rover",  ModelProvider.None);
