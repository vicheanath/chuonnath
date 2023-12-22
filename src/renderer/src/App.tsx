import { GridPanel, FixedGridPanel } from './components/GridPanel'
import Headers from './components/Header'
import { DataContextProvider } from './contexts/DataContextProvider'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WordDetailScreen from './screens/WordDetailScreen'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <GridPanel>
          <Headers />
          <FixedGridPanel>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/word/:id" element={<WordDetailScreen />} />
            </Routes>
          </FixedGridPanel>
        </GridPanel>
      </DataContextProvider>
    </BrowserRouter>
  )
}

export default App
