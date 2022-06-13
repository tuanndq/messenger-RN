import {useCallObject} from './useCallObject';
import {useCallback, useEffect, useState} from 'react';

export const useMeetingState = () => {
  const callObject = useCallObject();
  const [meetingState, setMeetingState] = useState();

  const handleMeetingState = useCallback(async () => {
    const currentMeetingState = callObject?.meetingState();
    setMeetingState(currentMeetingState);
  }, [callObject]);

  /**
   * Start listening for meeting changes, when the callObject is set.
   */
  useEffect(() => {
    if (!callObject) {
      return;
    }
    const events = [
      'loading',
      'loaded',
      'load-attempt-failed',
      'joining-meeting',
      'joined-meeting',
      'left-meeting',
      'error',
    ];
    // Use initial state
    handleMeetingState();
    // Listen for changes in state
    for (const event of events) {
      callObject.on(event, handleMeetingState);
    }
    // Stop listening for changes in state
    return function cleanup() {
      for (const event of events) {
        callObject.off(event, handleMeetingState);
      }
    };
  }, [callObject, handleMeetingState]);

  return meetingState;
};
