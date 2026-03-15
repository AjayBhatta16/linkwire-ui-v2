import {
  createLink,
  createLinkSuccess,
  createLinkFailure,
  fetchLinkDetails,
  fetchLinkDetailsSuccess,
  fetchLinkDetailsFailure,
} from './link.actions';

describe('Link Actions', () => {
  it('should create createLink action with correct type and payload', () => {
    const payload = { redirectURL: 'https://example.com', note: 'note' };
    const action = createLink({ link: payload });

    expect(action.type).toBe('[Link] Create Link');
    expect(action.link).toBe(payload);
  });

  it('should create createLinkSuccess action with correct payload', () => {
    const payload = {
      trackingID: 't',
      displayID: 'd',
      redirectURL: 'https://example.com',
      note: 'note',
      useLogin: false,
      createdBy: 'u',
      clicks: [],
    };

    const action = createLinkSuccess({ link: payload as any });

    expect(action.type).toBe('[Link] Create Link Success');
    expect(action.link).toBe(payload);
  });

  it('should create createLinkFailure action with correct payload', () => {
    const error = new Error('fail');
    const action = createLinkFailure({ error });

    expect(action.type).toBe('[Link] Create Link Failure');
    expect(action.error).toBe(error);
  });

  it('should create fetchLinkDetails action with correct payload', () => {
    const action = fetchLinkDetails({ linkId: '123' });

    expect(action.type).toBe('[Link] Fetch Link Details');
    expect(action.linkId).toBe('123');
  });

  it('should create fetchLinkDetailsSuccess action with correct payload', () => {
    const payload = {
      trackingID: 't',
      displayID: 'd',
      redirectURL: 'https://example.com',
      note: 'note',
      useLogin: false,
      createdBy: 'u',
      clicks: [],
    };

    const action = fetchLinkDetailsSuccess({ link: payload as any });

    expect(action.type).toBe('[Link] Fetch Link Details Success');
    expect(action.link).toBe(payload);
  });

  it('should create fetchLinkDetailsFailure action with correct payload', () => {
    const error = new Error('fail');
    const action = fetchLinkDetailsFailure({ error });

    expect(action.type).toBe('[Link] Fetch Link Details Failure');
    expect(action.error).toBe(error);
  });
});
