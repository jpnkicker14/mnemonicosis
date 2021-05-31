import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Utils} from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  readonly spectators: Array<string> = ["Mary", "Patricia", "Jennifer", "Elizabeth", "Linda", "Barbara", "Susan",
    "Jessica", "Margaret", "Sarah", "Karen", "Nancy", "Betty", "Lisa", "Dorothy", "Sandra", "Ashley",
    "Kimberly", "Donna", "Carol", "Michelle", "Emily", "Amanda", "Helen", "Melissa", "Deborah", "Stephanie",
    "Laura", "Rebecca", "Sharon", "Cynthia", "Kathleen", "Amy", "Shirley", "Anna", "Angela", "Ruth", "Brenda",
    "Pamela", "Nicole", "Katherine", "Virginia", "Catherine", "Christine", "Samantha", "Debra", "Janet", "Rachel",
    "Carolyn", "Emma", "Maria", "Heather", "Diane", "Julie", "Joyce", "Evelyn", "Frances", "Joan", "Christina",
    "Kelly", "Victoria", "Lauren", "Martha", "Judith", "Cheryl", "Megan", "Andrea", "Ann", "Alice", "Jean", "Doris",
    "Jacqueline", "Kathryn", "Hannah", "Olivia", "Gloria", "Marie", "Teresa", "Sara", "Janice", "Julia", "Grace",
    "Judy", "Theresa", "Rose", "Beverly", "Denise", "Marilyn", "Amber", "Madison", "Danielle", "Brittany", "Diana",
    "Abigail", "Jane", "Natalie", "Lori", "Tiffany", "Alexis", "Kayla", "James", "John", "Robert", "Michael",
    "William", "David", "Richard", "Joseph", "Thomas", "Charles", "Christopher", "Daniel", "Matthew", "Anthony",
    "Donald", "Mark", "Paul", "Steven", "Andrew", "Kenneth", "George", "Joshua", "Kevin", "Brian", "Edward", "Ronald",
    "Timothy", "Jason", "Jeffrey", "Ryan", "Gary", "Jacob", "Nicholas", "Eric", "Stephen", "Jonathan", "Larry",
    "Justin", "Scott", "Frank", "Brandon", "Raymond", "Gregory", "Benjamin", "Samuel", "Patrick", "Alexander",
    "Jack", "Dennis", "Jerry", "Tyler", "Aaron", "Henry", "Douglas", "Jose", "Peter", "Adam", "Zachary", "Nathan",
    "Walter", "Harold", "Kyle", "Carl", "Arthur", "Gerald", "Roger", "Keith", "Jeremy", "Terry", "Lawrence", "Sean",
    "Christian", "Albert", "Joe", "Ethan", "Austin", "Jesse", "Willie", "Billy", "Bryan", "Bruce", "Jordan", "Ralph",
    "Roy", "Noah", "Dylan", "Eugene", "Wayne", "Alan", "Juan", "Louis", "Russell", "Gabriel", "Randy", "Philip", "Harry",
    "Vincent", "Bobby", "Johnny", "Logan"];

  constructor(private http: HttpClient) {
  }

  getName(): Observable<string> {
    let params = new HttpParams()
      .set('count', '1')
      .set('with_surname', 'false')
      .set('frequency', 'all');
    return this.http.get<Array<string>>(`https://namey.muffinlabs.com/name.json`, {params: params})
      .pipe(
        map((names: Array<string>) => names[0]),
        catchError((err: HttpErrorResponse) => {
          console.error(err);
          // swallow error and return random
          const name = this.spectators[Utils.getRand(0, this.spectators.length-1)];
          return of(name);
        })
      )
  }
}
