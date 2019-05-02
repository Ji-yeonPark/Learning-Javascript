## Chapter 10. 맵과 셋 Maps and Sets

`맵(maps)`과 `셋(sets)`은 ES6에 새로 도입된 데이터 구조이다.

### - 멥 Maps

**객체(Object)의 단점**
* 프로퍼타입 체임 때문에 의도하지 않은 연결이 생길 수 있다.
* 객체 안에 연결된 키와 값이 몇 개나 되는지 쉽게 알아낼 수 있는 방법이 없다.
* 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값을 연결할 수 없다.
* 객체는 프로퍼티 순서를 전혀 보장하지 않는다.

Map은 위 객체의 결함을 모두 해결했고, 키와 값을 연결하는 목적이라면 객체보다 나은 선택이다.<br/>
예를 들어 여러 개의 사용자 객체 각각 역할을 부여한다면, Map의 `set()`을 이용하면 편하게 할당및 교체할 수 있다.
```javascript
const u1 = { name: 'Cynthia' }; 
const u2 = { name: 'Jackson' }; 
const u3 = { name: 'Olive' };

// Map 선언
const userRoles = new Map();

// set()으로 역할 할당 및 교체
// - set() 메서드를 체인으로 연결
userRoles
    .set(u1, 'Admin')
    .set(u2, 'Admin')
    .set(u1, 'User');  // 값 교체
```

`set()`이 아닌 이차원 배열(배열의 배열)을 넘기는 형태로도 할당 가능하다.

```javascript
// 생성자에 배열의 배열을 넘기는 형태
const userRoles = new Map([
    [u1, 'User'],
    [u2, 'Admin']
])
```

`get()`메서드로 값을 가져올 수 있고,<br/>
`has()`메서드를 통해 값이 존재하는지 체크 가능하다.
```javascript
// get()
userRoles.get(u1);   // "User"
userRoles.get(u3);   // undefined

// has()
userRoles.has(u1);   // true
userRoles.has(u3);   // false
```

`size` 프로퍼티는 맵의 요소 개수를 반환한다.

```javascript
userRoles.size;   // 2
```

`keys()`메서드는 맵의 키를, `values()`메서드는 맵의 값을 반환한다.<br/>
`entries()`메서드는 첫 번째 요소가 키이고, 두번째 요소가 값인 배열을 각각 반환한다.<br/>
python dictionary 랑 비슷하다.<br/>

|  | Javascript ES6 | Python |
| :---: | :---: | :---: |
| 값 | keys() | keys() |
| 키 | values() | values() |
| [값, 키] | entries() | items() |

```javascript
// keys()
for(let u of userRoles.keys()) 
    console.log(u.name);

// values()
for(let r of userRoles.values()) 
    console.log(r);

// entries()
// 예1)
for(let ur of userRoles.entries()) c
    onsole.log(`${ur[0].name}: ${ur[1]}`);

// 맵 분해
// 예2)
for(let [u, r] of userRoles.entries())
    console.log(`${u.name}: ${r}`);

// entries()는 맵의 기본 이터레이터이므로 단축해서 사용 가능하다.
// 예3)
for(let [u, r] of userRoles)
    console.log(`${u.name}: ${r}`);
```

값 또는 키의 배열이 필요하다면, `확산 연산자(spread operator)` 사용 가능하다.
```javascript
[...userRoles.values()];  // -- 결과 [ 'User', 'Admin' ]
```

맵의 요소를 제거할 때는 `delete()` 메서드를 사용하며,<br/>
모두 제거할 때는 `clear()` 메서드를 사용한다.

```javascript
// delete()
userRoles.delete(u1);  // u1 제거
userRoles.size;   // -- 결과 1

// clear()
userRoles.clear();  // 모두 제거
userRoles.size;   // -- 결과 0
```

<br/>

### - WeakMap

아래 세가지를 제외하고는 Map과 완전히 같다.

* 키는 반드시 객체여야 한다.
* WeakMap의 키는 가비지 콜렉션(garbage-collection)에 포함될 수 있다.
* WeakMap은 이터러블이 아니며 clear() 메서드가 없다.

일반적으로 javascript는 코드 어딘가에서 객체를 참조하는 한 그 객체를 메모리에 계속 유지하지만, <br/>
WeakMap은 그렇지 않기에 가비지 콜렉션 중 객체를 노출할 위험이 커 **이터러블이 될 수 없다.**<br/>
때문에, WeakMap은 객체 인스턴스 전용(private)키를 저장하기에 알맞다.<br/>

<br/>
아래 예제에서 WeakMap과 WeakMap을 사용하는 클래스를 함께 IIFE에 넣었다<br/>

> **IIFE**란?<br/>
> 즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression) <br/>
> 정의되자마자 즉시 실행되는 Javascript Function 를 말한다.
> ```javascript
> (function () {
>    statements
> })();
> ```

비밀스런 내용을 저장할 수 있는 SecretHolder 인스턴스는 저장할 때는 setScret(), 불러올 때는 getSecret() 메서드를 사용해만 한다.<br/>
WeakMap을 사용한 SecretHolder 인스턴스에 저장한 내용은 가비지 콜렉션에 포함되지 않게 된다.

```javascript
const SecretHolder = (function() { 
    const secrets = new WeakMap(); 
    return class {
        setSecret(secret) { 
            secrets.set(this, secret);
        }
        
        getSecret() {
            return secrets.get(this); 
        }
    } 
})();

const a = new SecretHolder();
a.setSecret('secret A');
a.getSecret(); // -- 결과 secret A
```
<br/>

### - 셋 Sets

중복을 허용하지 않는 집합이다.

```javascript
// Set 인스턴스 생성
const roles = new Set();

// 추가 add()
roles.add("User");   // -- 결과 Set { 'User' }
roles.add("User");   // -- 결과 Set { 'User' } -> 중복을 허용하지 않기 때문에 동일함.
roles.add("Admin");   // -- 결과 Set { 'User', 'Admin' }


// size 프로퍼티
roles.size;    // -- 결과 2

// 제거 delete()
roles.delete("Admin");  // -- 결과 true
roles.delete("Admin");  // -- 결과 false -> 이미 제거했기 때문에 실패함.
```

<br/>

### - WeakSet

객체만 포함할 수 있으며, 이 객체들은 가비지 콜렉션의 대상이 된다.<br/>
WeakMap과 마찬가지로 WeakSet도 이터러블이 아니므로 용도가 매우 적다.<br/>
거의 주어진 객체가 셋 안에 존재하는지 체크하는데 사용된다.

예를 들어, 산타 할아버지가 어떤 아이가 우는 아이인지 확인해서 선물대신 석탄을 두고 온면 아래와 같이 코드를 만들 수 있다.

```javascript
const naughty = new WeakSet();  // 우는 아이

const children = [
    {name : "Suzy"},
    {name : "Derek"}
]

naughty.add(children[1]);

for (let child of children) {
    if (naughty.has(child)) console.log(`석탄 : ${child.name}` );
    else console.log(`선물 : ${child.name}`);
}
```

