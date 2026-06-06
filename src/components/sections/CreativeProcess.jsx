import SectionHeader from '../ui/SectionHeader.jsx'
import ProcessStep from '../ui/ProcessStep.jsx'

const steps = [
  { step: 1, iconName: 'MagnifyingGlass', title: 'Understand First',     desc: 'I spend more time on the problem than the solution. Most bad code comes from solving the wrong thing.' },
  { step: 2, iconName: 'Books',           title: 'Research Deeply',      desc: 'What\'s been tried? What failed? What succeeded? I look for the gap between existing solutions and the real need.' },
  { step: 3, iconName: 'Lightning',       title: 'Build Fast and Ugly',  desc: 'The first version is never the real version. I prototype quickly to learn what the real version needs to be.' },
  { step: 4, iconName: 'ArrowsClockwise', title: 'Break It to Fix It',   desc: 'Testing isn\'t the end of development — it\'s the middle. Breaking things intentionally reveals what needs to be stronger.' },
  { step: 5, iconName: 'RocketLaunch',    title: 'Ship With Intention',  desc: 'Done is better than perfect, but intentional is better than rushed. I ship when it\'s ready to be used, not just when it compiles.' },
]

export default function CreativeProcess() {
  return (
    <section id="creative-process" className="py-32 md:py-48 max-w-6xl mx-auto px-4 md:px-8">
      <SectionHeader eyebrow="Process" title="How I Think" />

      <div className="flex flex-col md:flex-row gap-4">
        {steps.map((s, i) => (
          <ProcessStep key={s.step} {...s} index={i} />
        ))}
      </div>
    </section>
  )
}
