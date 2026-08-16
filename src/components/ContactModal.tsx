import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  presetScope?: string
}

const serviceTags = [
  'Shopify Themes & Apps',
  'AWS Serverless Backends',
  'Workflow Automation',
  'Custom Web Applications',
  'Store Audit & Speed Tuning'
]

const budgetRanges = [
  '< $3k',
  '$3k - $8k',
  '$8k - $15k',
  '$15k+'
]

const ContactModal = ({ isOpen, onClose, presetScope }: ContactModalProps) => {
  const [selectedService, setSelectedService] = useState<string>(serviceTags[0])
  const [selectedBudget, setSelectedBudget] = useState<string>(budgetRanges[1])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(presetScope ? `Interested in scoping out: ${presetScope}` : '')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} - ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${selectedService}\nBudget Range: ${selectedBudget}\n\nProject Overview:\n${message}`
    )
    window.location.href = `mailto:xyleze@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-zinc-950/40 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="bg-white border border-zinc-200 w-full max-w-xl p-5 sm:p-10 shadow-2xl relative rounded-2xl sm:rounded-3xl max-h-[92vh] overflow-y-auto my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-zinc-400 hover:text-zinc-950 p-2 rounded-full border border-zinc-200 hover:border-zinc-300 transition-colors bg-zinc-50 active:scale-90"
          >
            <X size={16} />
          </button>

          {!submitted ? (
            <div>
              <div className="mb-6 sm:mb-8 pr-8">
                <span className="font-label-caps text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                  PROJECT INQUIRY
                </span>
                <h3 className="font-headline-md text-2xl sm:text-3xl text-zinc-950 font-light tracking-tight">
                  Get in Touch
                </h3>
                <p className="font-body-sm text-xs text-zinc-500 mt-1 font-light">
                  Send a note about what you are looking to build, optimize, or automate.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Service Choice */}
                <div>
                  <label className="block font-label-caps text-[11px] sm:text-xs text-zinc-600 mb-2">
                    PRIMARY SERVICE
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {serviceTags.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setSelectedService(tag)}
                        className={`font-label-caps text-[11px] sm:text-xs px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                          selectedService === tag
                            ? 'bg-zinc-950 text-white font-medium shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Choice */}
                <div>
                  <label className="block font-label-caps text-[11px] sm:text-xs text-zinc-600 mb-2">
                    ESTIMATED BUDGET
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetRanges.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`font-label-caps text-[11px] sm:text-xs py-2 rounded-xl text-center border transition-all active:scale-95 ${
                          selectedBudget === b
                            ? 'bg-zinc-950 text-white font-medium shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block font-label-caps text-[11px] sm:text-xs text-zinc-600 mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-zinc-50 border border-zinc-200 px-3.5 py-2 sm:py-2.5 rounded-xl text-base sm:text-sm text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors font-body-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-label-caps text-[11px] sm:text-xs text-zinc-600 mb-1">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-zinc-50 border border-zinc-200 px-3.5 py-2 sm:py-2.5 rounded-xl text-base sm:text-sm text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors font-body-sm"
                    />
                  </div>
                </div>

                {/* Project Message */}
                <div>
                  <label className="block font-label-caps text-[11px] sm:text-xs text-zinc-600 mb-1">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a little about your project, timeline, or current technical bottlenecks..."
                    className="w-full bg-zinc-50 border border-zinc-200 px-3.5 py-2 sm:py-2.5 rounded-xl text-base sm:text-sm text-zinc-950 focus:outline-none focus:border-zinc-950 transition-colors font-body-sm resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-zinc-950 text-white font-label-caps text-xs font-medium py-3.5 sm:py-4 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send size={13} /> Send Inquiry
                </motion.button>
              </form>
            </div>
          ) : (
            <div className="py-8 sm:py-12 text-center">
              <CheckCircle size={44} className="text-zinc-950 mx-auto mb-3 sm:mb-4" />
              <h4 className="font-headline-md text-xl sm:text-2xl text-zinc-950 mb-2 font-light">Message Prepared</h4>
              <p className="font-body-sm text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mb-6 sm:mb-8 font-light leading-relaxed">
                Your email client has been launched with your project details. You can also email me directly at <a href="mailto:xyleze@gmail.com" className="text-zinc-950 underline font-medium">xyleze@gmail.com</a>.
              </p>
              <button
                onClick={onClose}
                className="bg-white border border-zinc-200 text-zinc-950 font-label-caps text-xs px-6 sm:px-8 py-3 rounded-full hover:bg-zinc-50 transition-colors active:scale-95"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ContactModal
