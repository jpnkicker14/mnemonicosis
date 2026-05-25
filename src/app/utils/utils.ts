import { Card } from "../services/stacks/card";

export class Utils {
  public static getRand(min: number, max: number): number {
    return Math.floor((Math.random()) * (max - min)) + min;
  }

  public static shuffle(cards: any[]) {
    const cardsCopy = [...cards];
    let currentIndex = cardsCopy.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [cardsCopy[currentIndex], cardsCopy[randomIndex]] = [
        cardsCopy[randomIndex], cardsCopy[currentIndex]];
    }
  
    return cardsCopy;
  }
}
