## Chapter 06. 함수

> **함수**란?<br/>
> A function is a self-contained collection of statements that run as a single unit.<br/>
> 하나의 단위로 실행되는 문의 집합이다. 

```javascript
// 함수 선언
function sayHello() {
    console.log("Hello");
}

// 함수 호출( 실행, call, invoke, execute, run )
sayHello();

// -- 결과
Hello
```

<br/>

### - 반환 값 Return Values
`return`을 이용해서 함수를 즉시 종료하고 값을 반환할 수 있다.<br/>
만약 `return` 값을 명시적으로 호출하지 않으면 반환 값은 `undefined`가 된다. 
```javascript
function getGreeting() {
    return "Hello";
}

getGreeting();

// -- 결과
Hello
```

<br/>

### - 호출과 참조 Calling Versus Referencing
자바스크립트에서는 함수도 `객체(Object)`이기 때문에 다른 객체처럼 넘기거나(passed) 할당(assigned)할 수 있다.<br/>
함수의 **호출**과 **참조**의 차이를 이해하는 것이 중요하다.

* **호출** : 함수 식별자 뒤에 괄호가 있는 경우 함수를 호출(실행)한다.
* **참조** : 함수 식별자 뒤에 괄호가 없는 경우 함수를 참조한다. 함수가 실행되지 않는다.

```javascript
getGreeting();    // 호출
getGreeting;      // 참조

// -- 결과
Hello
function getGreeting()
```

**참조**특징은 자바스크립트를 매우 유연한 언어로 만든다.<br/>
아래 방식들을 통해 다른 이름으로 함수를 호출 할 수 있다.
```javascript
// 1. 함수를 변수에 할당.
const f = getGreeting;
f();

// 2. 함수를 객체 프로퍼티에 할당.
const o = {};
o.f = getGreeting;
o.f();

// 3. 배열 요소로 할당
const arr = [1, 2, 3];
arr[1] = getGreeting;   // arr = [1, function getGreeting(), 2] 가 된다.
arr[1];
```
결과는 모두 `Hello`로 같다.<br/>

<br/>

### - :star: 함수의 매개변수 Function Arguments
[소스 코드](https://github.com/Ji-yeonPark/Learning-Javascript/blob/master/Source/Chapter06/Function_Arguments.js)
> **매개변수**란?<br/>
> argument, parameter<br/>
> 함수를 호출하면서 값을 전달할 때 사용 하는 변수를 의미한다.<br/>
> 함수를 호출되기 전까지는 존재하지 않는다는 점을 제외하면 일반적인 변수나 마찬가지이다.

**매개변수와 함수 밖의 변수는 서로 아무런 영향을 주지 않는다.**
```javascript
function f(x) {
    console.log(`inside f: x=${x}`);
    x = 5;
    console.log(`inside f: x=${x} (after assignment)`);
}

let x = 3;
console.log(`before calling f: x=${x}`);

f(x);
console.log(`after calling f: x=${x}`);


// -- 결과
before calling f: x=3
inside f: x=3
inside f: x=5 (after assignment)
after calling f: x=3
```

하지만, **함수 안에서 객체를 변경하면, 함수 밖에서도 객체의 바뀐 점이 반영**이 된다.
```javascript
function f(o) {
    o.message = `set in f (previous value: '${o.message}')`;
}

// 객체 선언
let o = {
    message: "initial value"
};

console.log(`before calling f: o.message="${o.message}"`);
f(o);
console.log(`after calling f: o.message="${o.message}"`);

// -- 결과
before calling f: o.message="initial value"
after calling f: o.message="set in f (previous value: 'initial value')"
```
**`원시 값`과 `객체`의 핵심적인 차이**이다.<br/>
원시 값은 불변이므로 수정할 수 없기 때문에 원시 값을 담은 변수는 값을 바꿀 수 있으나, <u>원시 값 자체는 바뀔 수 없다</u>.<br/>
반면 객체(object)는 바뀔 수 있다.<br/>
```javascript
function f(o) {
    o.message = "set in f";  
    o = {
        message: "new object!"
    };
    
    console.log(`inside f: o.message="${o.message}" (after assignment)`);
}

let o = {
    message: 'initial value'
};

console.log(`before calling f: o.message="${o.message}"`);
f(o);
console.log(`after calling f: o.message="${o.message}"`);

// -- 결과
before calling f: o.message="initial value"
inside f: o.message="new object!" (after assignment)
after calling f: o.message="set in f"
```

<br/>

그러면 **매개변수가 함수를 결정하는가? 아니다.**<br/>
즉, 함수에 정해진 매개변수 수와 상관 없이 여러개의 매개변수를 전달해도 상관이 없다.<br/>
정해진 매개변수 값에 값을 주지 않으면 `undefined`가 할당된다.<br/>
```javascript
function f(x) {
    return `in f: x=${x}`;
} 

f();

// -- 결과
in f: x=undefined
```
위 예에서 f()를 실행했으나 f(x)함수가 실행된 것을 볼수 있다.<br/>
즉, 자동으로 **오버로딩**이 된다.<br/>

<br/>

### - 매개변수 해체

* 객체를 변수로 해체
```javascript
function getSentence({ subject, verb, object }) {
    return `${subject} ${verb} ${object}`;
}

const o = {
    subject: "I",
    verb: "love",
    object: "JavaScript",
};

getSentence(o);

// -- 결과
I love JavaScript
```

* 배열을 변수로 해체
```javascript
function getSentence([ subject, verb, object ]) {
    return `${subject} ${verb} ${object}`;
}
const arr = [ "I", "love", "JavaScript" ];
getSentence(arr);

// -- 결과
I love JavaScript
```

* 확장 연산자(...)로 해체<br/>
확장 연산자는 **반드시 마지막 매개 변수**여야 한다.
```javascript
function addPrefix(prefix, ...words) {
    for(let i=0; i<words.length; i++) {
        prefixedWords[i] = prefix + words[i];
    }
    return prefixedWords;
}
addPrefix("con", "verse", "vex");

// -- 결과
["converse", "convex"]
```

<br/>

### - 매개변수 기본값 default value
ES6부터 매개변수에 기본값을 지정하는 기능이 추가되었다.<br/>
```javascript
function f(a, b="default", c=3) {
    return `${a} - ${b} - ${c}`;
}

f(5, 6, 7);
f(5, 6);
f(5);
f();

// -- 결과
5 - 6 - 7
5 - 6 - 3
5 - default - 3
undefined - default - 3
```
<br/>

### - 객체의 프로퍼티인 함수
ES6에는 객체 리터럴에 메서드 추가하는 문법이 새로 생겼다.
```javascript
// ES5
const o = {
    name: 'Wallace',
    bark: function() {
        return 'Woof!';
    }
}

// ES6
const o2 = {
    name: 'Wallace',
    bark() {
        return 'Woof!';
    }
}
```

<br/>

### - this
