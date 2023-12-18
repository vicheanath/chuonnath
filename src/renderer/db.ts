import Dexie from 'dexie'

export const db = new Dexie('chuon-nath-dictionary')

db.version(1).stores({
  words: '++id,word,definition',
  history: '++id,word,definition',
  bookmarks: '++id,word,definition',
  settings: '++id,setting,value',
  notes: '++id,word,definition',
  tags: '++id,tag'
})
