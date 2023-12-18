import Dexie from 'dexie'

export const db = new Dexie('chuon-nath-dictionary')

db.version(1).stores({
  words: '++id,word,definition'
})
