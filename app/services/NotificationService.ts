import PushNotification from 'react-native-push-notification';

export const INIT_PUSH_NOTIFICATION = (): void => {
  PushNotification.configure({
    onRegister: function (token) {},

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotification.message as string);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {},

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
  PushNotification.createChannel(
    {
      channelId: 'zwallet-notification', // (required)
      channelName: 'Zwallet', // (required)
    },
    (created) => {},
  );
};

export const LocalNotification = (title: string, message: string) => {
  PushNotification.localNotification({
    channelId: 'zwallet-notification',
    title,
    message,
  });
};
