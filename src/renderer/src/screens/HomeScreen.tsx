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
    <div>
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
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Word
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((word, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{word.word}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className="text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: word.details }}
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setPage(page - 1)
            fetchData()
          }}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setPage(page + 1)
            fetchData()
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default HomeScreen
