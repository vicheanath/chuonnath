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

export interface IWordController {
  create(word: Word): PromiseExtended<IndexableType>
  update(word: Word): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Word>
  findAll(): Promise<Word[]>
  search(word: string): Promise<Word[]>
  count(): Promise<number>
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

export interface IBookmarkController {
  create(bookmark: Bookmark): PromiseExtended<IndexableType>
  update(bookmark: Bookmark): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Bookmark>
  findAll(): Promise<Bookmark[]>
  search(word: string): Promise<Bookmark[]>
  count(): Promise<number>
}

export interface ISettingController {
  create(setting: Setting): PromiseExtended<IndexableType>
  update(setting: Setting): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Setting>
  findAll(): Promise<Setting[]>
  search(word: string): Promise<Setting[]>
  count(): Promise<number>
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

export interface ITagController {
  create(tag: Tag): PromiseExtended<IndexableType>
  update(tag: Tag): PromiseExtended<IndexableType>
  delete(id: number): PromiseExtended<void>
  find(id: number): Promise<Tag>
  findAll(): Promise<Tag[]>
  search(word: string): Promise<Tag[]>
  count(): Promise<number>
}

export interface Database {
  word: IWordController
  history: IHistoryController
  bookmark: IBookmarkController
  setting: ISettingController
  note: IBookmarkController
  tag: ITagController
}

export class DatabaseImpl implements Database {
  word: WordControllerImpl
  history: HistoryControllerImpl
  bookmark: BookmarkControllerImpl
  setting: SettingControllerImpl
  note: NoteControllerImpl
  tag: TagControllerImpl

  constructor(db: Dexie) {
    this.word = new WordControllerImpl(db)
  }
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

export class SettingControllerImpl implements ISettingController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(setting: Setting): PromiseExtended<IndexableType> {
    return this.db.table('setting').add(setting)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('setting').delete(id)
  }

  update(setting: Setting): PromiseExtended<IndexableType> {
    return this.db.table('setting').put(setting)
  }
  findAll(): Promise<Setting[]> {
    return this.db.table('setting').toArray()
  }
  find(id: number): Promise<Setting> {
    return this.db.table('setting').get(id)
  }

  search(word: string): Promise<Setting[]> {
    return this.db.table('setting').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('setting').count()
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

export class TagControllerImpl implements ITagController {
  private db: Dexie
  constructor(db: Dexie) {
    this.db = db
  }

  create(tag: Tag): PromiseExtended<IndexableType> {
    return this.db.table('tag').add(tag)
  }

  delete(id: number): PromiseExtended<void> {
    return this.db.table('tag').delete(id)
  }

  update(tag: Tag): PromiseExtended<IndexableType> {
    return this.db.table('tag').put(tag)
  }
  findAll(): Promise<Tag[]> {
    return this.db.table('tag').toArray()
  }
  find(id: number): Promise<Tag> {
    return this.db.table('tag').get(id)
  }

  search(word: string): Promise<Tag[]> {
    return this.db.table('tag').where('word').startsWithIgnoreCase(word).toArray()
  }

  count(): Promise<number> {
    return this.db.table('tag').count()
  }
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
