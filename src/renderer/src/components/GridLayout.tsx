import React from 'react'

const GridLayout: React.FC = ({ children }: React.PropsWithChildren<unknown>) => {
  return <div className="grid grid-cols-12 gap-6">{children}</div>
}

export default GridLayout
