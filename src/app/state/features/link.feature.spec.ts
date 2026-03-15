import { linkFeature, initialLinkState } from './link.feature';
import {
  createLink,
  createLinkSuccess,
  createLinkFailure,
  fetchLinkDetails,
  fetchLinkDetailsSuccess,
  fetchLinkDetailsFailure,
} from '../actions/link.actions';

const sampleLink = {
  trackingID: 'tracking',
  displayID: 'display',
  redirectURL: 'https://example.com',
  note: 'note',
  useLogin: false,
  createdBy: 'user',
  clicks: [],
};

describe('Link Feature Reducer', () => {
  it('should set loading true when creating link', () => {
    const nextState = linkFeature.reducer(initialLinkState, createLink({ link: { redirectURL: 'a', note: 'b' } }));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set link and clear loading on createLinkSuccess', () => {
    const nextState = linkFeature.reducer(initialLinkState, createLinkSuccess({ link: sampleLink as any }));

    expect(nextState.link).toBe(sampleLink);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should set error and clear loading on createLinkFailure', () => {
    const error = new Error('fail');
    const nextState = linkFeature.reducer(initialLinkState, createLinkFailure({ error }));

    expect(nextState.error).toBe(error);
    expect(nextState.loading).toBe(false);
  });

  it('should set loading true when fetching link details', () => {
    const nextState = linkFeature.reducer(initialLinkState, fetchLinkDetails({ linkId: '123' }));

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should set link and clear loading on fetchLinkDetailsSuccess', () => {
    const nextState = linkFeature.reducer(initialLinkState, fetchLinkDetailsSuccess({ link: sampleLink as any }));

    expect(nextState.link).toBe(sampleLink);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should set error and clear loading on fetchLinkDetailsFailure', () => {
    const error = new Error('fail');
    const nextState = linkFeature.reducer(initialLinkState, fetchLinkDetailsFailure({ error }));

    expect(nextState.error).toBe(error);
    expect(nextState.loading).toBe(false);
  });
});
