import { AppState, NetInfo } from 'react-native'; //eslint-disable-line

export default callback => {
  let wasOnline;
  const updateState = isOnline => {
    if (wasOnline !== isOnline) {
      wasOnline = isOnline;
      callback(isOnline);
    }
  };

  NetInfo.isConnected.fetch().then((isConnected) => {
    updateState(isConnected);
    NetInfo.isConnected.addEventListener('change', updateState);
  });
  AppState.addEventListener('change', () => {
    NetInfo.isConnected.fetch().then(updateState);
  });
};
