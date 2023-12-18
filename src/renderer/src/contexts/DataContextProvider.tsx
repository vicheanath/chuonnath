/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'

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
  const [data, setData] = useState<DataContextType['data']>(null)
  const [loading, setLoading] = useState<DataContextType['loading']>(true)
  const [error, setError] = useState<DataContextType['error']>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setData(dataJson)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const value = useMemo(() => ({ data, loading, error }), [data, loading, error])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export { DataContextProvider, useDataContext }
