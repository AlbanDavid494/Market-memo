import Dexie from "dexie";

// create a new Dexie database name marketList
const db = new Dexie('marketList')

// database schema
db.version(3).stores({
    items: '++id, itemName, prosposedPrice, dueDate, isDone, active, proposedTotal'
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

export const updateItem = async (id, item) => {
    await db.items.update(id, item)
}

export const updateEditItem = async (itemId,item) => {
    await db.items.update(itemId,item)
}

// functio to delete an item by id
export const deleteItem = async (id) => {
    await db.items.delete(id)
}

// export db
export default db;
