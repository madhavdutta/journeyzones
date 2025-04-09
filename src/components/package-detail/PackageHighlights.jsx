import { FiCheck } from 'react-icons/fi'

function PackageHighlights({ highlights }) {
  return (
    <div className="bg-primary-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Package Highlights</h3>
      <ul className="space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <FiCheck className="text-white w-3 h-3" />
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PackageHighlights
