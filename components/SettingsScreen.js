// Importerer nødvendige moduler fra React, React Native og andre biblioteker
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert, Modal, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Til at vælge billeder
import * as Permissions from 'expo-permissions'; // Til at anmode om tilladelser
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Til at interagere med Firebase Firestore

function SettingsScreen() {
    // Bruger React hooks til at oprette og styre lokale state variabler
    const [name, setName] = useState(''); // Navn
    const [age, setAge] = useState(''); // Alder
    const [location, setLocation] = useState(''); // Lokation
    const [bio, setBio] = useState(''); 
    const [imageUri, setImageUri] = useState(null); //Billede
    const [preference, setPreference] = useState(null); // Til brugerens status
    const [showModal, setShowModal] = useState(false);

    // Funktion til at vælge billeder fra enten galleri eller kamera
    const pickImage = async (camera = false) => {
        let result;
        if (camera) {
            result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        }

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };


    // Funktion til at gemme en profil til Firebase Firestore
    const saveToFirestore = async (profile) => {
        const db = getFirestore();
        try {
            const docRef = await addDoc(collection(db, "profiles"), profile);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // Funktion til at håndtere gemning af brugerprofil
    const handleSaveProfile = () => {
        const profile = {
            name: name,
            age: age,
            location: location,
            bio: bio,
            imageUri: imageUri,
            preference: preference
        };
        saveToFirestore(profile);
        Alert.alert("Success", "Profil gemt!");
    };

    // Funktioner til at anmode om kamera og kamera rulle tilladelser
    const requestCameraPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
            alert('Undskyld, vi har brug for kamera-tilladelser');
            return false;
        }
        return true;
    };

    const requestCameraRollPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Undskyld, vi har brug for kamera-rulle tilladelser');
            return false;
        }
        return true;
    };

    // Funktion til at håndtere ændring af brugerens status (roomie eller søger værelse)
    const handlePreferenceChange = (selectedPreference) => {
        setPreference(selectedPreference);
        setShowModal(false);
    };

    const openStatusModal = () => {
        // Nulstil præference og placering, når du åbner statusmodal
        setPreference('');
        setLocation('');
        setShowModal(true);
    };

    // Returnerer for komponenten
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.text}>Indstillinger</Text>

            <Button title="Vælg et billede fra galleri" onPress={async () => {
                if (await requestCameraRollPermissionsAsync()) {
                    pickImage();
                }
            }} />

            <Button title="Tag et billede med kamera" onPress={async () => {
                if (await requestCameraPermissionsAsync()) {
                    pickImage(true);
                }
            }} />

            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <TextInput placeholder="Navn" value={name} onChangeText={setName} style={styles.input} />
            <TextInput placeholder="Alder" value={age} onChangeText={setAge} style={styles.input} keyboardType="numeric" />

            <Button title={preference ? "Ændre status" : "Vælg status"} onPress={openStatusModal} />

            {/* Modal for selecting status */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Vælg din status:</Text>
                    <TouchableOpacity onPress={() => handlePreferenceChange('roomie')}>
                        <Text style={styles.modalOption}>Søger roomie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePreferenceChange('room')}>
                        <Text style={styles.modalOption}>Søger værelse</Text>
                    </TouchableOpacity>
                    <Button title="Luk" onPress={() => setShowModal(false)} />
                </View>
            </Modal>

            {preference && (
                <TextInput
                    placeholder={preference === 'roomie' ? "Indtast din adresse" : "Indtast ønskede bydele"}
                    value={location}
                    onChangeText={setLocation}
                    style={styles.input}
                />
            )}

            <TextInput placeholder="Fortæl lidt om dig selv..." value={bio} onChangeText={setBio} style={styles.input} multiline />

            <Button title="Gem profil" onPress={handleSaveProfile} />
        </ScrollView>
    );
}

// Stylesheet for komponenten
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        paddingTop: 40,
        paddingBottom: 100,  
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
        marginBottom: 30,
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        marginBottom: 15,
        width: '80%',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 30,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        top: '30%',
        left: '10%',
        right: '10%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
    modalOption: {
        fontSize: 18,
        color: 'blue',
        marginBottom: 10
    }
});

// Eksporterer komponenten for at kunne bruges andre steder
export default SettingsScreen;
