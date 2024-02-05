// import firebase from 'firebase/app';

export function logEvent(
  eventName: string,
  eventParams?:
    | {
        [key: string]: any;
      }
    | undefined,
  options?: any
): void {
  // if (process.env.NODE_ENV === 'production' || process.env.REACT_APP_ANALYTICS) {
  //   firebase.analytics().logEvent(eventName, eventParams);
  // }
}
