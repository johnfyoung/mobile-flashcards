import { AsyncStorage, Platform } from 'react-native';
import { Notifications, Permissions } from 'expo';
import isEmpty from './is-empty';

const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function clearLocalNotification() {
    AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('MobileFlashCardStudy', {
            name: "Mobile Flash Card Study Notifications",
            description: "Get daily reminders to study",
            sound: true,
            vibrate: true,
            priority: 'high'
        })
    }

    return {
        title: 'Mobile Flash Cards',
        body: '👋 don\'t forget to study today',
        ios: {
            sound: true
        },
        android: {
            channel: 'MobileFlashCardStudy',
            sticky: false,
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.setItem(NOTIFICATION_KEY, '')
        .then(JSON.parse)
        .then((data) => {
            if (isEmpty(data)) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(17);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                        }
                    })
            }
        })
}