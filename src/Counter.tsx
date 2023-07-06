import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { makeAutoObservable} from 'mobx';
type Item={ 
    key: number | string;
    value: string;
};
class CounterStore{
    items:Item[];
    count: number=0;
    constructor() {
        makeAutoObservable(this)
        this.items=[
            {key:1, value: '1'},
            {key:2, value: '2'},
            {key:3, value: '3'},
            {key:4, value: '4'},
            {key:5, value: '5'},
            {key:6, value: '6'},
            {key:7, value: '7'},
            {key:8, value: '8'},
            {key:9, value: '9'},
            {key:10, value: '10'},
        ];
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
