/* 
 * 6. Function Arguments
 * 매개변수와 함수 밖의 변수는 서로 다른 객체임을 확인하는 코드
 */

function f(x) {
    console.log(`inside f: x=${x}`);
    x = 5;
    console.log(`inside f: x=${x} (after assignment)`);
}

let x = 3;
console.log(`before calling f: x=${x}`);

f(x);
console.log(`after calling f: x=${x}`);


/* 
 * 6. Function Arguments
 * 함수 안에서 객체를 변경하면, 함수 밖 객체의 값이 바뀌어 있는 것을 확인하는 코드
 */
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


/* 
 * 6. Function Arguments
 * 원시 값은 변경될 수 없지만, 객체는 값이 변경이 가능하다는 것을 확인하는 코드
 */
function f(o) {
    // 매개변수의 객체 값 변경 -> 함수 밖의 o 의 값이 변경됨
    o.message = "set in f";  

    // o 원시 값 변경 -> 새로운 객체가 된다.
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