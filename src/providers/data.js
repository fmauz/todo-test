const db = [
  { id: 1, title: 'Minha lista 1', tasks: [{ done: false, message: 'Minha primeira tarefa'}] },
  { id: 2, title: 'Minha lista 2', tasks: [{ done: false, message: 'Minha segunda tarefa'}] },
  { id: 3, title: 'Minha lista 3', tasks: [{ done: false, message: 'Minha terceira tarefa'}] },
]

export async function addToDB(item) {
  db.push({ id: db.length + 1, ...item })
}

export async function read() {
  return db
}