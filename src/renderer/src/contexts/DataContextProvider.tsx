/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { JSONArray, Word, WordControllerImpl } from '@renderer/libs/Word'

import dataJson from '../assets/data.json'

type DataContextType = {
  words: Word[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

const useDataContext = (): DataContextType => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataContextProvider')
  }
  return context
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DataContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [words, setWords] = useState<Word[]>([])
  useEffect(() => {
    const loadData = async (): Promise<void> => {
      await WordControllerImpl.load(dataJson as JSONArray)
      const res = await WordControllerImpl.findAll()
      setWords(res)
    }
    loadData()
  }, [])
  const value = useMemo(() => ({ words }), [words])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export { DataContextProvider, useDataContext }
