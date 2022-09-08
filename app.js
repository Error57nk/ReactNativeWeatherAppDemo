/**
 * Sample React Native Weather App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState} from 'react';
import type {Node} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { getWeather, dailyForecast, showWeather, getLocation } from 'react-native-weather-api';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,Image,
  TextInput,
  Button,
  useColorScheme,
  PermissionsAndroid,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const API_KEY = '**your-key-here**';
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [resText, setResText] = useState("Result Here")
  const [cityName, setcityName] = useState("siliguri")
  const [CountryName, setCountryName] = useState("IND")
  const [imageUrl, setimageUrl] = useState("https://www.openweathermap.org/img/w/10n.png")
  const granted = PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
  var resTest = "";
  
  if (granted) {
    resTest = "You can use the ACCESS_FINE_LOCATION" ;
  } 
  else {
    resTest = "ACCESS_FINE_LOCATION permission denied" ;
  }
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getCurrentGeoLoc = () => {    
    setResText("Btn Clicked :: Getting Result")
    Geolocation.getCurrentPosition(info => {
      console.log("Geolocation:: ",info)
      let keys = ""
      for(let key in info){
        keys += key + " -> " + info[key] + " || ";
      }
      setResText("op::" + keys)
    });
  }
  
  const CurrgetWeather = () =>{
      var temp;
      var wind;
      setResText("Btn Click Getting Res::")
      getLocation().then((location) => {
            
      getWeather({

        key: API_KEY,
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        unit: "metric"

      }).then(() => {

        var data = new showWeather();
        temp = data.temp;
        wind = data.wind;
        var Result = ""
        for(let key in data){
          Result += key + " : " + data[key] + "\n";
          if(key == 'icon'){
             setimageUrl(data[key])
          }
        }
        setResText("Curr Loc Report of :: " + "\n" + Result)
      });

      });
  }

  const getWeatherReport = () =>{
      var temp;
      var wind;
       setResText("Weather Report of :: **");
      getWeather({
            
        key: API_KEY,
        city: cityName,
        country: CountryName

      }).then(() => {

        var data = new showWeather();
        temp = data.temp;
        wind = data.wind;
        var Result = ""
        for(let key in data){
          Result += key + " : " + data[key] + "\n";
          if(key == 'icon'){
            setimageUrl(data[key])
          }
        }
        setResText("Weather Report of :: " + CountryName + " | " + cityName + "\n" + Result)
      });
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.header}>
        <Text style={styles.headertxt}>{"Welcome "}</Text>
        <Text style={styles.headertxt}>{"to Weather Api"}</Text>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <Image style={styles.tinyLogo}  source={{uri: imageUrl}}   />
          
            <Text style={styles.txtStyl}>{resTest}</Text>
            <Text style={styles.txtStyl}>{resText} </Text>
           <Button style={styles.btnStyl} onPress={getCurrentGeoLoc} title="Current Location">Current Location</Button>
           <Button style={styles.btnStyl} onPress={CurrgetWeather} title="Current Weather">Current Location</Button>
           <Text style={styles.txtStyl}>Country:: {CountryName} || City :: {cityName}</Text>
            <TextInput
              style={styles.input}
              onChangeText={ value =>setCountryName(value)}
              value={CountryName}
            />
            <TextInput
              style={styles.input}
              onChangeText={ value =>setcityName(value)}
              value={cityName}
            />
          <Button style={styles.btnStyl} onPress={getWeatherReport} title={`Get Wether of ${CountryName}|${cityName}`}/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  txtStyl :{
    color : "white"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  tinyLogo:{
    height:100,
    width:100,
  },
  header:{
    padding:20,
      flex:1
    ,alignItems: 'center',
    justifyContent: 'center',
  },
  headertxt:{
    color : "white"
    ,fontSize: 28
    ,fontWeight: '400'
   
  },
  btnStyl:{    margin:20,
   
  }
});

export default App;
