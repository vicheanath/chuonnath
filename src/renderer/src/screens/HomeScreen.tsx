import { Button } from '@renderer/components/Button'
import { SearchBar } from '@renderer/components/SearchBar'
import { Word, WordControllerImpl } from '@renderer/libs/Word'
import { FC, useEffect, useState } from 'react'

const HomeScreen: FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(15)
  const [search, setSearch] = useState<string>('')

  const [data, setData] = useState<Word[]>([])
  const fetchData = async (): Promise<void> => {
    const res = await WordControllerImpl.findAllByPage(page, limit)
    setData(res)
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
      <div className="flex flex-row justify-center items-center w-9/12 mx-auto">
        <SearchBar onChange={(e) => setSearch(e.target.value)} />
        <Button
          className="ml-4"
          onClick={() => {
            onSearch(search)
          }}
        >
          Search
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"></div>
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <div className="bg-white divide-y">
              {data.map((word, index) => (
                <div key={index} className="flex flex-row">
                  <div className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{word.word}</div>
                  </div>
                  <div className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="text-sm text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: WordControllerImpl.formatStringWithDot(word.details.trim())
                      }}
                    ></div>
                  </div>
                </div>
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
