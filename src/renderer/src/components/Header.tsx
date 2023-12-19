const Header = (): JSX.Element => {
  const headerContent = [
    {
      name: 'Home',
      icon: 'home',
      link: '/'
    },
    {
      name: 'Word',
      icon: 'book',
      link: '/word'
    },
    {
      name: 'Setting',
      icon: 'cog',
      link: '/setting'
    }
  ]

  return (
    <div className="flex flex-row justify-between items-center w-9/12 mx-auto bg-primary-900 text-button">
      <div className="flex flex-row justify-center items-center">
        <div className="text-3xl font-bold">វចនានុក្រម ខ្មែរ</div>
      </div>
      <div className="flex flex-row justify-center items-center">
        {headerContent.map((item, index) => (
          <div key={index} className="flex flex-row justify-center items-center mx-4">
            <div className="text-xl font-bold">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
