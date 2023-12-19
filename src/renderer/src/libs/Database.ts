import { BookmarkControllerImpl, IBookmarkController } from './Bookmark'
import { HistoryControllerImpl, IHistoryController } from './History'
import { SettingControllerImpl, ISettingController } from './Setting'
import { WordControllerImpl, IWordController } from './Word'
import { NoteControllerImpl, INoteController } from './Note'
import Dexie from 'dexie'

export interface Database {
  word: IWordController
  history: IHistoryController
  bookmark: IBookmarkController
  setting: ISettingController
  note: INoteController
}

export class DatabaseImpl implements Database {
  word: WordControllerImpl
  history: HistoryControllerImpl
  bookmark: BookmarkControllerImpl
  setting: SettingControllerImpl
  note: NoteControllerImpl

  constructor(db: Dexie) {
    this.word = new WordControllerImpl(db)
  }
}
