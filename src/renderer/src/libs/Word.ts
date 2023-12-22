import { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'
import { KmPartOfSpeech } from './Enums'
import { db } from './../db'

export type JSONValue = string | number | boolean | JSONObject | JSONArray

interface JSONObject {
  [x: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

interface IWordJSON {
  word: string
  details: string
}

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
  constructor(word: string, details: string, partOfSpeech: KmPartOfSpeech = KmPartOfSpeech.Noun) {
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
    db.transaction('rw', db.table('words'), async () => {
      for (const word of json) {
        const wordObj: IWordJSON = JSON.parse(word as string)
        await db.table('words').add(new Word(wordObj.word, wordObj.details))
      }
    })
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
  static findAll(): Promise<Word[]> {
    return db.table('words').toArray()
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

  static search(word: string, limit: number = 10, page: number = 1): Promise<Word[]> {
    return db
      .table('words')
      .where('word')
      .startsWithIgnoreCase(word)
      .limit(limit)
      .offset((page - 1) * limit)
      .toArray()
  }

  static count(): Promise<number> {
    return db.table('words').count()
  }

  static formatStringWithDot(str: string, limit: number = 100): string {
    if (str.length > limit) {
      return str.slice(0, 30) + '...'
    }
    return str
  }
}
