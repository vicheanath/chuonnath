import Dexie, { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'

export interface INote {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export interface INoteController {
  create(note: Note): PromiseExtended<IndexableType>
  update(note: Note): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Note>
  findAll(): Promise<Note[]>
  search(word: string): Promise<Note[]>
  count(): Promise<number>
}

export class Note extends AbstractMain implements INote {
  id?: number
  word: string
  definition: string
  constructor(word: string, definition: string) {
    super()
    this.word = word
    this.definition = definition
  }
}

export class NoteControllerImpl implements INoteController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(note: Note): PromiseExtended<IndexableType> {
    return this.db.table('note').add(note)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('note').delete(id)
  }

  update(note: Note): PromiseExtended<IndexableType> {
    return this.db.table('note').put(note)
  }
  findAll(): Promise<Note[]> {
    return this.db.table('note').toArray()
  }
  find(id: number): Promise<Note> {
    return this.db.table('note').get(id)
  }

  search(word: string): Promise<Note[]> {
    return this.db.table('note').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('note').count()
  }
}
