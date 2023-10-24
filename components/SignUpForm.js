// Importerer nødvendige komponenter fra React Native og Firebase
import React, {useState} from 'react';
import {Button, Text, View, TextInput, ActivityIndicator, StyleSheet,} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Definerer SignUpForm-komponenten, som håndterer brugeroprettelse
function SignUpForm() {
    
    // Initialiserer lokale state-variabler til at håndtere e-mail, adgangskode, fuldførelsesstatus og eventuelle fejlmeddelelser
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    // Initialiserer Firebase autentificering
    const auth = getAuth()

    // Definerer en funktion, der returnerer en knap til brugeroprettelse
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Opret bruger" />;
    };

    // Funktionen håndterer brugeroprettelse ved hjælp af Firebase's createUserWithEmailAndPassword
      const handleSubmit = async() => {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Brugeren er oprettet og brugeroplysninger kan tilgås her
          const user = userCredential.user;
        })
        .catch((error) => {
        // Hvis der opstår en fejl under brugeroprettelse, sættes fejlmeddelelsen
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage)
        });
      }

// Definerer brugergrænsefladen for komponenten her
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && ( //errorMessage får fastsat en værdi, skal denne udskrives i en tekstkomponent.
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

// Styling til SignUpForm-komponenten
const styles = StyleSheet.create({
    error: {
        color: 'beige',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300
    },
    header: {
        fontSize: 40,
    },
});

// Eksporterer SignUpForm-komponenten, så den kan bruges i andre dele af appen
export default SignUpForm