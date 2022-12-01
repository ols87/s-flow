import { Icon } from '@iconify/react';
import { Stream, STREAMS_MODEL } from './models/streams.model';
import { styles } from './css';

const stream = STREAMS_MODEL.map((stream: Stream, index: number) => {
  const { status, icon } = stream;

  return (
    <div key={index} className={`card ${styles.streamCard} ${styles[status]}`} data-test="stream-card">
      <p className={styles.status}>
        <Icon className={`${styles.icon} ${styles[status]}`} data-test={`stream-icon-${icon}`} icon={`ph:${icon}`} />
        <span className={styles[status]}>{status}</span>
      </p>
      <p className={styles.amount}>{icon.length}</p>
    </div>
  );
});

export function DashStreamsComponent() {
  return (
    <>
      <div className="prose">
        <h2 className={styles.title}>Streams</h2>
      </div>

      <div className={`${styles.layout}`} data-test="stream-cards">
        {stream}
      </div>
    </>
  );
}
