import { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'
import { KmPartOfSpeech } from './Enums'
import { db } from './../db'

export type JSONValue = string | number | boolean | JSONObject | JSONArray

interface JSONObject {
  [x: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

export interface IWord {
  id?: number
  word: string
  details: string
  partOfSpeech: KmPartOfSpeech
  createdAt?: Date
  updatedAt?: Date
}

export class Word extends AbstractMain implements IWord {
  id?: number
  word: string
  details: string
  partOfSpeech: KmPartOfSpeech
  constructor(word: string, details: string, partOfSpeech: KmPartOfSpeech) {
    super()
    this.word = word
    this.details = details
    this.partOfSpeech = partOfSpeech
  }
}

export class WordControllerImpl {
  static async load(json: JSONArray): Promise<void | IndexableType[]> {
    if ((await WordControllerImpl.count()) > 0) {
      return Promise.resolve()
    }
    await db.table('words').bulkPut(json)
    return
  }

  static create(word: Word): PromiseExtended<IndexableType> {
    return db.table('words').add(word)
  }

  static delete(id: number): PromiseExtended<void> {
    return db.table('words').delete(id)
  }

  static update(word: Word): PromiseExtended<IndexableType> {
    return db.table('words').put(word)
  }
  static findAllByPage(page: number = 1, limit: number = 10): Promise<Word[]> {
    return db
      .table('words')
      .offset((page - 1) * limit)
      .limit(limit)
      .toArray()
  }
  static find(id: number): Promise<Word> {
    return db.table('words').get(id)
  }

  static search(word: string): Promise<Word[]> {
    return db.table('words').where('word').startsWithIgnoreCase(word).toArray()
  }

  static count(): Promise<number> {
    return db.table('words').count()
  }
}