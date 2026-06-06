import SectionHeader from '../ui/SectionHeader.jsx'
import ServiceCard from '../ui/ServiceCard.jsx'
import { ButtonPrimary } from '../ui/Button.jsx'
import { servicesData } from '../../data/services.js'

export default function Services() {
  return (
    <section id="services" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Services" title="What I Offer" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {servicesData.map(s => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>

      <div className="text-center">
        <p className="font-body text-muted mb-5">Interested in working together?</p>
        <ButtonPrimary
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Let's Talk →
        </ButtonPrimary>
      </div>
    </section>
  )
}
