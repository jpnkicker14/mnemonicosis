import {Stack} from '../stack';
import {Card} from '../card';
import {CardValue} from '../enums/card-value.enum';
import {Suit} from '../enums/suit.enum';
import {StackGroup} from '../enums/stack-group.enum';
import {NaturalEnum} from '../enums/natural.enum';

// todo natural (maybe not here)
export const aronson = new Stack(
  'aronson',
  'Aronson',
  StackGroup.Memorized,
  [
    new Card(CardValue.jack, Suit.spades, 1),
    new Card(CardValue.king, Suit.clubs, 2),
    new Card(CardValue.five, Suit.clubs, 3),
    new Card(CardValue.two, Suit.hearts, 4),
    new Card(CardValue.nine, Suit.spades, 5),
    new Card(CardValue.ace, Suit.spades, 6),
    new Card(CardValue.three, Suit.hearts, 7),
    new Card(CardValue.six, Suit.clubs, 8),
    new Card(CardValue.eight, Suit.diamonds, 9),
    new Card(CardValue.ace, Suit.clubs, 10, [NaturalEnum.speller]),
    new Card(CardValue.ten, Suit.spades, 11, [NaturalEnum.speller]),
    new Card(CardValue.five, Suit.hearts, 12, [NaturalEnum.speller]),
    new Card(CardValue.two, Suit.diamonds, 13, [NaturalEnum.speller]),
    new Card(CardValue.king, Suit.diamonds, 14, [NaturalEnum.speller]),
    new Card(CardValue.seven, Suit.diamonds, 15, [NaturalEnum.speller]),
    new Card(CardValue.eight, Suit.clubs, 16),
    new Card(CardValue.three, Suit.spades, 17),
    new Card(CardValue.ace, Suit.diamonds, 18),
    new Card(CardValue.seven, Suit.spades, 19),
    new Card(CardValue.five, Suit.spades, 20),
    new Card(CardValue.queen, Suit.diamonds, 21),
    new Card(CardValue.ace, Suit.hearts, 22),
    new Card(CardValue.eight, Suit.spades, 23),
    new Card(CardValue.three, Suit.diamonds, 24),
    new Card(CardValue.seven, Suit.hearts, 25),
    new Card(CardValue.queen, Suit.hearts, 26),
    new Card(CardValue.five, Suit.diamonds, 27),
    new Card(CardValue.seven, Suit.clubs, 28),
    new Card(CardValue.four, Suit.hearts, 29),
    new Card(CardValue.king, Suit.hearts, 30),
    new Card(CardValue.four, Suit.diamonds, 31),
    new Card(CardValue.ten, Suit.diamonds, 32),
    new Card(CardValue.jack, Suit.clubs, 33),
    new Card(CardValue.jack, Suit.hearts, 34),
    new Card(CardValue.ten, Suit.clubs, 35),
    new Card(CardValue.jack, Suit.diamonds, 36),
    new Card(CardValue.four, Suit.spades, 37),
    new Card(CardValue.ten, Suit.hearts, 38),
    new Card(CardValue.six, Suit.hearts, 39),
    new Card(CardValue.three, Suit.clubs, 40),
    new Card(CardValue.two, Suit.spades, 41),
    new Card(CardValue.nine, Suit.hearts, 42),
    new Card(CardValue.king, Suit.spades, 43),
    new Card(CardValue.six, Suit.spades, 44),
    new Card(CardValue.four, Suit.clubs, 45),
    new Card(CardValue.eight, Suit.hearts, 46),
    new Card(CardValue.nine, Suit.clubs, 47),
    new Card(CardValue.queen, Suit.spades, 48),
    new Card(CardValue.six, Suit.diamonds, 49),
    new Card(CardValue.queen, Suit.clubs, 50),
    new Card(CardValue.two, Suit.clubs, 51),
    new Card(CardValue.nine, Suit.diamonds, 52)
  ]
)
