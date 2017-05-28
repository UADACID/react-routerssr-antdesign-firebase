import * as firebase from 'firebase';
import Config from './Config';

const app = firebase.initializeApp(Config.firebaseInit);

export default app;
