## Chapter 11. 예외와 예외 처리 Exceptrions and Error Handling

### - Error 객체 ###

- 자바스크립트에는 **내장된 Error객체**가 있고, 이 객체는 에러 처리에 간편하게 사용할 수 있다.
- 에러 인스턴스를 만들면서 에러 메세지 지정 가능하다.

```javascript
const err = new Error('invalid email');
```

Error인스턴스를 만드는 것만으로는 아무 일도 일어나지 않으며, 이 인스턴스는 **에러와 통신하는 수단**이다.<br/>
예를 들어, @기호만 있으면 유효한 이메일 주소로 간주하기로 한다면, 아래와 같이 작성할 수 있다.

```javascript
// Error 인스턴스 생성
function validateEmail(email) {
    return email.match(/@/) ? 
        email : 
        new Error(`invalid email: ${email}`);
}

const email = "jane@doe.com";
const validatedEmail = validateEmail(email);

// instanceof연산자를 사용해 Error 인스턴스가 반환됐는지 확인
if (validatedEmail instanceof Error) { 
    console.error(`Error: ${validatedEmail.message}`);
} else {
    console.log(`Valid email: ${validatedEmail}`);
}
```

<br/>

### - try/catch와 예외 처리

> 뭔가를 시도try하고, 예외가 있으면 그것을 캐치catch한다.

- 예상치 못한 에러에 대처할 수 있다.
- 에러가 일어나는 즉시 catch문으로 이동하여 그냥 프로그램이 멈추는 일을 막을 수 있다.
- 에러가 발생하지 않으면 catch문은 실행되지 않는다.

```javascript
try {
    ...
} catch (e) {
    ...
}
```

<br/>

### - 에러 일으키기

- 직접 에러를 일으켜서(throw, raise) 예외 처리 작업을 할 수 있다.
- 다른 언어들과는 달리 에러를 일으킬 때 꼭 객체만이 아니라 숫자나 문자열 등 어떤 값이든 catch 절에 넘길 수 있다.
- 하지만 Error인스턴스를 넘기는 것이 가장 편리하다.

```javascript
function billPay(amount, payee, account) {
    if (amount > account.balance)
        throw new Error("잔고부족");
    account.transfer(payee, amount);
}
```
위 예제에서는 계죄에 잔고가 부족하면 `throw`를 호출하여 함수가 즉시 멈추게 된다.

<br/>

### - 예외 처리와 호출 스택

> 함수 A가 함수 B를 호출하고<br/> 
> 함수 B가 함수 C를 호출할 떼<br/>
> 함수 C가 종료되기 전까지 함수 A와 B는 완료될 수 없다.<br/>
> 이렇게 완료되지 않은 함수가 쌓이는 것을 **호출 스택call stack**이라 한다.

즉, 함수 C에서 에러가 발생하면, B에서도 에러가 발생하고, A에서도 에러가 발생하게 된다.<br/>
<u>**에러는 캐지될 때까지 호출 스택을 따라 올라간다.**</u>

[callStack.js](https://github.com/Ji-yeonPark/Learning-Javascript/blob/master/Source/Chapter11/callStack.js)파일 실행 결과는 다음과 같다.

```
a: calling b
b: calling c
c: throwing error
Error: c error
    at c (/Learning-Javascript/Source/Chapter11/stack.js:13:11)
    at b (/Learning-Javascript/Source/Chapter11/stack.js:8:5)
    at a (/Learning-Javascript/Source/Chapter11/stack.js:3:5)
    ...생략...
d: calling c
c: throwing error
Error: c error
    at c (/Learning-Javascript/Source/Chapter11/stack.js:13:11)
    at d (/Learning-Javascript/Source/Chapter11/stack.js:18:5)
    ...생략...
```

<br/>

### - try ... catch ... finally

`try`문에서 자원을 해제하는 것은 안전하지 않고, 에러가 발생하지 않으면 실행되지 않는 `catch`문 역시 안전하지 않다.<br/>
이런 상황에서 `finally`문이 필요하며, `finally`문은 에러가 일어나든, 일어나지 않든 반드시 호출하게 된다.

```javascript
try {
    console.log("this line is is executed");
    throw new Error("Whoops!!");
} catch (err) {
    console.log("there was an error!");
} finally {
    console.log("...always executed.");
}

// 결과
this line is is executed
there was an error!
...always executed.
```

### - 요약

- 예외 처리 자체도 대가를 지불해야하는 연산이다.
- 인터프리터가 예외를 계속 추척하고 있어야 하기 때문에 자주 실행되는 코드에서 예외를 발생시키면 **성능 문제**가 발생할 가능성이 있다.
- 예외처리는 예상할 수 없는 상황에 대비한 마지노선으로 생각하고, **예외를 예상할 수 있는 에러는 조건문으로 처리**하는 것이 최선이다.

