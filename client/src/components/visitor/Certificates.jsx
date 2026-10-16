import SectionHead from '../common/SectionHead.jsx';
import Icon from '../common/Icon.jsx';
import useFetch from '../../hooks/useFetch.js';
import { getCertificates } from '../../services/certificateService.js';

export default function Certificates() {
  const { data: certificates } = useFetch(getCertificates);

  return (
    <section className="section section-tint" id="certificates">
      <div className="shell">
        <SectionHead eyebrow="06 / Certificates" title="Always learning. Always refining." />
        <div className="cert-grid">
          {certificates?.map(({ _id, name, issuer, date, description, url }, index) => (
            <article className="cert-card" key={_id}>
              <div className="cert-top"><span>0{index + 1}</span><Icon name="certificate" size={25} /></div>
              <small>{[issuer, date && new Date(date).getFullYear()].filter(Boolean).join(' · ')}</small>
              <h3>{name}</h3>
              <p>{description}</p>
              {url && (
                <button onClick={() => window.open(url, '_blank', 'noopener')}>
                  View certificate <Icon name="external" />
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}