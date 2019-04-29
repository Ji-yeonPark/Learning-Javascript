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

### - this 키워드
함수를 호출하면 this는 호출한 함수를 소유하는 객체가 된다.
```javascript
const o = {
    name: 'Wallace',
    speak() {return `My name is ${this.name}`;},
}

o.speak();

// -- 결과
My name is Wallace
```
중첨된 함수에서 this를 사용할 경우 잘못된 객체를 참조하여 오류가 발생할 수 있다.<br/>
다른 변수에 this를 할당하여 문제를 해결할 수 있다.
```javascript
const o={
    name: 'Julie', 
    greetBackwards: function() {
        const self = this;  // this 를 다른 변수에 할당.
        function getReverseName() {
            let nameBackwards = '';
            for(let i=self.name.length-1; i>=0; i--) {
                nameBackwards += self.name[i];
            }
            return nameBackwards; 
        }
    
    return `${getReverseName()} si eman ym ,olleH`; 
    },
};
console.log(o.greetBackwards());

// -- 결과
eiluJ si eman ym ,olleH
```

<br/>

### - :star: 함수 표현식과 익명 함수 Function Expressions and Anonymous Functions

> **익명함수**란?<br/>
> 식별자가 주어지지 않은 함수 <br/>
> `함수 표현식`을 사용. 함수 표현식은 식별자에 할당 할 수도 있고, 즉시 호출할 수도 있다.<br/>
> 함수 이름이 생략된 점을 제외하면 함수 선언과 문법적으로 동일하다.

```javascript
const f = function() {

};
```

일반적인 함수 선언과 마찬가지로 위 예제 속 함수를 `f()`로 호출 할 수 있다.<br/>
익명 함수와 일반적인 함수 선언과의 차이점은 함수 표현식으로 익명 함수를 만들고 함수를 변수에 할당했다는 점이다.<br/>
<br/>
만약 다음 예제와 같이 함수 이름을 정의하고 변수에 할당한다면 <br/>
함수를 할당한 변수 g가 우선순위가 더 높기 때문에 f를 쓰면 오류를 발생한다.<br/>
f로 함수 호출은 f함수 안에서 재귀호출할 때만 사용할 수 있다.
```javascript
const g = function f(stop) {
    if (stop) console.log('f stopped');
    f(true);  // 재귀 호출
};
g(false);
// f(false);  // -> 오류

// -- 결과
f stopped
```

<br/>

### - :star: 화살표 표기법 Arrow Notation

ES6에 새로 생긴 문법이다.<br/>
<br/>
**특징**
* `function` 을 생략해도 된다.
* 함수에 매개변수가 단 하나 뿐이라면 괄호() 도 생략할 수 있디.
* 함수 바디가 표현식 하나라면 중괄호와 `return`문도 생략할 수 있다.
* 익명 함수이다.
* 정적(lexically)으로 묶이기 때문에 화살표 함수를 사용할 경우 내부 함수안에서 this를 사용할 수 있다.
* 객체 생성자로 사용할 수 없다.
* arguments 변수로 사용할 수 없다.

```javascript
// 예1) 
// - function 을 생략해도 된다. 
// - 함수 바디가 표현식 하나라면 중괄호와 `return`문도 생략할 수 있다.
const f1 = function() { return "hello"; }
const f1 = () => "hello";

// 예2)
// - function 을 생략해도 된다. 
// - 함수에 매개변수가 단 하나 뿐이라면 괄호() 도 생략할 수 있디.
// - 함수 바디가 표현식 하나라면 중괄호와 `return`문도 생략할 수 있다.
const f2 = function(name) { return `hello ${name}`; }
const f2 = name => `hello ${name}`;

// 예3)
// - function 을 생략해도 된다. 
// - 함수 바디가 표현식 하나라면 중괄호와 `return`문도 생략할 수 있다.
const f3 = function(a, b) { return a + b; }
const f3 = (a, b) => a + b;
```

<br/>

### - call, apply, bind

**this** 값을 다룰때 사용한다.

> **call, apply**이란? <br/>
> 함수를 호출하면서 call을 사용하고 사용할 객체를 넘기면 해당 함수가 넘어온 객체의 메서드인 것처럼 사용할 수 있다.<br/>
> 모든 함수에서 사용 가능하다.
> `call`은 두번째 인자에 매개변수를 직접 받지만, `apply`는 배열로 받는 차이첨이 있다.

```javascript
const bruce = {name : "Bruce"};

function great(job) {
    return `Hello, I'm ${this.name}. I'm ${job}.`;
};

console.log(great("Actor"))  
// call
console.log(great.call(bruce, "Actor"))
// apply
console.log(great.apply(bruce, ["Actor"]))

// -- 결과
Hello, I'm undefined. I'm Actor.
Hello, I'm Bruce. I'm Actor.
Hello, I'm Bruce. I'm Actor.
```

> **bind**란? <br/>
> 함수의 this값을 영구적으로 바꿀 수 있다.

ex) Bruce의 태어난 해는 1949년으로 고정하지만, 직업은 바꿀 수 있도록 설정. 
```javascript
const bruce = { name: "Bruce" };
function update(birthYear, occupation) { 
    this.birthYear = birthYear; 
    this.occupation = occupation;
}

// bind
const updateBruce1949 = update.bind(bruce, 1949); 
updateBruce1949("singer, songwriter");

console.log(bruce)

// -- 결과
{ name: 'Bruce',
  birthYear: 1949,
  occupation: 'singer, songwriter' }
```
