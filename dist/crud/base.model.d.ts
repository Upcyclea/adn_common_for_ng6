export declare abstract class BaseModel {
    constructor(data?: any);
    abstract fields(): string[];
    set(data: any): this;
    extractData(data: any): any;
    toJSON(): any;
}
