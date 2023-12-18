import Dexie, { IndexableType, PromiseExtended } from 'dexie'

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

export interface History {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Bookmark {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Setting {
  id?: number
  setting: string
  value: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Note {
  id?: number
  word: string
  definition: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Tag {
  id?: number
  tag: string
  createdAt?: Date
  updatedAt?: Date
}

export interface WordController {
  create(word: Word): PromiseExtended<IndexableType>
  update(word: Word): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Word>
  findAll(): Promise<Word[]>
  search(word: string): Promise<Word[]>
  count(): Promise<number>
}

export interface HistoryController {
  create(history: History): Promise<number>
  update(history: History): Promise<number>
  delete(id: number): Promise<number>
  find(id: number): Promise<History>
  findAll(): Promise<History[]>
  search(word: string): Promise<History[]>
  count(): Promise<number>
}

export interface BookmarkController {
  create(bookmark: Bookmark): Promise<number>
  update(bookmark: Bookmark): Promise<number>
  delete(id: number): Promise<number>
  find(id: number): Promise<Bookmark>
  findAll(): Promise<Bookmark[]>
  search(word: string): Promise<Bookmark[]>
  count(): Promise<number>
}

export interface SettingController {
  create(setting: Setting): Promise<number>
  update(setting: Setting): Promise<number>
  delete(id: number): Promise<number>
  find(id: number): Promise<Setting>
  findAll(): Promise<Setting[]>
  search(word: string): Promise<Setting[]>
  count(): Promise<number>
}

export interface NoteController {
  create(note: Note): Promise<number>
  update(note: Note): Promise<number>
  delete(id: number): Promise<number>
  find(id: number): Promise<Note>
  findAll(): Promise<Note[]>
  search(word: string): Promise<Note[]>
  count(): Promise<number>
}

export interface TagController {
  create(tag: Tag): Promise<number>
  update(tag: Tag): Promise<number>
  delete(id: number): Promise<number>
  find(id: number): Promise<Tag>
  findAll(): Promise<Tag[]>
  search(word: string): Promise<Tag[]>
  count(): Promise<number>
}

export interface Database {
  word: WordController
  history: HistoryController
  bookmark: BookmarkController
  setting: SettingController
  note: NoteController
  tag: TagController
}

abstract class AbstractMainClass {
  createdAt: Date
  updatedAt: Date

  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}

export class WordImpl extends AbstractMainClass implements Word {
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

export class WordControllerImpl implements WordController {
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
