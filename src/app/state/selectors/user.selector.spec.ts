import { selectDisplayLinks } from './user.selector';

const sampleUser = {
  username: 'u',
  email: 'e',
  premiumUser: false,
  links: [
    {
      trackingID: 't1',
      displayID: 'd1',
      redirectURL: 'https://example.com',
      note: 'note1',
      useLogin: false,
      createdBy: 'user',
      clicks: [{ clickID: 'c1', ip: '1.1.1.1', linkID: 'l', timestamp: 1, userAgent: 'ua', os: 'os', client: 'c', device: 'd', location: 'loc', isp: 'isp', mobile: false, proxy: false, hosting: false, asn: 'asn' }],
    },
  ],
};

describe('User Selectors', () => {
  it('should map user links to display links', () => {
    const result = selectDisplayLinks.projector(sampleUser as any);

    expect(result.length).toBe(1);
    expect(result[0].trackingID).toBe('t1');
    expect(result[0].clickCount).toBe(1);
    expect(result[0].accessURL).toBe('https://linkwire.cc/d1');
  });
});
