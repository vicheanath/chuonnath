import React from 'react'

/*
Search word (ស្វែងរកពាក្យ)
 Bookmark word (ចម្លងពាក្យ)
 History word (ប្រវត្តិពាក្យ)
 Dark mode (រចនាបទងងិត)
 Setting (ការកំណត់)
 About (អំពីកម្មវិធី)
 Share (ចែករំលែក)
 Feedback (មតិយោបល់)
 Rate (វាយតម្លៃ)
 Support (ជួយការណ៍)
 Donate (គាំទ្រ)
 Update (ធ្វើបច្ចុប្បន្នភាព)
 Contribution (ការចូលរួមក្នុងការបង្កើតវចនានុក្រមខ្មែរ)
 Discussion for new Khmer words (ការពិភាក្សាពាក្យថ្មីៗខ្មែរ)
 allowed user to develop and improve the dictionary together (អនុញ្ញាតឲ្យអ្នកប្រើប្រាស់អនុញ្ញាតឲ្យអ្នកអភិវឌ្ឍន៍ការ និង បង្កើតវចនានុក្រមខ្មែរជាមួយគ្នា)
*/
const App: React.FC = () => {
  const features = [
    {
      name: 'Search word',
      description: 'ស្វែងរកពាក្យ',
      icon: ''
    },
    {
      name: 'Bookmark word',
      description: 'ចម្លងពាក្យ',
      icon: ''
    },
    {
      name: 'History word',
      description: 'ប្រវត្តិពាក្យ',
      icon: ''
    },
    {
      name: 'Dark mode',
      description: 'រចនាបទងងិត',
      icon: ''
    },
    {
      name: 'Setting',
      description: 'ការកំណត់',
      icon: ''
    },
    {
      name: 'About',
      description: 'អំពីកម្មវិធី',
      icon: ''
    },
    {
      name: 'Share',
      description: 'ចែករំលែក',
      icon: ''
    },
    {
      name: 'Feedback',
      description: 'មតិយោបល់',
      icon: ''
    },
    {
      name: 'Rate',
      description: 'វាយតម្លៃ',
      icon: ''
    },
    {
      name: 'Support',
      description: 'ជួយការណ៍',
      icon: ''
    },
    {
      name: 'Donate',
      description: 'គាំទ្រ',
      icon: ''
    },
    {
      name: 'Update',
      description: 'ធ្វើបច្ចុប្បន្នភាព',
      icon: ''
    },
    {
      name: 'Contribution',
      description: 'ការចូលរួមក្នុងការបង្កើតវចនានុក្រមខ្មែរ',
      icon: ''
    },
    {
      name: 'Discussion for new Khmer words',
      description: 'ការពិភ',
      icon: ''
    }
  ]
  const downloadConfig = {
    windows: {
      url: '',
      name: 'Windows',
      icon: ''
    },
    mac: {
      url: '',
      name: 'Mac',
      icon: ''
    },

    linux: {
      url: '',
      name: 'Linux',
      icon: ''
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">សូមស្វាគមន៍មកកាន់វចនានុក្រមខ្មែរ</h1>

        <p className="mt-3 text-2xl">
          វចនានុក្រមខ្មែរគឺជាកម្មវិធីស្វែងរកពាក្យខ្មែរដែលអ្នកអាចស្វែងរកពាក្យនៅក្នុងកម្មវិធីនេះបាន។
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {Object.keys(downloadConfig).map((key, index) => {
            const config = downloadConfig[key]
            return (
              <button key={index} className="p-6 mt-6 text-left border w-96 rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="ml-4">
                    <dt className="text-lg font-medium leading-6 text-gray-900">{config.name}</dt>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <div className="flex items-center justify-center">
                <div className="flex-shrink-0">
                  {feature.icon ? (
                    <img className="w-10 h-10" src={feature.icon} alt={feature.name} />
                  ) : (
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <dt className="text-lg font-medium leading-6 text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
