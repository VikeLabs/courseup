/**
 * This Gist is part of a medium article - read here:
 * https://jamiecurnow.medium.com/using-firestore-with-typescript-65bd2a602945
 */

// import firstore (obviously)
import { firestore } from 'firebase-admin';

// Import or define your types
// import { YourType } from '~/@types'

const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  firestore().collection(collectionPath).withConverter(converter<T>());

const db = {
  // list your collections here
  // users: dataPoint<YourType>('users')
  sectionMappings: dataPoint<{ crns: string[] }>('section_mappings'),
};

export { db };
