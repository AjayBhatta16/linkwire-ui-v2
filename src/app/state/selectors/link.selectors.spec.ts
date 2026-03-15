import { selectAccessUri, selectClicks } from './link.selectors';

const sampleLink = {
  trackingID: 't',
  displayID: 'd',
  redirectURL: 'https://example.com',
  note: 'note',
  useLogin: false,
  createdBy: 'user',
  clicks: [
    { clickID: '1', ip: '1.1.1.1', linkID: 'l', timestamp: 1000, userAgent: 'ua', os: 'os', client: 'c', device: 'd', location: 'loc', isp: 'isp', mobile: false, proxy: false, hosting: false, asn: 'asn' },
    { clickID: '2', ip: '1.1.1.2', linkID: 'l', timestamp: 2000, userAgent: 'ua', os: 'os', client: 'c', device: 'd', location: 'loc', isp: 'isp', mobile: false, proxy: false, hosting: false, asn: 'asn' },
  ],
};

describe('Link Selectors', () => {
  it('should map link clicks into display data sorted by timestamp', () => {
    const result = selectClicks.projector(sampleLink as any);

    expect(result.length).toBe(2);
    expect(result[0].autoIncrementID).toBe(1);
    expect(result[0].displayTimestamp).toBeDefined();
    expect(result[0].clickID).toBe('2');
  });

  it('should create an access URI from the link displayID', () => {
    const result = selectAccessUri.projector(sampleLink as any);

    expect(result).toBe('https://linkwire.cc/d');
  });
});
