import {DailyTrackState} from '@daily-co/react-native-daily-js';
import {DailyParticipant} from '@daily-co/react-native-daily-js';

/**
 * Call state is comprised of:
 * - "Call items" (inputs to the call, i.e. participants or shared screens)
 * - Error state
 */
/**
 * Call items are keyed by id:
 * - "local" for the current participant
 * - A session id for each remote participant
 * - "<id>-screen" for each shared screen
 */

const initialCallState = {
  callItems: {
    local: {
      audioTrackState: null,
      videoTrackState: null,
    },
  },
  camOrMicError: null,
  fatalError: null,
};

// --- Actions ---

/**
 * PARTICIPANTS_CHANGE action structure:
 * - type: string
 * - participants: Object (from Daily.co callObject.participants())
 */
const PARTICIPANTS_CHANGE = 'PARTICIPANTS_CHANGE';

/**
 * CAM_OR_MIC_ERROR action structure:
 * - type: string
 * - message: string
 */
const CAM_OR_MIC_ERROR = 'CAM_OR_MIC_ERROR';

/**
 * CAM_OR_MIC_ERROR action structure:
 * - type: string
 * - message: string
 */
const FATAL_ERROR = 'FATAL_ERROR';

// --- Reducer and helpers --

function callReducer(callState, action) {
  switch (action.type) {
    case PARTICIPANTS_CHANGE:
      const callItems = getCallItems(action.participants);
      return {
        ...callState,
        callItems,
      };
    case CAM_OR_MIC_ERROR:
      return {...callState, camOrMicError: action.message};
    case FATAL_ERROR:
      return {...callState, fatalError: action.message};
    default:
      throw new Error();
  }
}

function getCallItems(participants) {
  let callItems = {...initialCallState.callItems}; // Ensure we *always* have a local participant
  for (const [id, participant] of Object.entries(participants)) {
    callItems[id] = {
      videoTrackState: participant.tracks.video,
      audioTrackState: participant.tracks.audio,
    };
    if (shouldIncludeScreenCallItem(participant)) {
      callItems[id + '-screen'] = {
        videoTrackState: participant.tracks.screenVideo,
        audioTrackState: participant.tracks.screenAudio,
      };
    }
  }
  return callItems;
}

function shouldIncludeScreenCallItem(participant) {
  const trackStatesForInclusion = ['loading', 'playable', 'interrupted'];
  return (
    trackStatesForInclusion.includes(participant.tracks.screenVideo.state) ||
    trackStatesForInclusion.includes(participant.tracks.screenAudio.state)
  );
}

// --- Derived data ---

// True if id corresponds to local participant (*not* their screen share)
function isLocal(id) {
  return id === 'local';
}

function isScreenShare(id) {
  return id.endsWith('-screen');
}

function containsScreenShare(callItems) {
  return Object.keys(callItems).some(id => isScreenShare(id));
}

function participantCount(callItems) {
  return Object.keys(callItems).length;
}

function getMessage(callState, roomUrl) {
  let header = null;
  let detail = null;
  let isError = false;
  if (callState.fatalError) {
    header = `Fatal error: ${callState.fatalError}`;
    isError = true;
  } else if (callState.camOrMicError) {
    header = `Camera or mic access error: ${callState.camOrMicError}`;
    detail =
      'See https://help.daily.co/en/articles/2528184-unblock-camera-mic-access-on-a-computer to troubleshoot.';
    isError = true;
  } else if (participantCount(callState.callItems) === 1) {
    header = 'Copy and share this URL to invite others';
    detail = roomUrl;
  }
  return header ? {header, detail, isError} : null;
}

export {
  initialCallState,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  isScreenShare,
  containsScreenShare,
  participantCount,
  getMessage,
};
