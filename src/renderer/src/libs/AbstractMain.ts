interface IAbstractMain {
  createdAt: Date
  updatedAt: Date
  setCreatedAt(date: Date): void
  setUpdatedAt(date: Date): void
}

export abstract class AbstractMain implements IAbstractMain {
  createdAt: Date
  updatedAt: Date

  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  setCreatedAt(date: Date): void {
    this.createdAt = date
  }

  setUpdatedAt(date: Date): void {
    this.updatedAt = date
  }
}
