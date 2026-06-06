import { reelItems } from '../../data/reelItems.js'
import SectionHeader from '../ui/SectionHeader.jsx'

export default function MemoryReel() {
  const doubled = [...reelItems, ...reelItems]

  return (
    <section id="memory-reel" className="py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-10">
        <SectionHeader eyebrow="Life in Motion" title="Frames" />
      </div>

      <div className="relative marquee-fade">
        <div className="flex gap-3 animate-marquee-left" style={{ width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 md:w-52 rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  autoPlay muted playsInline loop
                />
              ) : (
                <img
                  src={item.src}
                  alt="Memory reel photo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    if (e.target.src !== item.ph) {
                      e.target.src = item.ph
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}