import { Image, StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ConnexionScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('@/assets/images/onBoarding.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.textOverlay}>
                    <Text style={styles.overlayText}>Ensemble, donnons du sens à vos finances</Text>
                </View>
            </View>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Bienvenue chez WalletHub</Text>
            </View>


            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button]}
                    onPress={() => navigation.navigate('register')}
                >
                    <Text style={[styles.buttonText, styles.buttonText]}>Devenir client</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    imageContainer: {
        height: SCREEN_HEIGHT * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonsContainer: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    button: {
        backgroundColor: '#F0F1F5',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
    },

    textOverlay: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: [{ translateX: -150 }, { translateY: -20 }],
        width: 300,
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    overlayText: {
        color: 'white',
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
    },

});
