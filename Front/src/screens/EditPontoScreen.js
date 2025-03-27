import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const EditPontoScreen = ({ navigation, route }) => {
  const [point, setPoint] = useState(null);

  useEffect(() => {
    fetchPointDetails();
  }, []);

  const fetchPointDetails = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`YOUR_API_ENDPOINT/points/${route.params.id}`);
      const data = await response.json();
      setPoint(data);
    } catch (error) {
      console.error('Error fetching point details:', error);
    }
  };

  if (!point) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{point.name}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: point.latitude,
              longitude: point.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
            />
          </MapView>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{point.description}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Map')}
        >
          <Text style={styles.buttonText}>Voltar ao Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    padding: 20,
  },
  mapContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditPontoScreen;