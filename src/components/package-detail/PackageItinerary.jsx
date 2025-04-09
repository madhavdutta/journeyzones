import { useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

function PackageItinerary({ itinerary }) {
  const [openDay, setOpenDay] = useState(0)

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Detailed Itinerary</h3>
      
      <div className="space-y-4">
        {itinerary.map((day, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className={`w-full flex justify-between items-center p-4 text-left font-medium ${
                openDay === index ? 'bg-primary-50 text-primary-700' : 'bg-white'
              }`}
              onClick={() => toggleDay(index)}
            >
              <span className="text-lg">Day {day.day}: {day.title}</span>
              {openDay === index ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            {openDay === index && (
              <div className="p-4 bg-white border-t border-gray-200">
                <p className="mb-4">{day.description}</p>
                
                {day.activities && day.activities.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Activities:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {day.meals && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Meals:</h4>
                    <p>{day.meals}</p>
                  </div>
                )}
                
                {day.accommodation && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Accommodation:</h4>
                    <p>{day.accommodation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageItinerary
