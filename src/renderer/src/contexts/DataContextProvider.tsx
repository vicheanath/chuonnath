/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { JSONArray, WordControllerImpl } from '@renderer/libs/Word'

import dataJson from '../assets/data.json'

type DataContextType = {
  data: any
  loading: boolean
  error: any
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
  const [data] = useState<DataContextType['data']>(null)
  const [loading] = useState<DataContextType['loading']>(true)
  const [error] = useState<DataContextType['error']>(null)

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      await WordControllerImpl.load(dataJson as JSONArray)
    }
    loadData()
  }, [])

  const value = useMemo(() => ({ data, loading, error }), [data, loading, error])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export { DataContextProvider, useDataContext }
