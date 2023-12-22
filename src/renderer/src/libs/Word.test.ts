import { Word } from './Word'

test('Word', () => {
  const word = new Word('test', 'test details')
  expect(word.word).toBe('test')
  expect(word.details).toBe('test details')
})
