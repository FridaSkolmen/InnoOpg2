// Importerer nødvendige komponenter fra React Native og Firebase
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Definerer ProfileScreen-komponenten
function ProfileScreen () {

    // Initialiserer Firebase autentificering
    const auth = getAuth();
    const user = auth.currentUser
    
    // Funktionen håndterer log ud af en aktiv bruger ved hjælp af Firebase's signOut
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            // Log ud var succesfuld
          }).catch((error) => {
            // Der opstod en fejl under log ud
          });
    };

    // Hvis brugeren ikke er logget ind, vises en fejlbesked
    if (!auth.currentUser) {
        return <View><Text>Bruger ikke fundet</Text></View>;
    }

    // Opretter en fanebaseret navigation
    const Tab = createBottomTabNavigator();
    return (
        /*
        <View style={styles.container} >
            <Text>Current user: {user.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>*/

        // Indeholder fanebaseret navigation med to skærme: SettingsScreen og HomeScreen
        <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Min side" component={SettingsScreen} />
          <Tab.Screen name="Udforsk" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );

}

// Definerer stylingen til ProfileScreen-komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

// Eksporterer ProfileScreen-komponenten, så den kan bruges i andre dele af appen
export default ProfileScreen