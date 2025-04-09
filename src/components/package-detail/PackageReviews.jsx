import { useState } from 'react'
import { FiStar, FiThumbsUp, FiFlag } from 'react-icons/fi'

function PackageReviews({ reviews, averageRating, totalReviews }) {
  const [visibleReviews, setVisibleReviews] = useState(3)
  
  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3)
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0] // 5, 4, 3, 2, 1 stars
  reviews.forEach(review => {
    ratingCounts[5 - review.rating]++
  })
  
  const ratingPercentages = ratingCounts.map(count => (count / totalReviews) * 100)

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Guest Reviews</h3>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Overall Rating */}
          <div className="md:w-1/3 mb-6 md:mb-0 text-center md:border-r md:border-gray-200 md:pr-6">
            <div className="text-5xl font-bold text-primary-600 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-500">{totalReviews} reviews</div>
          </div>
          
          {/* Rating Distribution */}
          <div className="md:w-2/3 md:pl-6">
            <h4 className="font-medium mb-4 text-center md:text-left">Rating Distribution</h4>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <div key={rating} className="flex items-center mb-2">
                <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                <div className="flex-grow mx-3 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
                    style={{ width: `${ratingPercentages[index]}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">
                  {ratingCounts[index]} ({Math.round(ratingPercentages[index])}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Review List */}
      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">{review.userName}</h4>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <h5 className="font-medium mb-2">{review.title}</h5>
            <p className="text-gray-600 mb-4">{review.comment}</p>
            
            {review.response && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="font-medium mb-2">Response from Journey Zones</div>
                <p className="text-gray-600">{review.response}</p>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <button className="flex items-center hover:text-primary-600">
                  <FiThumbsUp className="mr-1" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              </div>
              <button className="flex items-center text-gray-500 hover:text-red-500">
                <FiFlag className="mr-1" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {visibleReviews < reviews.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreReviews}
            className="btn btn-secondary"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  )
}

export default PackageReviews
