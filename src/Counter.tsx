import React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx';
import { List, Input, Button } from 'antd';
import styles from './counter.module.css';

type Item = {
  key: number | string;
  value: string;
};

class CounterStore {
  items: Item[];
  deletedKeys: Set<number | string>;

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
    this.deletedKeys = new Set();
  }

  toggleItemDeleted(key: number | string) {
    if (this.deletedKeys.has(key)) {
      this.deletedKeys.delete(key);
    } else {
      this.deletedKeys.add(key);
      this.items = [...this.items]; // <- костыль
    }
  }

  addItem(value: string) {
    const newKey = this.items.length + 1;
    this.items.push({ key: newKey, value });
  }

  deleteItem(key: number | string) {
    const index = this.items.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.deletedKeys.delete(key);
    }
  }
}

const counterStore = new CounterStore();

type ListItemProps = {
  item: Item;
};

const ListItem = observer(({ item }: ListItemProps) => {
  const handleToggleItemDeleted = () => {
    counterStore.toggleItemDeleted(item.key);
  };

  const isDeleted = counterStore.deletedKeys.has(item.key);
  const itemClassName = isDeleted ? `${styles.item} ${styles.deleted}` : styles.item;
  const deleteButtonClassName = isDeleted ? `${styles.deleteButton} ${styles.deleted}` : styles.deleteButton;

  return (
    <List.Item className={itemClassName} onClick={handleToggleItemDeleted}
    actions={[ <Button type="default" onClick={() => counterStore.deleteItem(item.key)} className={deleteButtonClassName}>
        Удалить
      </Button>
]}>
      {item.key},
      {item.value}
    </List.Item>
  );
});

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
        renderItem={(item: Item) => <ListItem item={item} />}
      />
    </div>
  );
});

export default Counter;