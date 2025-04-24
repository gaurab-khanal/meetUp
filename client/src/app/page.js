"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Users, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/toggle"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Video className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">MeetNow</span>
        </div>
        <div className="flex gap-4">
          <Link href="/room">
            <Button variant="outline">Join Room</Button>
          </Link>
          <Link href="/room?create=true">
            <Button>Create Room</Button>
          </Link>
          <ModeToggle/>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-24">
          <div className="flex-1">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Instant Video Chats, <span className="text-blue-600">No Sign-up Required</span>
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create a room, share the link, and start chatting in seconds. No downloads, no accounts, just seamless
              peer-to-peer video calls.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/room?create=true">
                <Button size="lg" className="group">
                  Create a Room
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/room">
                <Button size="lg" variant="outline">
                  Join a Room
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="bg-slate-100 dark:bg-slate-700 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium">MeetNow Call</div>
                  <div className="w-16"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 aspect-video bg-slate-900">
                  <div className="rounded-lg bg-slate-800 overflow-hidden relative">
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">You</div>
                  </div>
                  <div className="rounded-lg bg-slate-800 overflow-hidden relative">
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      Friend
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M18.59 10.52A7.66 7.66 0 0 1 20 16.99c0 .92-.7 1.68-1.62 1.76a1.78 1.78 0 0 1-1.93-1.36 7.88 7.88 0 0 0-6.9-6.9 1.78 1.78 0 0 1-1.36-1.93C8.27 7.7 9.03 7 9.94 7h.01c5.16.12 9.04 4.3 8.64 9.52Z"></path>
                      <path d="M12 2v2"></path>
                      <path d="M2 12h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="M12 20v2"></path>
                      <path d="M19.07 4.93l-1.41 1.41"></path>
                      <path d="M15.54 15.54l-1.41 1.41"></path>
                      <path d="M4.93 19.07l1.41-1.41"></path>
                      <path d="M9.87 14.14l1.41-1.41"></path>
                      <path d="M4.93 4.93l1.41 1.41"></path>
                    </svg>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 7 16 12 23 17 23 7z"></path>
                      <rect width="15" height="14" x="1" y="5" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 h-24 w-24 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                }}
              />
              <motion.div
                className="absolute -top-4 -left-4 h-16 w-16 bg-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose MeetNow?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="h-10 w-10 text-blue-600" />,
                title: "Instant Connection",
                description: "No downloads or sign-ups required. Create a room and start chatting immediately.",
              },
              {
                icon: <Users className="h-10 w-10 text-blue-600" />,
                title: "Peer-to-Peer",
                description: "Direct connection between participants for better privacy and lower latency.",
              },
              {
                icon: <Share2 className="h-10 w-10 text-blue-600" />,
                title: "Easy Sharing",
                description: "Share your room ID with anyone to invite them to your video call.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 inline-block rounded-lg">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to start your video chat?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            No registration, no downloads. Just create a room and share the link.
          </p>
          <Link href="/room?create=true">
            <Button size="lg" className="px-8">
              Get Started Now
            </Button>
          </Link>
        </motion.section>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-300">
          <p>© {new Date().getFullYear()} MeetNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
