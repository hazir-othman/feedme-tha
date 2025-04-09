const normalQueue = new LinkedListQueue();
const priorityQueue = new LinkedListQueue();
const botList = [];
const busyBot = new Set();
const idleBot = new Set();
const processingOrder = new Map();
let orderNumber = 1;

function generateOrderNumber() {
  return String(orderNumber++).padStart(4, '0');
}

function addOrder() {
  const order = { id: generateOrderNumber(), vip: false };
  normalQueue.enqueue(order);
  appendOrder(order);
}

function addVIPOrder() {
  const order = { id: generateOrderNumber(), vip: true };
  priorityQueue.enqueue(order);
  appendOrder(order);
}

function appendOrder(order) {
  const newDiv =
    `<div class="col-4${order.vip ? ' vip' : ''}" id="${order.id}">
    <div class="card p-2">Order #${order.id}</div>
  </div>`;
  const vipDivs = document.querySelectorAll('#pending .vip');
  const pendingDiv = document.getElementById('pending');
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = newDiv.trim();
  const newDivDOM = tempDiv.firstChild;
  if (order.vip) {
    // insert after the last vip orders or first if there is no other vip orders
    if (vipDivs.length > 0) {
      const lastVip = vipDivs[vipDivs.length - 1];
      lastVip.insertAdjacentElement('afterend', newDivDOM);
    } else {
      // insert as first child
      pendingDiv.prepend(newDivDOM);
    }
  } else {
    // insert as last child
    pendingDiv.append(newDivDOM);
  }
  processOrder();
}

function returnOrder(order) {
  if (order.vip) {
    priorityQueue.return(order);
  } else {
    normalQueue.return(order);
  }
}

function addCookingBot() {
  const botId = crypto.randomUUID();
  botList.push(botId);
  idleBot.add(botId);
  processOrder();
}

function removeCookingBot() {
  botId = botList.pop();
  if (!botId) {
    return;
  }

  if (busyBot.has(botId)) {
    // stop the setinterval, remove it from working set and return the order to pending
    const { id, vip, timeoutId } = processingOrder.get(botId);
    clearTimeout(timeoutId);
    returnOrder({ id, vip });
    console.info("Pending process " + timeoutId + " is removed, order #" + id + " is returned to pending order");
    busyBot.delete(botId);
    processingOrder.delete(botId);
  }

  idleBot.delete(botId);
  console.info("Removed bot " + botId);
}

function processOrder() {
  let order = {};

  if (idleBot.size) {
    if (priorityQueue._size) {
      order = priorityQueue.dequeue();
    } else if (normalQueue._size) {
      order = normalQueue.dequeue();
    }
  } else {
    console.info("No available bot to process.");
    return false;
  }

  if (order.id && idleBot.size) {
    // select an available bot
    const botId = idleBot.values().next().value;
    botProcessOrder(botId, order);
  } else {
    console.info("Nothing to process.");
  }
}

function botProcessOrder(botId, order) {
  // remove from idle bot, add to busy bot set timeout for 10 seconds, save that value
  idleBot.delete(botId);
  busyBot.add(botId);
  const timeoutId = setTimeout(() => {
    completeOrder(botId, order.id);
  }, 10000);
  console.info("bot " + botId + " is processing order #" + order.id + " with process id: " + timeoutId);
  processingOrder.set(botId, { ...order, timeoutId });
}

function completeOrder(botId, orderId) {
  console.info("bot " + botId + " completed order #" + orderId);
  idleBot.add(botId);
  busyBot.delete(botId);
  processingOrder.delete(botId);
  processOrder();
  // move from pending to complete

  const completedDiv = document.getElementById('completed');
  const completedOrder = document.getElementById(orderId);
  completedDiv.appendChild(completedOrder);
}