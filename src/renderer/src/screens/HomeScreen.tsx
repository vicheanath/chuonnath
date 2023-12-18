import { SearchBar } from '@renderer/components/SearchBar'
import { useDataContext } from '@renderer/contexts/DataContextProvider'
import { FC } from 'react'

const HomeScreen: FC = (): JSX.Element => {
  const { data, loading, error } = useDataContext()
  console.log('data', data)
  return (
    <div>
      <SearchBar isLoading={true} />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {data && <div>{/* <div>data: {JSON.stringify(data)}</div> */}</div>}
    </div>
  )
}

export default HomeScreen
