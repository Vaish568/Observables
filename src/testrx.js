import {
  combineLatest,
  fromEvent,
  merge,
  observable,
  startWith,
  map,
  combineLatestAll,
  takeUntil,
} from "rxjs";
import "./style.css";

const perPersonTotal = document.getElementById("perPersonTotal");
const people = document.getElementById("numberOfPeople");
const incremnet = fromEvent(document.getElementById("increment"), "click").pipe(
  map((v) => {
    console.log(v);
    people.innerText = Number(people.innerText) + 1;
  }),
  startWith(1)
);
const decremnet = fromEvent(document.getElementById("decrement"), "click").pipe(
  map((v) => {
    console.log(v);
    people.innerText = Number(people.innerText) - 1;
  })
);
const billTotal = fromEvent(
  document.getElementById("billTotalInput"),
  "keyup"
).pipe(map((v) => Number(v.target.value)));
const tipTotal = fromEvent(document.getElementById("tipInput"), "keyup").pipe(
  map((v) => Number(v.target.value) / 100)
);

const subscribe = combineLatest(
  [billTotal, tipTotal, incremnet, decremnet],
  (bill, tip) => {
    perPersonTotal.innerText = (
      (bill * tip + bill) /
      Number(people.innerText)
    ).toFixed(2);
    return bill * tip + bill;
  }
);

subscribe.subscribe((v) => console.log(v));
