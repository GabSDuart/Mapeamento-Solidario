import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapaScreen = () => {
  const [pontos, setPontos] = useState([]);

  // Busca os pontos do backend
  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/pontos');
        const data = await response.json();
        setPontos(data);
      } catch (error) {
        console.error('Erro ao buscar pontos:', error);
      }
    };

    fetchPontos();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -31.769926, // Coordenadas iniciais (ex: Pelotas, RS)
          longitude: -52.341109,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
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