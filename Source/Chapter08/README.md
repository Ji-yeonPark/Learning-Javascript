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

