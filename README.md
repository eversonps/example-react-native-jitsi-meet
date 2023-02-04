# Jitsi Meet Example for React Native

Before showing how I did jitsi meet work in react-native, I would like to share some problems that I faced using https://github.com/skrafft/react-native-jitsi-meet in different versions of react native and SDK Jitsi Meet.

Using RN 0.63.4 and SDK Jitsi Meet > 5.0.0: The Jitsi View component worked good, but other participants' screens and microphones appeared off even though they weren't. I believe it happens because the Jitsi Meet SDK < 5.0.0 is deprecated with the new jitsi meet server and no longer works correctly.

Using RN > 0.68 and SDK Jitsi Meet 5.1.0: I had problems with black screen and component events not triggering on android. Sometimes it worked if I opened the component, exited the app and opened the component again.

Then, I decided to look for other packages and found https://github.com/vidit-me/react-native-jitsi-meet. It worked fine for me on android and ios, so I'm pushing a example app setted up in this repository. For more details about how to set up the package in your app, access the repository.

## To run the example app

```sh
npm install
cd ios && pod install
npx react-native run-android # to android
npx react-native run-ios # to ios
```

## important informations
 
- This example app is tested only RN 0.70.4, maybe have problems for versions < 0.68 and need additional settings.

- If your project use react-native-reanimated and react-native-gesture-handler. its important install the next versions in package.json:

```sh
"react-native-gesture-handler": "2.2.1",
"react-native-reanimated": "1.13.4"
```


The latest versions of gradle don't support react-native-reanimated 1.13.4, if have problems with build, so add the next lines in your android/build.gradle

```sh
subprojects { subproject ->
   if(project['name'] == 'react-native-reanimated'){
       project.configurations { compile { } }
   }
}
```

it is necessary because the jitsi meet sdk does not support react-native-reanimated v1 and react-native-gesture-handler > 2.2.1 may cause problems with black screen.

- Also, if your app has problems with app is closing, make sure that enableHermes is false in your android/app/build.gradle.
