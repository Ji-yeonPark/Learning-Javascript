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

### - 변수 숨기기

