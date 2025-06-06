import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ImageBackground, 
  ScrollView, 
  Dimensions, 
  StyleSheet, 
  NativeScrollEvent, 
  NativeSyntheticEvent, 
  TouchableOpacity,
  Animated
} from 'react-native';
// import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';
import { Vibration } from 'react-native';

const { width, height } = Dimensions.get('window');
const image = require('@/assets/images/onBoarding.png');

const onboardingData = [
  {
    title: 'WalletHub',
    subtitle: 'Votre nouvelle vision 360° de toutes vos finances. Une seule app, tous vos comptes, zéro stress.',
  },
  {
    title: 'Suivi clair, budget maîtrisé',
    subtitle: 'Visualisez vos dépenses, suivez vos budgets, recevez des alertes intelligentes. Votre argent, vos règles.',
  },
  {
    title: 'Vos données sont protégées',
    subtitle: 'Chiffrement de bout en bout, connexion biométrique, aucune revente de vos données. Votre vie privée est entre de bonnes mains.',
  },
  {
    title: "On s'y met ?",
    subtitle: "Connectez votre première banque maintenant et découvrez la puissance WalletHub.",
    button: "Commencer",
  },
];

async function requestNotificationPermission() {
  // const { status } = await Notifications.getPermissionsAsync();

  // if (status !== 'granted') {
  //   const { status: newStatus } = await Notifications.requestPermissionsAsync();
  //   if (newStatus !== 'granted') {
  //     Alert.alert(
  //       "Permission refusée",
  //       "Vous devez autoriser les notifications pour recevoir des alertes importantes."
  //     );
  //   }
  // }
  // console.log(status)
}

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.9)).current;
  const dotAnimValues = useRef(onboardingData.map(() => new Animated.Value(0.5))).current;

  useEffect(() => {
    dotAnimValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === currentPage ? 1 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
    
    if (!isScrolling) {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    
    if (currentPage === onboardingData.length - 1) {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      buttonScale.setValue(0.9);
    }
  }, [currentPage, isScrolling]);

  const handleScrollBegin = () => {
    setIsScrolling(true);
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 200, 
      useNativeDriver: true,
    }).start();
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    scrollX.setValue(xOffset);
    
    const page = Math.round(xOffset / width);
    
    if (Math.abs(xOffset - (currentPage * width)) > 10) {
      if (!isScrolling) {
        handleScrollBegin();
      }
    }
    
    if (Math.abs(xOffset - (page * width)) < 5) {
      if (page !== currentPage) {
        setCurrentPage(page);
        Vibration.vibrate([0, 50]); 
      }
      
      if (isScrolling) {
        handleScrollEnd();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundFixed} resizeMode="cover">
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false, listener: handleScroll }
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          ref={scrollRef}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {onboardingData.map((item, index) => (
            <View key={index} style={[styles.slide, { width }]}>
              <Animated.View style={[styles.contentContainer, { opacity: textOpacity }]}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                
                {item.button && (
                  <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                    <TouchableOpacity style={styles.button} onPress={async () => { await requestNotificationPermission(); onFinish();}}>
                      <Text style={styles.buttonText}>{item.button}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                )}
              </Animated.View>
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.paginationContainer}>
          {onboardingData.map((_, dotIndex) => (
            <Animated.View
              key={dotIndex}
              style={[
                styles.paginationDot,
                { 
                  opacity: dotAnimValues[dotIndex],
                  transform: [{ scale: dotAnimValues[dotIndex].interpolate({
                    inputRange: [0.5, 1],
                    outputRange: [1, 1.3]
                  })}]
                }
              ]}
            />
          ))}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundFixed: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    height: '100%', 
    backgroundColor: 'transparent',
  },
  slide: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingBottom: 80,
    marginTop: 20,
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#F0F1F5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 80,
    paddingBottom: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});