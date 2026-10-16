import SectionHead from '../common/SectionHead.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getExperiences } from '../../services/experienceService.js';
import { formatPeriod } from '../../utils/formatPeriod.js';

export default function Experience() {
  const { data: experiences } = useFetch(getExperiences);

  return (
    <section className="section section-tint" id="experience">
      <div className="shell">
        <SectionHead eyebrow="04 / Experience" title="Where craft met real-world challenges." />
        <div className="timeline">
          {experiences?.map((item, i) => (
            <article className="timeline-item" key={item._id}>
              <div className="timeline-date">{formatPeriod(item.startDate, item.endDate)}</div>
              <div className="timeline-node">
                <i />
                {i < experiences.length - 1 && <span />}
              </div>
              <div className="timeline-content">
                <span>{[item.company, item.location].filter(Boolean).join(' · ')}</span>
                <h3>{item.position}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.missions.map((mission) => <li key={mission}>{mission}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}