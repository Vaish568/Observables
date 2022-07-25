import "./style.css";

// import { from, fromEvent, of, throttleTime, scan } from "rxjs";
// import { map } from "rxjs/operators";
// const source = of(1, 2, 3);
// const transValue = source.pipe(map((x) => x * x));
// const subscribe = transValue.subscribe((v) => console.log(v));

// const btn = document.getElementById("btn");
// fromEvent(btn, "click")
//   .pipe(
//     throttleTime(1000), // implemnet first click and next click is implemented after 5 secs and repeat
//     scan((cnt) => cnt + 1, 0) // like reduce
//   )
//   .subscribe((v) => console.log("Clicked" + v + "times"));

// map((x) => {
//   console.log("Called");
//   return x * x;
// })(of(1, 2, 3)).subscribe((v) => console.log(`Output is: ${v}`));

// RxJS v6+
import { interval } from "rxjs";
import { takeUntil, filter, scan, map, withLatestFrom } from "rxjs/operators";

const isEven = (val) => {
  return val % 2 === 0;
};
const source = interval(1000);
const makingEven = source.pipe(filter(isEven));
const evenCnt = makingEven.pipe(
  scan((cnt, _) => {
    console.log("evencnt");
    return cnt + 1;
  }, 0)
);
const fiveCnt = evenCnt.pipe(
  filter((val) => {
    return val > 5;
  })
);
console.log("fivecnt", fiveCnt);

const answer = makingEven.pipe(
  // withLatestFrom(evenCnt),
  // map((cnt) => `Even number () : ${cnt}`),
  takeUntil(fiveCnt)
);
answer.subscribe((v) => console.log(v));

// import { map, Observable, filter, pluck } from "rxjs";
// const user2 = {
//   data: [
//     {
//       status: "active",
//       age: 25,
//     },
//     {
//       status: "inctive",
//       age: 40,
//     },
//     {
//       status: "inactive",
//       age: 50,
//     },
//     {
//       status: "active",
//       age: 21,
//     },
//   ],
// };

// const user = {
//   data: [
//     {
//       status: "active",
//       age: 25,
//     },
//     {
//       status: "inctive",
//       age: 40,
//     },
//     {
//       status: "inactive",
//       age: 50,
//     },
//     {
//       status: "active",
//       age: 10,
//     },
//   ],
// };

// const observable = new Observable((subscriber) => {
//   subscriber.next(user2);
//   subscriber.next(user2);
//   subscriber.complete();
//   subscriber.next(user2);
// }).pipe(
//   map((value) => {
//     // console.log(value);
//     return value.data;
//   }),
//   map((value) => {
//     //  console.log(value);
//     return value.filter((val) => val.status === "active");
//   }),
//   map((value) => {
//     // console.log(value);
//     return value.reduce((sum, user) => sum + user.age, 0) / value.length;
//   }),
//   map((value) => {
//     // console.log(value);
//     if (value < 18) throw new Error("Average age is too low");
//     else return value;
//   })
// );
// const observer = {
//   next: (value) => {
//     console.log("I got this from rxjs ", value);
//   },
//   error: (err) => {
//     console.log("I got an error  ", err);
//   },
//   complete: () => {
//     console.log("Completed");
//   },
// };
// observable.subscribe(observer);
