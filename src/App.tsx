import { StyleSheet, Text, View, Image, Animated, Easing, ImageSourcePropType, Pressable, } from 'react-native'
import {trigger} from 'react-native-haptic-feedback'
import React, { PropsWithChildren,useRef,useState } from 'react'
import DiceOne from '../assets/dice-one.png'
import DiceTwo from '../assets/dice-two.png'
import DiceThree from '../assets/dice-three.png'
import DiceFour from '../assets/dice-four.png'
import DiceFive from '../assets/dice-five.png'
import DiceSix from '../assets/dice-six.png'
type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType,
  animatedStyle: any;
}>;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};
const Dice = ({ imageUrl,animatedStyle }: DiceProps): JSX.Element => {
  return(
    <Animated.View style={animatedStyle}>
      <Image style={styles.image} source={imageUrl}/>
    </Animated.View>
  )
}
const App = (): JSX.Element => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  function rollDice() {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.5,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
    let random = Math.floor(Math.random() * 6) + 1;
    switch (random) {
      case 1:
        setDiceImage(DiceOne);
        break;
      case 2:
        setDiceImage(DiceTwo);
        break;
      case 3:
        setDiceImage(DiceThree);
        break;
      case 4:
        setDiceImage(DiceFour);
        break;
      case 5:
        setDiceImage(DiceFive);
        break;
      case 6:
        setDiceImage(DiceSix);
        break;
      default:
        setDiceImage(DiceOne)
    }
    trigger('impactLight', options);
  }
  const animatedStyle = {
    transform: [{ scale: scaleAnimation }],
  };
  return (
    <View style={styles.container}>
      <Dice imageUrl={diceImage} animatedStyle={animatedStyle} />
      <Pressable onPress={rollDice} style={styles.button} android_ripple={{ color: 'lightblue', borderless: false }}>
        <Text style={styles.buttonText}>Roll</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1d1d1d',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
  image: {
    width: 200,
    height: 200,
  },
  button:{
    backgroundColor: 'royalblue',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 160,
    marginTop: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default App