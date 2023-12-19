import Dexie from 'dexie'

export const DATA_BASE_NAME = 'chuon-nath-dictionary'
export const db = new Dexie(DATA_BASE_NAME)
export const DATA_BASE_VERSION = 1

db.version(1).stores({
  words: '++id,word,definition',
  history: '++id,word,definition',
  bookmarks: '++id,word,definition',
  settings: '++id,setting,value',
  notes: '++id,word,definition',
  tags: '++id,tag'
})
