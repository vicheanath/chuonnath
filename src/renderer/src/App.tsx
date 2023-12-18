import { GridPanel, FixedGridPanel } from './components/GridPanel'
import SideBar from './components/SideBar'
import { DataContextProvider } from './contexts/DataContextProvider'
import HomeScreen from './screens/HomeScreen'

function App(): JSX.Element {
  return (
    <DataContextProvider>
      <GridPanel>
        <SideBar />
        <FixedGridPanel>
          <HomeScreen />
        </FixedGridPanel>
      </GridPanel>
    </DataContextProvider>
  )
}

export default App
