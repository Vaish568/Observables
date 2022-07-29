import {
  fromEvent,
  interval,
  Observable,
  map,
  of,
  take,
  switchMap,
  pipe,
  from,
  concatAll,
  delay,
  mergeMap,
  concatMap,
  exhaustMap,
} from "rxjs";

//preventing memory leakage
const observable = new Observable((observer) => {
  let i = 0;
  let inter = setInterval(() => {
    console.log("timer called");
    if (i == 4) observer.error("Unknown error ");
    observer.next(i++);
  }, 1000);
  // this function gets called when we unsubscribe or error occured and the interval gets cleared
  return () => {
    console.log("Return function called");
    clearInterval(inter); // To prevent memory leakage
  };
});

// let ans = observable.subscribe((data) => console.log(data));
//if we unsubscribe ,the data emission will stop but timer will run ,
//we have to clear the interval to prevent memory leakage
// ans.unsubscribe();

//concatAll : here for each click it gives 0,1,2,3
const srcOrigin = fromEvent(document, "click");
const src = srcOrigin.pipe(
  map((value) => {
    console.log("map: ", value);
    return interval(1000).pipe(take(4));
  }),
  concatAll()
);
// src.subscribe((v) => console.log("sub :", v));

//switchMap :cancels old observable if newone arrives
const obs1 = fromEvent(document, "click");
const obs2 = interval(1000);
obs1.pipe(
  switchMap((value) => {
    console.log("I am clicked!!!");
    console.log(obs2);
    return obs2;
  })
);
// .subscribe((v) => console.log(v));
//mergeMap
const obs3 = fromEvent(document, "click");
const obs4 = interval(1000).pipe(take(5));
// obs3.subscribe((value) => obs4.subscribe((v) => console.log(v)));
//obs3.pipe(mergeMap((value) => obs4)).subscribe((v) => console.log(v));

//Simple example:

const prepareFood = (order) => {
  let delayTime = Math.floor(Math.random() * 1000) + 1;
  console.log("Delay time :", delayTime);
  return of(`I'm ${order} I'm ready after ${delayTime} ms`).pipe(
    delay(delayTime)
  );
};

const orders = from(["order 1", "order 2", "order 3", "order 4"]);
// orders.subscribe((value) =>
//   prepareFood(value).subscribe((v) => console.log(v))
// );

// const merge = orders.pipe(mergeMap((order) => prepareFood(order)));
// merge.subscribe((v) => console.log("mergeMap :" + v));
// console.log("ConcatMap :");

// const concat = orders.pipe(concatMap((order) => prepareFood(order)));
// concat.subscribe((v) => console.log(v));

// const switchmap = orders.pipe(switchMap((value) => prepareFood(value)));
// switchmap.subscribe((v) => console.log(v));

//Executes only the first one
const exhaustmap = orders.pipe(exhaustMap((value) => prepareFood(value)));
exhaustmap.subscribe((v) => console.log(v));
