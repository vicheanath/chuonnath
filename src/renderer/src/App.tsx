import { GridPanel } from './components/GridPanel'
import SideBar from './components/SideBar'
import { DataContextProvider } from './contexts/DataContextProvider'

function App(): JSX.Element {
  return (
    <DataContextProvider>
      <GridPanel>
        <SideBar />
      </GridPanel>
    </DataContextProvider>
  )
}

export default App
