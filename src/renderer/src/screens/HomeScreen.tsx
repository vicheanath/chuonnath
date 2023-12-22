import { Button } from '@renderer/components/Button'
import { SearchBar } from '@renderer/components/SearchBar'
import { Word, WordControllerImpl } from '@renderer/libs/Word'
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

const HomeScreen: FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(15)
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [data, setData] = useState<Word[]>([])
  const fetchData = async (): Promise<void> => {
    setLoading(true)
    const res = await WordControllerImpl.findAllByPage(page, limit)
    setData(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSearch = async (word: string): Promise<void> => {
    const res = await WordControllerImpl.search(word)
    setData(res)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-row w-9/12 mx-auto">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
        <Button
          loading={loading}
          className="ml-4"
          onClick={() => {
            onSearch(search)
          }}
        >
          Search
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="py-2 inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <div className="flex flex-col gap-2">
              {data.map((word, index) => (
                <Link to={`/word/${word.id}`} key={uuidv4()}>
                  <div key={index} className="flex flex-row bg-primary-800 rounded-8">
                    <div className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{word.word}</div>
                    </div>
                    <div className="px-6 py-4">
                      <div
                        className="text-sm text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: WordControllerImpl.formatStringWithDot(word.details.trim())
                        }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <Button
          onClick={() => {
            setPage(page - 1)
            fetchData()
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setPage(page + 1)
            fetchData()
          }}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default HomeScreen
