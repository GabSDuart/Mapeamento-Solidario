import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env';

const MapaScreen = () => {
  const [pontos, setPontos] = useState([]);

  // Coordenadas iniciais do mapa (Novas coordenadas fornecidas)
  const initialRegion = {
    latitude: -31.769926, // Latitude fornecida
    longitude: -52.341109, // Longitude fornecida
    latitudeDelta: 0.01, // Zoom mais próximo
    longitudeDelta: 0.01, // Zoom mais próximo
  };

  // Simulação de dados da API
  useEffect(() => {
    // Substitua isso pela chamada real à sua API
    const fakeData = [
      {
        id: '1',
        descricao: 'Local Principal',
        latitude: -31.769926, // Latitude fornecida
        longitude: -52.341109, // Longitude fornecida
      },
      {
        id: '2',
        descricao: 'Ponto Próximo',
        latitude: -31.7705, // Um ponto próximo
        longitude: -52.3420,
      },
    ];
    setPontos(fakeData);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider="google" // Usa o Google Maps como provedor
      >
        {pontos.map((ponto) => (
          <Marker
            key={ponto.id}
            coordinate={{
              latitude: ponto.latitude,
              longitude: ponto.longitude,
            }}
            title={ponto.descricao}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapaScreen;