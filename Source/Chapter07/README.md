## Chapter 07. 스코프 Scope

> `Scope`는 변수, 상수, 매개변수가 언제(when) 어디서(where) 정의되는지 결정한다.

아래 예제에서 x 의 스코프는 함수 f이다.<br/>
그래서 마지막에 x는 스코프를 벗어났기 때문에 x가 정의되어 있지 않다는 오류가 발생한다.

```javascript
function f(x) {
    return x + 3;
}

f(5);
console.log(x);  // ReferenceError: x is not defined
```

> `선언(declaration)`이란?<br/>
> 식별자를 주어서 그 존재를 알리는것.<br/>
> `정의(definition)`란?<br/>
> 선언과 함께 값을 부여하는 것.<br/><br/>
> 자바스크립트는 모든 변수를 선언함과 동시에 값이(값을 지정하지 않은 경우 암시적으로 undefined)주어지므로<br/>
> 두 용어를 구분하지 않는다. 

주어진 함수가 변수의 스코프라고 할 때, 함수가 실제 호출되기 전까지 함수 바디의 매개변수가 존재하지 않는다는 것을 기억해야한다.<br/>
함수는 여러번 호출할 수 있고 함수를 호출할 때마다 매개변수가 나타나게 되며,<br/>
함수가 제어권을 반환(return)하면 스코프 밖으로 나가게 된다.<br/>

변수(vatiables)와 상수(constants)를 let 또는 const로 선언하기 전까지는 스코프 안에 존재하지 않는다.<br/>

### - Scope Versus Existence

변수가 존재하지 않으면, 그 변수는 스코프 안에 있지 않음을 직관적(intuitively)으로 알 수 있다.<br/>
그렇다고 <u>변수가 스코프 안에 있지 않다고 그 변수는 존재하지 않는 것은 아니다.</u><br/>
> "존재하지만 스코프 안에 없는 변수"

변수를 선언하면 그 식별자가 메모리에 저장되고,<br/>
무언가 더는 존재하지 않는다고 해도 자바스크립트는 메모리를 바로 회수 하지 않고,<br/>
더 이상 필요 없다고 표시해 두면, 주기적(자동)으로 일어나는 가비지 콜렉션(gc) 프로세스에서 메모리를 회수한다.<br/>

### - 정적 스코프

자바스크립트의 스코프는 `정적`이다.<br/>
소스 코드만 봐도 변수가 스코프에 있는지 판단 할 수 있으나 즉시 스코프를 분명히 알 수 있다는 것은 아니다.<br/>

> `정적 스코프`란?<br/>
> 어떤 변수가 함수 스코프 안에 있는지 함수를 정의할 때 알 수 있는 것을 뜻하며,<br/>
> 호출할 때 알 수 있는 것은 아니다.
> 전역 스코프(global scope), 블록 스코프(block scope), 함수 스코프(function scope)에 적용된다.

```javascript
const x = 3;

function f() {
    console.log(x);
    console.log(y); // y가 f 함수 스코프에 존재하지 않음
}

{ // 새 스코프
    const y = 5;
    f(); // y는 f() 의 바디 안 스코프에 없음
}
```

<br/>

### - 전역 스코프

> `전역 스코프`이란?<br/>
> 프로그램 시작할 떼 암시적으로 주어지는 스코프이다.<br/>
> 전역 스코프에 선언하면 프로그램의 모든 스코프에서 사용할 수 있다.<br/>

> `전역 변수`이란? <br/>
> 전역 스코프에 선언된 것.<br/>
> `전역 변수`를 너무 의존(남용)하면 좋지 않음.

```javascript
let name = "Irena"; // 전역 변수

function greet() { 
    console.log(`Hello, ${name}!`);
}

great();
```

<br/>

### - 블록 스코프

`let`, `const`는 식별자를 `블록 스코프`에서 선언한다.
> `블록스코프`이란?<br/>
> 그 블록(중괄호로 묶은 것)의 스코프에서만 보이는 식별자를 의미한다.<br/>


아래 예제에서는 x는 블록 안에서 정의했기 때문에 <br/>
블록을 나가는 즉시 x 도 스코프 밖으로 사라지므로 정의되지 않은 것이 된다.

```javascript
console.log('before block');
{
    console.log('inside block'); 
    const x=3; 
    console.log(x):  // -- 결과 3
}
console.log(`outside block; x=${x}`);  // -- ReferenceError : x is not defined
```

<br/>

### - 변수 숨기기 variable masking

```javascript
{
    // 외부
	let x = { color: "blue" }
	let y = x
	let z = 3

	{
        // 내부
		let x = 5
		console.log(x)       // -- 결과 5
		console.log(y.color) // -- 결과 blue
		y.color = "red"
		console.log(z)       // -- 결과 3
	}

	console.log(x.color)     // -- 결과 red
	console.log(y.color)     // -- 결과 red
	console.log(z)           // -- 결과 3
}
```
* 내부블록의 x는 외부블록의 x와 이름만 같을 뿐 다른 변수이므로 외부 블록의 x를 숨기는(가리는)효과가 있다.
* 객체 x는 y에 **x의 포인터**를 새로 할당하게 된다.<br/>
즉, y의 객체의 값이 변경하게 되면 x의 객체 값도 변경하게 된다.

<br/>

### - 클로저

> `클로저`란?<br/>
> 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에 정의하는 경우.<br/>
> 스코프를 함수 주변으로 좁히는(closing) 것이다.<br/>
> 스코프 안에서 함수를 정의하면 해당 스코프는 더 오래 유지된다.<br/>
> **접근할 수 없는 것에 접근할 수 있는 효과**가 있다.<br/>

아래와 같이 클로저는 일반적으로 접근할 수 없었던 스코프 바깥쪽에 있는 것들에 접근할 수 있게 한다.
```javascript
let f;   // 정의되지 않은 함수
{
    let o = { note : 'safe' }  // 지역변수
    f = function() {
        return o;
    }
}

let oRef = f();
oRef.note = "Not so safe after all!";  
```
o는 스코프 밖이므로 소멸되는 것이 자연스럽지만, oRef에 f()를 담았기 때문에 외부함수 f 가 지역변수 o 에 접근할 수 있게 된다.<br/>
외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는다.

<br/>

### - 즉시 호출하는 함수 표현식 (IIFE)

> `IIFE`란?<br/>
> 함수를 선언하고 즉시 실행한다.<br/>
> 스코프 안 선언된 변수는 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없다.<br/>
> 함수이기때문에 무엇이든 반환 가능하다.<br/>
> 배열, 객체, 함수를 반환하는 경우가 많다.<br/>

```javascript
const f = (function() { 
    let count = 0; 
    return function() {
        return `I have been called ${++count} time(s).`; 
    }
})();

f(); // -- 결과 "I have been called 1 time(s)." 
f(); // -- 결과 "I have been called 2 time(s)."
```

변수 count는 IIFE안에 안전하게 보관되어 있으므로 접근할 수 있는 방법이 없다.<br/>

<br/>

### - 함수 스코프와 호이스팅

***let***
* `let` 으로 변수를 선언하면, 그 변수는 언언하기 전에 존재하지 않는다.

***var***
* `var` 으로 변수를 선언하면, 현재 스코프 안이라면 어디서든 사용할 수 있다.
* 선언하기 전에 사용할 수도 있다.
* 호이스팅(Hoisting)매커니즘을 따른다.
* 같은 변수를 여러번 정의하더라도 무시된다.

> `호이스팅(Hoisting)`매커니즘이란?<br/>
> 함수나 전역 스코프 전체를 보고 `var`로 선언한 변수를 맨 위로 끌어올리는 방식.<br/>
> <i>선언</i>만 끌어올려지며, <i>할당</i>은 끌어올려지지 않는다.


```javascript
// 원래 코드
if(x !== 3) {
    console.log(y); 
    var y=5;

    if(y === 5) { 
        var x=3;
    }
    console.log(y);
}

if (x === 3) {
    console.log(y);
}

// 자바스크립트가 해석한 코드
// 선언만 끌어올려지고 할당은 끌어올려지지 않는다.
var x;   // 선언
var y;   // 선언
if(x !== 3) {
    console.log(y);
    y=5;  // 할당

    if(y === 5) { 
        x=3;   // 할당
    }
    console.log(y); 
}

if(x === 3) {
    console.log(y); 
}
```

<br/>

### - 함수 호이스팅

`var`와 마찬가지로 함수 선언도 스코프 맨 위로 끌어올려진다.<br/>
따라서 함수를 선언하기 전에 호출할 수 있다.<br/>
단, 변수에 할당한 함수 표현식은 끌어올려지지 않는다.(스코프 규칙을 그대로 따름)

```javascript
f();   // 함수 선언하기 전에 호출
function f() {
    console.log("f");
}

// 변수에 할당된 함수 표현식
d();    // ReferrenceError : d 는 정의되지 않았습니다.
let d = function() {
    console.log("d");
}
```

<br/>

### - 사각지대 temporal dead zone

> `사각지대(temporal dead zone)`이란?<br/>
> `let`으로 선언한 변수는 선언하기 전까지 존재하지 않는다는 직관적 개념을 잘 나타내는 표현이다.<br/>
> 스코프 안에서 변수의 사각지대는 변수가 선언되기 전의 코드이다.


### - 스크릭트 모드 strict mode

* 암시적 전역변수(implicit global) 를 허용하지 않는다.
* 사용 방법 : `"use strict"`를 코드 맨 앞에 선언 
* 전역 스코프에서 사용시 스크립트 전체가 스트릭트 모드로 실행되고,<br/>
  함수 안에서 사용시 해당 함수만 스트릭트 모드로 실행된다.

```javascript
(function() {
    "use strict"
    // 코드를 전부 이 곳에 작성한다.
    // 이 코드는 스트릭트 모드로 작동하지만, 이 코드와 함께 동작하는 다른 스크립트는 
    // 스크립트 모드에 영향을 받지 않는다.
})();
```
