import firebase from 'firebase'

class FirebaseApp {
   config = {
      apiKey: "AIzaSyBA-mK4ZIpdRSbNV4skzvT_uFP5aPdOlM4",
      authDomain: "polinema-seameo-ecanteen.firebaseapp.com",
      databaseURL: "https://polinema-seameo-ecanteen.firebaseio.com",
      projectId: "polinema-seameo-ecanteen",
      storageBucket: "polinema-seameo-ecanteen.appspot.com",
      messagingSenderId: "170572483397",
      appId: "1:170572483397:web:080183c3b4482c0e"
   }

   constructor() {
      if(! firebase.apps.length)
         firebase.initializeApp(this.config)
      
      this.checkout = firebase.database().ref('ecanteen/order')
      this.queue = firebase.database().ref('ecanteen/queue')
      this.waiterHelper = firebase.database().ref('ecanteen/waiter/help')
      this.waiterDeliver = firebase.database().ref('ecanteen/waiter/delivery')
      this.menu = firebase.firestore().collection("items")
   }
}

export default FirebaseApp