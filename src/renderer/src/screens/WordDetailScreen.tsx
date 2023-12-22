import { Button } from '@renderer/components/Button'
import { Word, WordControllerImpl } from '@renderer/libs/Word'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SolidHome } from '@renderer/components/icons'

const WordDetailScreen: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [word, setWord] = useState<Word>()
  useEffect(() => {
    setLoading(true)
    const getWord = WordControllerImpl.find(new Number(id).valueOf())
    getWord.then((res) => {
      setWord(res)
      setLoading(false)
    })
  }, [])
  return (
    <div className="container mx-auto">
      <div className="flex flex-row">
        <Button
          icon={<SolidHome />}
          className="ml-4"
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="py-2 inline-block min-w-full">
          <div className="shadow overflow-hidden">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col bg-primary-800 rounded-8">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    <div className="px-6 py-4">
                      <h1 className="text-lg text-gray-900">{word?.word}</h1>
                    </div>
                    <div className="px-6 py-4">
                      <div
                        className="text-lg text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: word?.details.trim() ?? ''
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordDetailScreen
