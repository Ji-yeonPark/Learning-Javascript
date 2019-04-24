@@ -1,283 +0,0 @@
# Chapter 04. 제어문

## 4.1 제어문의 기초

**Crown and Anchor**게임<br/>
면 위에 6개의 사각형이 있고, 각 사각형에는 크라운Crown, 앵커Anchor, 하트Heart, 클럽Club, 스페이드Spade, 다이아몬드Diamond를 나타내는 도형이 있다. 게임을 하는 사람은 그 사각형에 마음대로 돈을 걸 수 있다. 돈을 건 다음에는 6면체 주사위 세 개를 굴린다. 주사위가 사각형 번호에 일치하는 숫자에 멈추면, 사람은 거기에 돈을 건 만큼 갖게 된다. <br/>
다음은 사람이 돈을 거는 방법 몇 가지와 주사위를 굴렸을 때 따는 돈을 정리한 것이다.
![Crown and Anchor Chart](https://user-images.githubusercontent.com/40231980/56674102-6986b500-66f4-11e9-91ea-6457a78895bb.png)

> **기본 조건**
토마스는 자본금 50펜스를 준비한다.<br/>
자본금이 100펜스가 되거나 모두 잃을 경우 게임을 그만한다.

![Figure 4-2. Crown and Anchor simulation flowchart (refined)](https://user-images.githubusercontent.com/40231980/56663732-bca33c80-66e1-11e9-8db6-5216fb7194b7.png)

#### :arrow_forward: 순서도 각 행동(사각형)
- 변수 할당 : funds = 50, bets = {}, hand = {}
- m 이상 n 이하의 무작위 상수 : rand(1, 6)       <- 보조 함수
- 하트, 크라운 등을 결정할 무작위 문자열 randFace()       <- 보조 함수
- 객체 프로퍼티 할당: bets["heart"] = 5, bets[randFace()] = 5
- 배열에 요소 추가 : hand.push(randFace())
- 간단한 사칙연산 : funds - totalBet, funds + winnings
- 증가 : roll++       <- roll 변수에 1을 더한다.

#### :arrow_forward: 순서도 결정 부분(마름모)
- 숫자 비교 : funds > 0, funds < 100
- 일치 비교 : totalBet === 7
- 논리 연산자 : funds > 0 && funds < 100

### - while 루프
**while**이란?  조건이 만족하는 동안 블록 안의 코드를 계속 반복한다.

순서도의 조건 `funds > 1, funds < 100`을 나타내면 다음과 같다.
```javascript
let funds = 50;  // 시작 조건

while(funds > 1 && funds < 100) 
{
  // place bets
  
  // roll dice
  
  // collect winnings 
}
```
만약 이 코드를 실행할 경우, funds 가 50으로 계속 고정되어 조건이 계속 만족되므로 영원히 끝나지 않을 것이다.

### - 보조 함수 Helper Functions
이 게임 예제에서 두 개의 보조 함수가 필요하다.<br/>
```javascript
// m 이상 n 이하 범위의 무작위 정수 반환
function rand(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
}

// 여섯개 중 하나의 문자열을 무작위로 반환.
function randFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"] 
	[rand(0, 5)];
}
```

### - if ... else 문

이제 `place bets 돈을 건다`라는 행동을 만들 것이다.<br/>
> 토마스는 주머니에 손을 집어 넣고 잡히는 대로 돈을 꺼내며, 이 돈이 이번 판에 거는 돈이다.<br/>
**숫자 7**이면 모든 돈을 **하트**에 걸며, 그렇지 않다면 아무렇게 돈을 건다.

<u>아무렇게 돈을 걸 경우</u>는 나중에 작성할 것이다.

![Crown and Anchor simulation: place bets flowchart](https://user-images.githubusercontent.com/40231980/56666669-4d304b80-66e7-11e9-92fe-03c1afdeb2df.png)

```javascript
const bets = { crown: 0, anchor: 0, heart: 0, spade: 0, club: 0, diamond: 0 };
let totalBet = rand(1, funds);
if(totalBet === 7) {
        totalBet = funds;
        bets.heart = totalBet;
}
else {
        // randomly distribute total bet
}
funds = funds - totalBet;
```

### - do...while-루프
**do...while**이란?  블록 문을 **<u>최소 한 번</u>**은 실행할 경우 사용된다.

> **숫자 7**을 꺼내지 않으면 무작위로 돈을 걸어야 한다.<br/>
동전을 하나를 걸 수도 전부를 걸 수도 있으며, 같은 문자열(도형)에 여러 번 걸 수도 있다.

판돈을 나누는 행동을 순서도로 나타내면 다음과 같다.
![Crown and Anchor simulation: distribute bets flowchart](https://user-images.githubusercontent.com/40231980/56668467-861def80-66ea-11e9-825e-c4517ed68691.png)
```javascript
let remaining = totalBet; 
do{
    let bet = rand(1, remaining);
    let face = randFace();
    bets[face] = bets[face] + bet;
    remaining = remaining - bet;
} while(remaining > 0);
```

### - for 루프
**for**이란? while, do...while 모두 for로 바꿔 쓸 수 있으며, 유연한 반복문이다.<br/>
**어떤 일을 정해진 숫자만큼 반복할 때** 주로 사용한다.

> 토마스는 이번 판에 돈을 다 걸었다! 이제 주사위를 굴릴 시간이다.

![Crown and Anchor simulation: roll dice flowchart](https://user-images.githubusercontent.com/40231980/56669121-a00c0200-66eb-11e9-9a46-756a856c71e8.png)

for는 세 부분으로 나뉜다 : 초기화(roll = 0), 조건(roll < 3), 표현식(roll++). 
```javascript
const hand = [];
for(let roll = 0; roll < 3; roll++) {
        hand.push(randFace());
}
```

### - if 문
> 이제 남은 일은 딴 돈을 갖고 오는 것뿐이다.<br/>
hand 배열에는 무작위로 선택된 문자열(그림face)이 세 개 있다.

따라서 for 문을 한 번 더 써서 이 중에 맞춘 것이 있는지 확인해야 한다.
```javascript
let winnings = 0;  // 맞춘 수
for (let die = 0; die < hand.length; die++) {
    let face = hand[die];
    if (bets[face] > 0)  winnings = winnings + bets[face]; 
}
funds = funds + winnings;
```
![Crown and Anchor simulation: collect winnings flowchart](https://user-images.githubusercontent.com/40231980/56669898-d5651f80-66ec-11e9-984c-7bc28bbde03f.png)


### - 하나로 합치기
`console.log`를 넣어 어떻게 진행되고 있는지 확인했으며, 
토마스가 몇 판째 게임을 하고 있는지 알아보는 round 변수를 추가했다.<br/>
:point_right:[전체 코드 확인](https://github.com/Ji-yeonPark/Learning-Javascript/blob/master/Source/Chapter04/Thomas_plays.js)

<br/>

## 4.2 자바스크립트 제어문
### - 제어문의 예외

* **break** : 루프 중간에 빠져나감
* **continue** : 루프에서 다음 단계로 건너 뜀
* **return** : 제어문을 무시하고 현재 함수를 빠져나감. ( 6장 확인 )
* **throw** : 예외 핸들러(exception handler)에서 반드시 처리해야 할 예외를 일으킴. 예외 핸들러는 현재 제어문 밖에 있어도 상관 없다.

### - if .. else 문을 체인으로 연결하기
`else if` 를 이용해서 조건을 추가할 수 있다. 
```javascript
if (조건1) {

} else if (조건2) {

} else {

}
```

### - 추가적인 for 루프
쉼표 연산자(5장에서 배울 예정)를 이용하면 초기화와 마지막 표현식에 여러 문을 결합할 수 있다.<br/>
예를 들어, 다음은 피보나치 수열에서 처음 8개를 출력한다.
```javascript
for(lettemp,i=0,j=1;j<30;temp=i,i=j,j=i+temp) 
    console.log(j);
```

for 루프의 제어부에 아무것도 쓰지 않으면 무한 루프가 된다.<br/>
for에 조건을 생략하면 항상 true 가 되어 루프를 나갈 수 없다.
```javascript
for (;;) console.log("I will repear forever!");
```

for는 while로 바꿀 수 있다.
```javascript
// for
for([initialization]; [condition]; [final-expression])
    statement

// while
[initialization]
while([condition]) {
    statement
    [final-expression]
}
```

### - switch 문
**switch**이란? if...else문은 두 가지중 하나를 선택하지만, switch는 조건 하나로 여러 가지 중 하나를 선택 할 수 있다.
문법은 아래와 같다.
```javascript
switch(expression) { 
    case value1:
        // executed when the result of expression matches value1
        [break;] 
    case value2:
        // executed when the result of expression matches value2
        [break;]
    ...
    case valueN:
        // executed when the result of expression matches valueN
        [break;] 
    default:
        // executed when none of the values match the value of expression
        [break;] 
}
```
expression을 평가하고 그에 일치하는 첫 번째 case를 찾아서 break, return, continue, throw를 만나거나 switch문이 끝날 때까지 실행한다.

> 만약 토마스가 숫자에 대한 미신을 갖고 있다면?<br/>
-> 미신 : totalBet이 11 또는 13인 경우 totalBet은 0이 된다.

switch문을 통해 처리가 가능하다.

```javascript
switch (totalBet) {
    case 7:
        totalBet = funds;
        break;
    case 11:
    case 13:
        totalBet = 0;
        break;
    default:
        break;
}
```

### - for ... in 루프
객체의 프로퍼티에 루프를 실행하도록 설계된 루프이다.<br/>
다음과 같이 사용 가능하다.
```javascript
for(variable in object)
        statement
```
아래는 예제이다.
```javascript
const player = { name: 'Thomas', rank: 'Midshipman', age: 25 };
for(let prop in player) {
    console.log(prop + ': ' + player[prop]);
}

// 결과
name: Thomas
rank: Midshipman
age: 25
```

### - for ... of 루프
ES6에 새로 생긴 반복문이다.<br/>
컬렉션의 요소에 루프를 실행하는 다른 방법이다.<br/>
배열뿐만 아니라 이터러블(iterable)객체에 모두 사용할 수 있다.<br/>
다음과 같이 사용 가능하다.
```javascript
for(variable of object)
        statement
```
아래는 배열에 루프를 실행한 예제이다.
```javascript
const hand = [randFace(), randFace(), randFace()];
for(let face of hand)
    console.log(`You rolled...${face}!`);
```

<br/>

## 4.3 유용한 제어문 패턴들
### - continue 문을 사용하여 조건 중첩 줄이기
### - break, return문을 써서 불필요한 연산 줄이기
### - 루프를 완료한 후 인덱스 값 이용하기
### - 배열을 수정할 때는 감소하는 인덱스 사용하기
ex) bigArrayOfNumbers에서 찾은 모든 소수를 제거할 경우
- 인덱스는 점점 커지는데 요소를 제거하고 있으므로, 소수가 연달아 존재한다면 일부는 제거하지 않고 넘어갈 가능 성이 있다. 감소하는 인덱스를 사용하면 문제가 간단히 해결된다.
```javascript
for(let i=bigArrayOfNumbers.length-1; i >= 0; i--) {
    if(isPrime(bigArrayOfNumbers[i]))
        bigArrayOfNumbers.splice(i, 1);
}
```
