import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx';
import { List, Input, Button } from 'antd';

type Item = {
  key: number | string;
  value: string;
};

class CounterStore {
  items: Item[];
  count: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.items = [
      { key: 1, value: '1' },
      { key: 2, value: '2' },
      { key: 3, value: '3' },
      { key: 4, value: '4' },
      { key: 5, value: '5' },
      { key: 6, value: '6' },
      { key: 7, value: '7' },
      { key: 8, value: '8' },
      { key: 9, value: '9' },
      { key: 10, value: '10' },
    ];
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  addItem(value: string) {
    this.items.push({ key: value, value });
  }
}
const counterStore = new CounterStore();

const Counter = observer(() => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    counterStore.addItem(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Счетчик: {counterStore.items.length}</h1>
      <Input value={inputValue} onChange={handleInputChange} />
      <br />
      <br />
      <Button type="primary" onClick={handleAddItem}>
        Добавить
      </Button>
      <br />
      <br />
      <List
        bordered
        dataSource={counterStore.items}
        renderItem={(item: Item) => (
          <List.Item style={{ border: '1px solid #ccc',  padding: '10px' }}>
            {item.key},
            {item.value}
          </List.Item>
        )}
      />
    </div>
  );
});

export default Counter;