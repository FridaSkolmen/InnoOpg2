// Importerer nødvendige React hooks, React Native komponenter og Firebase-funktioner
import React, { useState} from 'react';
import {Button, Text, View, TextInput, ActivityIndicator, StyleSheet,} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// LoginForm-komponenten, der håndterer brugerlogin
function LoginForm() {

    // Initialiserer Firebase autentificering
    const auth = getAuth();

    // Initialiserer lokale statevariabler for e-mail, adgangskode, færdiggørelsesstatus og fejlmeddelelser
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    // Funktionen håndterer login-processen ved at kalde Firebase's signInWithEmailAndPassword-metode
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Brugeren er logget ind, og brugeroplysninger kan tilgås her
            const user = userCredential.user;
        })
        .catch((error) => {
            // Hvis der opstår en fejl under login, sættes fejlmeddelelsen
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    // Denne funktion definerer og returnerer login-knappen
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Login" />;
    };

// Definerer brugergrænsefladen for komponenten her
    return (
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

// Definerer stylingen for LoginForm-komponenten ved hjælp af React Native's StyleSheet
const styles = StyleSheet.create({
    error: {
        color: 'red',
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

// Eksporterer LoginForm-komponenten, så den kan importeres og bruges i andre filer
export default LoginForm;