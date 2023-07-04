import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { makeAutoObservable} from 'mobx';

class CounterStore{
    count: number=0;
    constructor() {
        makeAutoObservable(this)
    }
    increment(){
        this.count++;
    }
    decrement(){
        this.count--;
    }
}
const counterStore=new CounterStore();
const Counter=observer(()=>
{
    return(
        <div>
            <h1>Счётчик: {counterStore.count}</h1>
            <button onClick={()=>counterStore.increment()}>+</button>
            <button onClick={()=>counterStore.decrement()}>-</button>
        </div>
    );
});
export default Counter;
