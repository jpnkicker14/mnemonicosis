export class Utils {
  public static getRand(min: number, max: number): number {
    return Math.floor((Math.random()) * (max - min)) + min;
  }
}
