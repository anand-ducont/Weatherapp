import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import { requestLocationPermission } from '../services/requestPermissions';
import { fetchWeather } from '../services/weatherService';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const WeatherText = styled.Text`
  font-size: 18px;
  margin-top: 8px;
`;

const NewsButton = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 12px 20px;
  background-color: #007bff;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

const HomeScreen = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
  const getWeather = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Cannot fetch weather without location access');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      async position => {
        try {
          const data = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(data)
          setWeather(data);
        } catch {
          Alert.alert('Error', 'Failed to fetch weather');
        } finally {
          setLoading(false);
        }
      },
      error => {
        Alert.alert('Location Error', error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  getWeather();
}, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  const latestTemp = weather?.hourly?.temperature_2m?.[0] ?? 'N/A';
const timestamp = weather?.hourly?.time?.[0] ?? 'N/A';


  return (
    <Container>
      <Title>Weather Forecast</Title>
      <WeatherText>Temperature: {latestTemp}°C</WeatherText>
      <WeatherText>Time: {timestamp}</WeatherText>

      <NewsButton onPress={() => navigation.navigate('News' as never)}>
        <ButtonText>View News</ButtonText>
      </NewsButton>
    </Container>
  );
};

export default HomeScreen;