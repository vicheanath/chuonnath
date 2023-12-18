import Dexie, { IndexableType, PromiseExtended } from 'dexie'

export interface History {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IHistoryController {
  create(history: History): PromiseExtended<IndexableType>
  update(history: History): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<History>
  findAll(): Promise<History[]>
  search(word: string): Promise<History[]>
  count(): Promise<number>
}

export class HistoryControllerImpl implements IHistoryController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(history: History): PromiseExtended<IndexableType> {
    return this.db.table('history').add(history)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('history').delete(id)
  }

  update(history: History): PromiseExtended<IndexableType> {
    return this.db.table('history').put(history)
  }
  findAll(): Promise<History[]> {
    return this.db.table('history').toArray()
  }
  find(id: number): Promise<History> {
    return this.db.table('history').get(id)
  }

  search(word: string): Promise<History[]> {
    return this.db.table('history').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('history').count()
  }
}
