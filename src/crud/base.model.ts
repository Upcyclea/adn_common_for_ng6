/**
 * Created by aleksandr on 2.05.17.
 */

export abstract class BaseModel {

  /**
   * create new instance
   * @param data
   */
  constructor(data?:any) {
    if(data) {
      this.set(data);
    }
  }

  /**
   * return list of fields to work with model
   */
  public abstract fields():string[];

  /**
   * set data to model
   * @param data
   * @returns {ActiveRecord}
   */
  set(data:any) {
    try {
      let dataValues = this.extractData(typeof data === 'string' ? JSON.parse(data) : data);
      Object.keys(dataValues).forEach((key) => {
        (<any>this)[key] = dataValues[key];
      });
    } catch(e) {
      console.error(e);
    }
    return this;
  }

  /**
   * extract data filtred by fields from model or given JSON
   * @param data
   * @returns {any}
   */
  extractData(data:any):any {
    let json:any = {};
    this.fields().forEach((field) => {
      if(data.hasOwnProperty(field)) {
        json[field] = data[field];
      }
    });
    return json;
  }

  /**
   * convert Model to JSON object
   * @returns {any}
   */
  toJSON():any {
    return this.extractData(<any>this);
  }
}
