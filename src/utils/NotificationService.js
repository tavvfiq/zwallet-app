import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
    this.lastId = 0;
  }
  // Handles a user push notification registration
  configure(onRegister, onNotification, gcm = '') {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: onRegister,

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: gcm,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }
  // Send a direct push notification to the user
  localNotif() {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      id: '' + this.lastId,
      bigText: 'My big text that will be shown when notification is expanded',
      subText: 'This is a subText',

      /* iOS and Android properties */
      title: 'Local Notification',
      message: 'My Notification Message',
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  }

  // Schedules a push notification by a given javascript Date object
  scheduleNotif(date, title, message) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: date,

      /* Android Only Properties */
      id: '' + this.lastId,
      bigText: '',
      subText: '',

      /* iOS and Android properties */
      title: title,
      message: message,
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
