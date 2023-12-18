import Dexie, { IndexableType, PromiseExtended } from 'dexie'

export interface IBookmarkController {
  create(bookmark: Bookmark): PromiseExtended<IndexableType>
  update(bookmark: Bookmark): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Bookmark>
  findAll(): Promise<Bookmark[]>
  search(word: string): Promise<Bookmark[]>
  count(): Promise<number>
}

export interface Bookmark {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export class BookmarkControllerImpl implements IBookmarkController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(bookmark: Bookmark): PromiseExtended<IndexableType> {
    return this.db.table('bookmark').add(bookmark)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('bookmark').delete(id)
  }

  update(bookmark: Bookmark): PromiseExtended<IndexableType> {
    return this.db.table('bookmark').put(bookmark)
  }
  findAll(): Promise<Bookmark[]> {
    return this.db.table('bookmark').toArray()
  }
  find(id: number): Promise<Bookmark> {
    return this.db.table('bookmark').get(id)
  }

  search(word: string): Promise<Bookmark[]> {
    return this.db.table('bookmark').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('bookmark').count()
  }
}
