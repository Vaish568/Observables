import {
  combineLatest,
  fromEvent,
  from,
  observable,
  startWith,
  switchMap,
  merge,
  map,
  of,
  combineLatestAll,
  takeUntil,
  Subject,
} from "rxjs";
import "./style.css";

const perPersonTotal = document.getElementById("perPersonTotal");
const people = document.getElementById("numberOfPeople");
const incremnet = fromEvent(document.getElementById("increment"), "click").pipe(
  map((v) => {
    people.innerText = Number(people.innerText) + 1;
  })
);
const decremnet = fromEvent(document.getElementById("decrement"), "click").pipe(
  map((v) => {
    if (people.innerText > 1) people.innerText = Number(people.innerText) - 1;
  })
);
const billTotal = fromEvent(
  document.getElementById("billTotalInput"),
  "keyup"
).pipe(map((v) => Number(v.target.value)));

const tipTotal = fromEvent(document.getElementById("tipInput"), "keyup").pipe(
  map((v) => Number(v.target.value) / 100)
);
const combineInput = combineLatest([billTotal, tipTotal]);
const handleIncDec = merge(incremnet, decremnet);

const answer = combineLatest([combineInput, handleIncDec]);

answer.subscribe(([bill, v]) => {
  console.log("The value at subscribe1 :", bill, v);
  perPersonTotal.innerText = (
    (bill[0] * bill[1] + bill[0]) /
    Number(people.innerText)
  ).toFixed(2);
});

// (bill, tip) => {
//   perPersonTotal.innerText = (
//     (bill * tip + bill) /
//     Number(people.innerText)
//   ).toFixed(2);
//   return bill * tip + bill;
// };
