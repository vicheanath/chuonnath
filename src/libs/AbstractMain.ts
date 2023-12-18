export abstract class AbstractMain {
  createdAt: Date
  updatedAt: Date

  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
