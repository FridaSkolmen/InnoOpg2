// Importer de nødvendige komponenter og moduler
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
// Importerer Swiper-komponenten fra 'react-native-deck-swiper' biblioteket
import Swiper from 'react-native-deck-swiper';

// Refererer til ikonerne i assets-mappen
const heartIcon = require('../assets/greenHeart.png');
const crossIcon = require('../assets/redCross.png');

function HomeScreen({ prop }) {
    // Eksempler på brugerprofiler, da databasen ikke fungerer lige pt.
    const profiles = [
        { id: 1, name: 'Maria Jensen', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Pia_Kj%C3%A6rsgaard_%282014%29.JPG' },
        { id: 2, name: 'Tobias Hansen', image: 'https://asset.dr.dk/imagescaler/?protocol=https&server=www.dr.dk&file=%2Fimages%2Fcrop%2F2022%2F01%2F15%2F1642251315_scanpix-20200831-164224-l.jpg&scaleAfter=crop&quality=70&w=720&h=405' },
        { id: 3, name: 'Asta Wivel', image: 'https://www.alt.dk/media/3f54717f71024104859f0261549b0a31/4d35891c521b478c884ff1b86389c3f4.jpg?width=1920' },
        { id: 4, name: 'Mikkel Nielsen', image: 'https://pensionistunderholdning.dk/wp-content/uploads/2023/02/johnny_hansen.jpeg' },
    ];

    // Funktioner der bliver kaldt, når brugeren swiper
    const onSwipedLeft = (index) => {
        console.log("Swipe til venstre for dislike med:", profiles[index].name);
    }

    const onSwipedRight = (index) => {
        console.log("Swipe til højre for match med:", profiles[index].name);
    }

    // Returnerer for komponenten
    return (
        <View style={styles.container}>
            <Swiper
            cards={profiles} 
                renderCard={(card) => (
                    <View style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.image} />
                        <Text style={styles.name}>{card.name}</Text>

                        <View style={styles.iconContainer}>
                            <Image source={crossIcon} style={styles.icon} />
                            <Image source={heartIcon} style={styles.icon} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

// Eksporterer HomeScreen-komponenten for senere brug i appen
export default HomeScreen;

// Stylesheet for komponenten
const styles = StyleSheet.create({
    container: {
        borderColor: 'pink',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    card: {
        width: '80%',  
        height: '60%', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    name: {
        fontSize: 30, 
    },
    image: {
        width: 250,  
        height: 250, 
        borderRadius: 125, 
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    icon: {
        width: 40,
        height: 40,
    }
});
