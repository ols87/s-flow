const STREAM_STATUS = {
  incoming: 'download',
  outgoing: 'upload',
  scheduled: 'calendar-check',
  streaming: 'graph',
  completed: 'check-circle',
  cancelled: 'prohibit',
};

export type StreamStatus = keyof typeof STREAM_STATUS;

export interface Stream {
  status: StreamStatus;
  icon: typeof STREAM_STATUS[StreamStatus];
}

export const STREAMS_MODEL: Stream[] = [];

Object.keys(STREAM_STATUS).forEach((status: string) => {
  STREAMS_MODEL.push({
    status: status as StreamStatus,
    icon: STREAM_STATUS[status as StreamStatus],
  });
});
