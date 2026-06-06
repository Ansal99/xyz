import SectionHeader from '../ui/SectionHeader.jsx'
import { momentsPhotos } from '../../data/momentsPhotos.js'

export default function MomentsStrip() {
  const half1 = momentsPhotos.slice(0, 5)
  const half2 = momentsPhotos.slice(5)
  const doubled1 = [...half1, ...half1]
  const doubled2 = [...half2, ...half2]

  return (
    <section id="moments" className="py-32 md:py-48 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12">
        <SectionHeader eyebrow="Beyond the Code" title="Moments" />
      </div>

      <div className="space-y-4">
        {/* Row 1 - marquee left */}
        <div className="relative marquee-fade">
          <div className="flex gap-3 animate-marquee-left" style={{ width: 'max-content' }}>
            {doubled1.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-48 md:w-64 rounded-xl overflow-hidden"
                style={{ aspectRatio: '4/3' }}>
                <img
                  src={p.ph}
                  alt="Moment"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0
                    hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - marquee right */}
        <div className="relative marquee-fade">
          <div className="flex gap-3 animate-marquee-right" style={{ width: 'max-content' }}>
            {doubled2.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-48 md:w-64 rounded-xl overflow-hidden"
                style={{ aspectRatio: '4/3' }}>
                <img
                  src={p.ph}
                  alt="Moment"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0
                    hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
