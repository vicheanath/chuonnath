import { FC, ReactNode } from 'react'

type GridPanelProps = {
  children: ReactNode
}

export const GridPanel: FC<GridPanelProps> = ({ children }) => {
  return <div className={`flex flex-col flex-1 w-full`}>{children}</div>
}

export const FixedGridPanel: FC<GridPanelProps> = ({ children }) => {
  return <div className={`flex pt-5 flex-col flex-1 sticky top-0 h-screen`}>{children}</div>
}
