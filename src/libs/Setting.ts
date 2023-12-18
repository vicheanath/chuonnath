import Dexie, { IndexableType, PromiseExtended } from 'dexie'
import { AbstractMain } from './AbstractMain'

export interface ISetting {
  id?: number
  setting: string
  value: string
  createdAt?: Date
  updatedAt?: Date
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

class Setting extends AbstractMain implements ISetting {
  id?: number
  setting: string
  value: string
  constructor(setting: string, value: string) {
    super()
    this.setting = setting
    this.value = value
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
