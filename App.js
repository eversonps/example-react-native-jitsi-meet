import JitsiMeet, { JitsiMeetView } from '@vidit-me/react-native-jitsi-meet';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const conferenceOptions = {
  room: 'jitsimeettestreactnative',
  userInfo: {
    displayName: 'User Example',
    email: 'example@test.com',
    avatar: 'https://picsum.photos/200',
  },
  featureFlags: {
    'live-streaming.enabled': true,
  },
};

function App() {
  const [showJitsiView, setShowJitsiView] = useState(false);
  const startJitsiAsNativeController = async () => {
    /* 
      Mode 1 - Starts a new Jitsi Activity/UIViewController on top of RN Application (outside of JS).
      It doesn't require rendering JitsiMeetView Component.
    */

    await JitsiMeet.launchJitsiMeetView(conferenceOptions)

    /*
      Note:
        JitsiMeet.launchJitsiMeetView will return a promise, which is resolved once the conference is terminated and the JitsiMeetView is dismissed.
    */
  };

  /*
    The localParticipant leaves the current conference.
  */

  if (showJitsiView) {
    /* Mode 2 - Starts Jitsi as a RN View */

    return (
      <JitsiMeetView
        style={styles.jitsiMeetView}
        options={conferenceOptions}
        onConferenceTerminated={(_) => setShowJitsiView(false)}
        onConferenceJoined={(_) => console.log('joined')}
        onConferenceWillJoin={(_) => console.log('will join')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowJitsiView(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start Jitsi as a RN View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={startJitsiAsNativeController}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Start Jitsi on top of RN Application
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '70%',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#343a40',
  },
  buttonText: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  jitsiMeetView: {
    flex: 1,
  },
});

export default App;