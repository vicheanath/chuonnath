import Dexie, { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'

export enum PartOfSpeech {
  Noun = 'noun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Pronoun = 'pronoun',
  Preposition = 'preposition',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
  Article = 'article',
  Numeral = 'numeral',
  Particle = 'particle',
  Unknown = 'unknown'
}

export enum KmPartOfSpeech {
  Noun = 'នាម',
  Verb = 'កិរិយាសព្ទ័',
  Adjective = 'គុណនាម',
  Adverb = 'គុណនគិរិយាសព្ទ័',
  Pronoun = 'សព្វនាម',
  Preposition = 'ធ្នាក់',
  Conjunction = 'ឃ្លាភ្ជាប់សេចក្តី',
  Interjection = 'អន្តរកម្ម',
  Article = 'អត្ថបទ',
  Numeral = 'លេខ',
  Particle = 'ភាគល្អិត',
  Unknown = 'មិនស្គាល់'
}

export interface Word {
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

export class WordImpl extends AbstractMain implements Word {
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
