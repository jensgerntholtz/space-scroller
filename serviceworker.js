importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
)

self.addEventListener('message', function (e) {
  if (!e.data) return
  if (e.data !== 'skipWaiting') return
  self.skipWaiting()
})

workbox.precaching.precacheAndRoute([])
