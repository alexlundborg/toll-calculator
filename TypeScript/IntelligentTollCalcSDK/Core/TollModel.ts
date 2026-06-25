import { DefaultTollConfig, OfficialHolidays, RushHour, TollLimits, ModelProvider } from './tollConfig';
import TollCache from '../Data/TollCache';
import { IModelClient } from '../Clients/ModelClient';


export class TollModel {

    private modelClients: { [key in ModelProvider]?: IModelClient } = {};

    public registerModelClient(modelProvider: ModelProvider, modelClient: IModelClient): void {
        this.modelClients[modelProvider] = modelClient;
    }

    // create a singleton instance of TollCache to store issued tolls
    private static tollCache: TollCache = new TollCache();

    // return range from 0 to 1 based on the time of day using a cosine function
    private fromTimeOfDayToTollToNormalizedValueUsingCosine(timeOfDay: Date): number {
        const hours = timeOfDay.getHours();
        const normalizedValue = (Math.cos((hours / 24) * 2 * Math.PI) + 1) / 2;
        return normalizedValue;
    }

    // return range from 0 to 1 based on the time of day using a sine function
    private fromTimeOfDayToTollToNormalizedValueUsingSine(timeOfDay: Date): number {
        const hours = timeOfDay.getHours();
        const normalizedValue = (Math.sin((hours / 24) * 2 * Math.PI) + 1) / 2;
        return normalizedValue;
    }

    // scale the normalized value to the toll limits
    private fromNormalizedValueToToll(normalizedValue: number, tollLimits: TollLimits, rushHour: RushHour): number {
        const scaledValue = normalizedValue * (tollLimits.maximum - tollLimits.minimum) + tollLimits.minimum;
        return scaledValue;
    }

    // adjust the toll based on rush hour
    private takeRushHourIntoAccount(toll: number, timeOfDay: Date, rushHour: RushHour, maximumToll: number): number {
        const hours = timeOfDay.getHours();
        if (rushHour.includes(hours)) {
            return maximumToll; // use maximum toll during rush hour
        }
        return toll;
    }

    // calculate and return the toll based on the time of day, vehicle type, and model provider
    public async calculateToll(dateTime: Date, vehicleID: string, vehicleType: string, modelProvider: ModelProvider): Promise<number> {
        // check if dateTime is a weekend or holiday, if so return 0
        if (dateTime.getDay() === 0 || dateTime.getDay() === 6) {
            return 0;
        }
        
    // check if dateTime is an official holiday, if so return 0
        for (const holiday of OfficialHolidays) {
            if (dateTime.getMonth() === holiday.getMonth() &&
                dateTime.getDate() === holiday.getDate()) {
                return 0;
            }
        }

        let cachedToll = TollModel.tollCache.getToll(vehicleID, dateTime.getHours());
        if (cachedToll !== undefined) {
            return 0; // return 0 if toll is already issued for this vehicle and hour
        }


        if (vehicleType.toLowerCase().includes("volvo")) {
            return 0;
        }

        // check if vehicle is a Volvo using the model provider
        let modelClient: IModelClient;
        if (this.modelClients[modelProvider]) {
            modelClient = this.modelClients[modelProvider]!;
            if (await modelClient.isVolvo(vehicleType)) {
                return 0;
            }
        }

        // let normalizedValue = this.fromTimeOfDayToTollToNormalizedValueUsingCosine(dateTime);
        let normalizedValue = this.fromTimeOfDayToTollToNormalizedValueUsingSine(dateTime);
        
        let preRushHourAdjustedToll = this.fromNormalizedValueToToll(normalizedValue, DefaultTollConfig.tollLimits, DefaultTollConfig.rushHour);
        let adjustedToll = this.takeRushHourIntoAccount(preRushHourAdjustedToll, dateTime, DefaultTollConfig.rushHour, DefaultTollConfig.tollLimits.maximum);

        TollModel.tollCache.setToll(vehicleID, dateTime.getHours(), adjustedToll);

        return adjustedToll;
    }
}
