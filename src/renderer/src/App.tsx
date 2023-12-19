import { GridPanel, FixedGridPanel } from './components/GridPanel'
import Headers from './components/Header'
import { DataContextProvider } from './contexts/DataContextProvider'
import HomeScreen from './screens/HomeScreen'

function App(): JSX.Element {
  return (
    <DataContextProvider>
      <GridPanel>
        <Headers />
        <FixedGridPanel>
          <HomeScreen />
        </FixedGridPanel>
      </GridPanel>
    </DataContextProvider>
  )
}

export default App
