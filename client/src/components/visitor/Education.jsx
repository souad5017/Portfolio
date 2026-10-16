import SectionHead from '../common/SectionHead.jsx';
import Icon from '../common/Icon.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getEducation } from '../../services/educationService.js';
import { formatPeriod } from '../../utils/formatPeriod.js';

export default function Education() {
  const { data: education } = useFetch(getEducation);
  const [main, ...others] = education ?? [];

  return (
    <section className="section shell" id="education">
      <SectionHead eyebrow="05 / Education" title="Built on strong foundations." />
      <div className="education-grid">
        {main && (
          <article className="education-feature">
            <div className="education-year">{formatPeriod(main.startDate, main.endDate)}</div>
            <span className="education-icon"><Icon name="education" size={25} /></span>
            <div>
              <span>{main.school}</span>
              <h3>{main.degree}</h3>
              <p className="muted">{main.description}</p>
            </div>
          </article>
        )}
        {others.map((item) => (
          <article className="education-small" key={item._id}>
            <span>{formatPeriod(item.startDate, item.endDate)}</span>
            <h3>{item.degree}</h3>
            <p>{item.description}</p>
          </article>
        ))}
        <blockquote>“Learning is not a phase. It&apos;s the way forward.”</blockquote>
      </div>
    </section>
  );
}