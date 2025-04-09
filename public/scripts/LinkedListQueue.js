class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  enqueue(item) {
    const node = new Node(item);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._size++;
  }

  return(item) {
    const node = new Node(item);
    if (this.head) {
      node.next = this.head;
    }
    this.head = node;
    this._size++;
    return item;
  }

  dequeue() {
    if (!this.head) return undefined;

    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this._size--;
    return value;
  }

  peek() {
    return this.head ? this.head.value : undefined;
  }

  get size() {
    return this._size;
  }

  [Symbol.iterator]() {
    let current = this.head;
    return {
      next: () => {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

window.LinkedListQueue = LinkedListQueue;