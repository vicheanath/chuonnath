import Dexie, { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'
import { KmPartOfSpeech } from './Enums'

export interface IWord {
  id?: number
  word: string
  definition: string
  partOfSpeech: KmPartOfSpeech
  createdAt?: Date
  updatedAt?: Date
}

export interface IWordController {
  create(word: Word): PromiseExtended<IndexableType>
  update(word: Word): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Word>
  findAll(): Promise<Word[]>
  search(word: string): Promise<Word[]>
  count(): Promise<number>
}

export class Word extends AbstractMain implements IWord {
  id?: number
  word: string
  definition: string
  partOfSpeech: KmPartOfSpeech
  constructor(word: string, definition: string, partOfSpeech: KmPartOfSpeech) {
    super()
    this.word = word
    this.definition = definition
    this.partOfSpeech = partOfSpeech
  }
}

export class WordControllerImpl implements IWordController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(word: Word): PromiseExtended<IndexableType> {
    return this.db.table('words').add(word)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('words').delete(id)
  }

  update(word: Word): PromiseExtended<IndexableType> {
    return this.db.table('words').put(word)
  }
  findAll(): Promise<Word[]> {
    return this.db.table('words').toArray()
  }
  find(id: number): Promise<Word> {
    return this.db.table('words').get(id)
  }

  search(word: string): Promise<Word[]> {
    return this.db.table('words').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('words').count()
  }
}
