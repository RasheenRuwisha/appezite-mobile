import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification'
import { useDispatch } from 'react-redux';
import { NOTIFICATION_TOKEN } from '../actions/types';

const RemotePushController = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token)
        dispatch({type:NOTIFICATION_TOKEN, payload:token.token})
      },
// (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)
// process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '581287295658',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
return null
}
export default RemotePushController