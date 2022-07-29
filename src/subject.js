import {
  Subject,
  map,
  of,
  Observable,
  from,
  BehaviorSubject,
  ReplaySubject,
} from "rxjs";
import { ajax } from "rxjs/ajax";

console.log("subject folder is bundled");
const subject = new Subject();
//subscriber 1:
subject.subscribe((data) => console.log(data));
//subscriber 2:
subject.subscribe((data) => console.log(data));

// subject.next(Math.random());
// subject.next(Math.random());

// const observable = new Observable((obbs) => obbs.next(Math.random()));

// const observable = ajax.getJSON("https://jsonplaceholder.typicode.com/users");

const observable = from([1, 2, 3]);

observable.subscribe(subject);
observable.subscribe(subject);

//Behaviour subject

const bsubject = new BehaviorSubject(10);
bsubject.subscribe((v) => console.log(v));
bsubject.next(115);
bsubject.next(123);
bsubject.subscribe((v) => console.log(v));

//Replaysubject
// the value we pass inside the constructor is number of values we want to be
//buffered to the new subscriber
const rsubject = new ReplaySubject(2);
rsubject.next("Hello ...");
rsubject.next("Evryone");
rsubject.next("Stay calm");

rsubject.subscribe((V) => console.log("this is 1: ", V));

rsubject.next("NEw subscriber");
rsubject.subscribe((V) => console.log("this is 2: ", V));
