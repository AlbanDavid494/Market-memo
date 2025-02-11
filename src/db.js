import Dexie from "dexie";

// create a new Dexie database name marketList
const db = new Dexie('marketList')

// database schema
db.version(2).stores({
    items: '++id, itemName, prosposedPrice, actualPrice, dueDate, isDone, actualTotal, proposedTotal'
})

// function to add a new item
export const addItem = async (item) => {
    await db.items.add(item)
}

// function to retrieve all items
export const getItems = async () => {
   return await db.items.toArray()
}

// function to update an existing item

export const updateItem = async (id, isDone) => {
    await db.items.update(id, isDone)
}

// export const updateItem = async (item) => {
//     await db.items.put(item)
// }

// functio to delete an item by id
export const deleteItem = async (id) => {
    await db.items.delete(id)
}

// export db
export default db;
