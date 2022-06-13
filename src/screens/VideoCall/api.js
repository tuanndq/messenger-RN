const newRoomEndpoint =
  'https://f433xwze36.execute-api.us-west-2.amazonaws.com/default/dailyRnDemoNewCall';

async function createRoom() {
  let response = await fetch(newRoomEndpoint);
  return await response.json();
}

export default {createRoom};
