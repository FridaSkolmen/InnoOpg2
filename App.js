// Importer nødvendige React hooks og komponenter
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Importer Firebase-tjenester til authentificering
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importer Card-komponent fra react-native-paper for UI formål
import { Card } from 'react-native-paper';

// Importer brugerdefinerede komponenter fra components-mappen
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';


// Firebase konfigurationsobjekt
const firebaseConfig = {
  apiKey: "AIzaSyAPCCi9_R8NO17kOYV9FGAuteRWYjcmmMQ",
  authDomain: "tinder-d0cf3.firebaseapp.com",
  projectId: "tinder-d0cf3",
  storageBucket: "tinder-d0cf3.appspot.com",
  messagingSenderId: "791457400652",
  appId: "1:791457400652:web:18819897d572e7373731e9"
};

// App-komponenten
export default function App() {
  // State for at holde styr på brugerens login status
  const [user, setUser] = useState({ loggedIn: false });

  // Initialiser Firebase kun, hvis det endnu ikke er startet
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase er igang");
  } else {
    console.log("Firebase kører ikke");
  }
 
  const auth = getAuth();

  // Funktion for at lytte til autentificeringsstatusændringer
  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // Bruger logget ind
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("Du er nu logget ind!");
      } else {
        // Bruger logget ud
        callback({loggedIn: false});
      }
    });
  }

 // Ved montering af komponenten, opret en lytter til brugerens authentificeringsstatus
useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // Gæstekomponent: Viser sign-up og login-formularer
  const GuestPage = () => {
    return(
        <View style={styles.container}>
          <Text style={styles.paragraph}>
            Opret eller Login med din Email
          </Text>
          
          <Card style={{padding:20, margin: 20}}>
            <SignUpForm />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <LoginForm />
          </Card>

        </View>
    )
  }
  // Hvis brugeren er logget ind, vis ProfileScreen; ellers vis gæstesiden
  return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;
}

// Styling for denne komponent
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
