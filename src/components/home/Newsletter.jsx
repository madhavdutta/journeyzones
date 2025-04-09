import { useState } from 'react'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-20 bg-luxury-navy text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-script text-luxury-gold text-3xl mb-2">Join Our Exclusive List</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Receive Luxury Travel Offers
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about special promotions, private events, and limited-time luxury experiences.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
              <p>You'll now receive our exclusive offers and luxury travel inspiration directly to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/30 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn bg-luxury-gold text-white hover:bg-opacity-90 font-medium py-3 px-6"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-sm text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
