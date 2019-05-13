## Chapter 08. 배열과 배열 처리 Arrays and Array Processing

### - 배열

* 순서가 있는 데이터 집합. 0 으로 시작하는 숫자형 인덱스를 사용한다.
* 한 배열의 요소가 모두 같은 타입이 아니어도 된다. (즉, 다른 배열이나 객체 포함 가능)
* 대괄호 사용 [ ]. 배열 요소에 인덱스로 접근할 떄도 대괄호 사용한다.
* length 프로퍼티 존재한다.
* 배열 길이보다 큰 인덱스를 사용해서 요소를 할당하면 자동으로 그 인덱스에 맞게 늘어나며, 빈 자리는 undefined로 채워진다.
* Array 생성자를 이용해서 배열을 만들 수도 있다.

```javascript
// 배열 리터럴
const arr1 = [1, 2, 3]; // 숫자로 구성된 배열
const arr2 = ["one", 2, "three"]; // 각기 다른 타입으로 구성된 배열 (책에서는 비균질적 배열이라고 표현)
const arr3 = [[1, 2, 3], ["one", 2, "three"]]; // 배열을 포함한 배열
const arr4 = [ // 비균질적 배열
    { name: "Fred", type: "object", luckyNumbers = [5, 7, 13] },
    [
        { name: "Susan", type: "object" },
        { name: "Anthony", type: "object" },
    ],
    1,
    function() { return "arrays can contain functions too"; },
    "three",
];

// 배열 요소에 접근하기
arr1[0]; // 1
arr1[2]; // 3
arr3[1]; // ["one", 2, "three"]
arr4[1][0]; // { name: "Susan", type: "object" }

// 배열 길이
arr1.length; // 3
arr4.length; // 5
arr4[1].length; // 2

// 배열 길이 늘리기
arr1[4] = 5;
arr1; // [1, 2, 3, undefined, 5]
arr1.length; // 5

// 배열의 현재 길이보다 큰 인덱스에 접근하는 것만으로 배열의 길이가 늘어나지는 않는다.
arr2[10]; // undefined
arr2.length; // 3

// Array 생성자. 거의 사용 안함
const arr5 = new Array(); // 빈 배열
const arr6 = new Array(1, 2, 3); // [1, 2, 3]
const arr7 = new Array(2); // 길이가 2인 배열, 요소는 모두 undefined
const arr8 = new Array("2"); // ["2"]
```

<br/>

### - 배열 조작

| Command | Description |
| :---: | --- |
| **push** | 배열 **끝**에 요소 **추가** |
| **pop** | 배열 **끝**에 요소 **제거** |
| **unshift** | 배열 **처음**에 요소 **추가** |
| **shift** | 배열 **처음**에 요소 **제거** |
```javascript
const arr = ["b", "c", "d"];

arr.push("e"); // ["b", "c", "d", "e"]
arr.pop(); // ["b", "c", "d"]
arr.unshift("a"); // ["a", "b", "c", "d"];
arr.shift(); // ["b", "c", "d"]
```

| Command | Description |
| :---: | --- |
| **concat** | 배열 **끝**에 **여러**요소 **추가**한 사본 반환 |

```javascript
const arr = [1, 2, 3];

// * 배열 arr은 바뀌지 않는다!
arr.concat(4, 5, 6); // [1, 2, 3, 4, 5, 6]
arr.concat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
arr.concat([4, 5], 6); // [1, 2, 3, 4, 5, 6]
arr.concat([4, [5, 6]]); // [1, 2, 3, 4, [5, 6]]
```

| Command | Description |
| :---: | --- |
| **slice** | 배열 **일부 반환** |

* 두 개의 매개변수를 받음.
  * 첫 번째 매개변수 : **어디서부터** 반환
  * 두 번째 매개변수 : **어디까지** 반환
  * 두 번째 매개변수 **생략** : **마지막까지** 반환
* 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 셈.

```javascript
const arr = [1, 2, 3, 4, 5];

arr.slice(3); //[4, 5]
arr.slice(2, 4); // [3, 4]
arr.slice(-2); // [4, 5]
arr.slice(1, -2); // [2, 3]
arr.slice(-2, -1); //[4]
```

| Command | Description |
| :---: | --- |
| **splice** | 배열 **임의 위치**에 요소 **추가 제거** |

* 첫 번째 매개변수 : **수정 시작** 인덱스
* 두 번째 매개변수 : **제거** 요소 **개수** (아무 요소도 제거하지 않을 때는 0을 넘김)
* 나머지 매개변수 : 배열에 **추가**될 요소

```javascript
const arr = [1, 5, 7];

arr.splice(1, 0, 2, 3, 4); // [1, 2, 3, 4, 5, 7]
arr.splice(5, 0, 6); // [1, 2, 3, 4, 5, 6, 7]
arr.splice(1, 2); // [1, 4, 5, 6, 7]
arr.splice(2, 1, 'a', 'b'); // [1, 4, 'a', 'b', 6, 7]
```

| Command | Description |
| :---: | --- |
| **copyWithin** | 배열 **안**에서 요소 **교체** |

* ES6에 새로 도입
* 배열 요소 복사해서 다른 위치에 붙여 넣고 기존 요소를 덮어씌움.
  * 첫 번째 매개변수 : 복사한 요소를 **붙여넣을 위치** (배열의 길이보다 크면 아무것도 복사하지 않는다.)
  * 두 번째 매개변수 : 복사를 **시작할 위치**
  * 세 번째 매개변수 : 복사를 **끝낼 위치** ( 생략 가능 )
* 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 셈.
* 배열의 크기(길이)는 수정하지 않고 반환.

```javascript
const arr = [1, 2, 3, 4];

arr.copyWithin(1, 2); // [1, 3, 4, 4]
// arr 요소 2 위치에 [3, 4]를 덮어 씌움.

// arr = [1, 3, 4, 4]
arr.copyWithin(2, 0, 2); // [1, 3, 1, 3]
// arr 요소 4(첫번째) 위치에 [1, 3] 을 덮어 씌움.

// arr = [1, 3, 1, 3]
arr.copyWithin(0, -3, -1); // [3, 1, 1, 3]
// arr 요소 1(첫번째) 위치에 [3, 1]을 덮어 씌움.
```

| Command | Description |
| :---: | --- |
| **fill** | 배열을 **특정 값**으로 **채움** |

* ES6에 새로 도입
* 정해진 값으로 배열을 채운다.
* 배열의 **일부**만 채울 경우 **시작 인덱스와 끝 인덱스를 지정**하면 된다.
* 음수 인덱스를 쓰면 배열의 끝에서부터 요소를 셈.

```javascript
const arr = new Array(5).fill(1); // [1, 1, 1, 1, 1]

arr.fill("a"); // ["a", "a", "a", "a", "a"]
arr.fill("b", 1); // ["a", "b", "b", "b", "b"]
arr.fill("c", 2, 4); // ["a", "b", "c", "c", "b"]
arr.fill(5.5, -4); // ["a", 5.5, 5.5, 5.5, 5.5]
arr.fill(0, -3, -1); // ["a", 5.5, 0, 0, 5.5]
```

| Command | Description |
| :---: | --- |
| **sort** | 배열을 **정렬** |
| **reverse** | 배열을 **역순 정렬** |

```javascript
const arr = [1, 2, 3, 4, 5];
arr.reverse(); // [5, 4, 3, 2, 1]

const arr2 = [5, 3, 2, 4, 1];
arr2.sort(); // [1, 2, 3, 4, 5]
```

`sort`는 정렬 함수를 받을 수  있기 때문에, 정렬 함수를 이용하여 객체가 포함된 정렬을 할 수 있다.
```javascript
const arr = [{ name: "Suzanne" }, { name: "Jim" }, 
             { name: "Trevor" }, { name: "Amanda" }];
arr.sort(); // arr 변경되지 않음.
arr.sort((a, b) => a.name > b.name); // arr이 name프로퍼티의 알파벳 순서대로 정렬됨.
```

<br/>

### - 배열 검색

**indexOf**
- 찾고자 하는 값과 **정확히 일치(===)하는 첫 번째 요소의 인덱스** 반환
- **lastIndexOf**는 배열 **끝**부터 검색
- 일치하지 않으면 **-1**반환
- 시작 인덱스를 지정하여 배열의 일부분만 검색 가능
- 대소문자 구분함.
> str.lastIndexOf(searchValue[, fromIndex])


```javascript
const o = { name: "Jerry" };
const arr = [1, 5, "a", o, true, 5, [1, 2], "9"];

arr.indexOf(5);                  // 결과 - 1
arr.lastIndexOf(5);              // 결과 - 5
arr.indexOf("a");                // 결과 - 2
arr.lastIndexOf("a");            // 결과 - 2
arr.indexOf({ name: "Jerry" });  // 결과 - -1
arr.indexOf(o);                  // 결과 - 3
arr.indexOf([1, 2]);             // 결과 - -1
arr.indexOf("9");                // 결과 - 7
arr.indexOf(9);                  // 결과 - -1

// 검색 시작 위치 입력
arr.indexOf("a", 5);             // 결과 - -1
arr.indexOf(5, 5);               // 결과 - 5
arr.lastIndexOf(5, 4);           // 결과 - 1
arr.lastIndexOf(true, 3);        // 결과 - -1
```

**findIndex**
- **보조 함수**를 써서 검색 조건 지정 가능.
- 일치하지 않으면 **-1**반환
- 검색 시작 인덱스 지정 불가능.

```javascript
const arr = [{ id: 5, name: "Judith" }, { id: 7, name: "Francis" }];
arr.findIndex(o => o.id === 5);            // 결과 - 0
arr.findIndex(o => o.name === "Francis");  // 결과 - 1
arr.findIndex(o => o === 3);               // 결과 - -1
arr.findIndex(o => o.id === 17);           // 결과 - -1
```

**find**
- 조건에 맞는 요소의 인덱스가 아닌 **요소 자체**를 반환
- 검섹 조건을 함수로 전달 가능.
- 일치하지 않으면 **undefined**반환
  - 첫 번째 요소 : 배열의 각 요소
  - 두 번째 요소 : 현재 요소의 인덱스
  - 세 번째 요소 : 배열 자체
> arr.find(callback[, thisArg])

```javascript
const arr = [{ id: 5, name: "Judith" }, { id: 7, name: "Francis" }]; 
arr.find(o => o.id === 5); // 결과 - object { id: 5, name: "Judith" } 
arr.find(o => o.id === 2); // 결과 - undefined

// 특정 인덱스보다 뒤에 있는 제곱수 찾기
const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49];
arr.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)));  // 결과 - 4
```

**some**
- **조건에 맞는 요소**를 찾으면 즉시 검색을 멈추고 **true** 반환
- 찾지 못하면 false 반환

```javascript
const arr = [5, 7, 12, 15, 17];
arr.some(x => x%2===0); // 결과 - true; 12 는 짝수이다.
arr.some(x => Number.isInteger(Math.sqrt(x)));  // 결과 - false; 제곱수가 없다
```

**every**
- 배열의 **모든 요소**가 조건에 맞아야 **true** 반환.
- 그렇지 않으면 false 반환

```javascript
const arr = [4, 6, 16, 36];
arr.every(x => x%2===0); // 결과 - true; 홀수가 없다.
arr.every(x => Number.isInteger(Math.sqrt(x)));  // 결과 - false; 6은 제곱수가 아니다.
```

<br/>

### - map과 filter ###

**map**
- **배열 요소 변형**
- 사본을 반환하며, 원래 배열은 바뀌지 않는다.
> arr.map(callback(currentValue[, index[, array]])[, thisArg])<br/>
>  * currentValue : 처리할 현재 요소.<br/>
>  * index Optional : 처리할 현재 요소의 인덱스.<br/>
>  * array Optional : map()을 호출한 배열.

```javascript
const cart = [ { name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 } ];
const names = cart.map(x => x.name);             // ["Widget", "Gadget"]
const prices = cart.map(x => x.price);           // [9.95, 22.95]
const discountPrices = prices.map(x => x * 0.9); // [7.96, 18.36]
```
- 두 배열의 요소를 인덱스에 따라 결한 가능함.
```javascript
const items = ["Widget", "Gadget"];
const prices = [9.95, 22.95];
const cart = items.map((x, i) => ({ name: x, price: prices[i] }));
// cart: [{ name: "Widget", price: 9.95 }, { name: "Gadget", price: 22.95 }]
```

**filter**
- **배열에 필요한 것들만 남길 목적**
- 사본을 반환하며, 원래 배열은 바뀌지 않는다.
- 새 배열에는 필요한 요소만 남는다.

```javascript
// 카드 덱을 만든다.
const cards = [];
for (let suit of ['H', 'C', 'D', 'S']) // 하트, 클로버, 다이아몬드, 스페이드
    for (let value=1; value<=13; value++)
        cards.push({ suit, value });
        
// value가 2인 카드
cards.filter(c => c.value === 2);
// [ 
//     { suit: 'H', value: 2}, 
//     { suit: 'C', value: 2}, 
//     { suit: 'D', value: 2}, 
//     { suit: 'S', value: 2}, 
// ]

// 여기서부터는 지면을 생각해서 반환된 배열의 길이만 적음.

// 다이아몬드
cards.filter(c => c.suit === 'D');  // length: 13
// 킹, 퀸 주니어
cards.filter(c => c.value > 10);    // length: 12
```

<br/>

### - reduce ###

- **배열 자체를 변형**
- 첫 번째 매개변수 : 배열이 줄어드는 대상인 어큐뮬레이터(accumulator: 누적값, 전 단계의 결과)
- 두 번째 매개변수부터 현재 배열 요소, 현재 인덱스, 배열 자체 순으로 받는다.

```javascript
const arr = [ 5, 7, 2, 4 ];
const sum = arr.reduce((a, x) => a += x);

1. 두 번째 배열 요소 7에서 함수가 호출된다.
a의 초기값은 첫 번째 배열요소인 5이고, x의 값은 7이다.
함수는 a와 x의 합인 12를 반환하고, 이 값이 다음 단계에서 a의 값이 된다.

2. 세 번째 배열 요소인 2에서 함수를 호출한다.
a의 초기값은 12이고, x의 값은 2이다.
함수는 a와 x의 합인 14를 반환한다.

3. 네 번째이자 마지막 배열 요소인 4에서 함수를 호출한다.
a는 14이고, x는 4이다.
함수는 a와 x의 합인 18을 반환하며 이 값은 reduce의 값이고, sum에 할당되는 값이다.
```

<br/>

### - 문자열 병합 ###

**join**
- `Array.prototype.join`의 매개변수는 **구분자** 하나를 받고 요소들을 하나로 합친 문자열을 반환한다.
- 매개 변수 생략시 **, 쉼표**로 구분된다.
- 문자열 요소를 합칠 때 **정의되지 않은 요소, 삭제된 요소, null, undefined는 모두 빈 문자열로 취급**한다.

```javascript
onst arr = [1, null, "hello", "world", true, undefined];
delete arr[3];    // 3번째 요소 world 삭제된다.
arr.join();       // 결과 - "1,,hello,,true";
arr.join('');     // 결과 - "1hellotrue"
arr.join(' -- '); // 결과 - "1 -- -- hello -- -- true -- "
```
