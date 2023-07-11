import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx';
import { List, Input, Button } from 'antd';
import styles from './counter.module.css';

type Item = {
  key: number | string;
  value: string;
  isDeleted: boolean;
};

class CounterStore {
  items: Item[];
  count: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.items = [
      { key: 1, value: '1', isDeleted: false },
      { key: 2, value: '2', isDeleted: false },
      { key: 3, value: '3', isDeleted: false },
      { key: 4, value: '4', isDeleted: false },
      { key: 5, value: '5', isDeleted: false },
      { key: 6, value: '6', isDeleted: false },
      { key: 7, value: '7', isDeleted: false },
      { key: 8, value: '8', isDeleted: false },
      { key: 9, value: '9', isDeleted: false },
      { key: 10, value: '10', isDeleted: false },
    ];
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  addItem(value: string) {
    this.items.push({ key: value, value, isDeleted: false });
  }
  deleteItem(key: number | string) {
    const index = this.items.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  toggleItemDeleted(key: number | string) {
    const index = this.items.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.items[index].isDeleted = !this.items[index].isDeleted;
    }
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

  const handleDeleteItem = (key: number | string) => {
    counterStore.deleteItem(key);
  };

  const handleToggleItemDeleted = (key: number | string) => {
    counterStore.toggleItemDeleted(key);
  };

  const getItemClassName = (isDeleted: boolean): string => {
    let className = styles.item;
    if (isDeleted) {
      className += ` ${styles.deleted}`;
    }
    return className;
  };

  const getDeleteButtonClassName = (isDeleted: boolean): string => {
    let className = styles.deleteButton;
    if (isDeleted) {
      className += ` ${styles.deleted}`;
    }
    return className;
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
          <List.Item
            className={getItemClassName(item.isDeleted)}
            actions={[
              <Button
                type="default"
                onClick={() => handleDeleteItem(item.key)}
                className={getDeleteButtonClassName(item.isDeleted)}
              >
                Удалить
              </Button>,
            ]}
            onClick={() => handleToggleItemDeleted(item.key)}
          >
            {item.key},
            {item.value}
          </List.Item>
        )}
      />
    </div>
  );
});

export default Counter;
