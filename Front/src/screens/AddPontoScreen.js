import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { geocodeAddress } from '../utils/geocoding';

const AddPontoScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [coordenadas, setCoordenadas] = useState({
    latitude: -31.769926, // Coordenadas iniciais (ex: Pelotas, RS)
    longitude: -52.341109,
  });

  // Função para buscar coordenadas a partir do endereço
  const handleBuscarEndereco = async () => {
    if (!endereco) {
      Alert.alert('Erro', 'Por favor, insira um endereço.');
      return;
    }

    try {
      const coords = await geocodeAddress(endereco);
      setCoordenadas(coords);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível encontrar o endereço.');
    }
  };

  // Função para cadastrar um novo ponto
  const handleCadastrarPonto = async () => {
    if (!descricao || !coordenadas) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoPonto = {
      descricao: descricao,
      latitude: coordenadas.latitude,
      longitude: coordenadas.longitude,
    };

    try {
      const response = await fetch('http://localhost:8080/api/pontos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPonto),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Ponto cadastrado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar o ponto.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Ponto</Text>

      {/* Campo de Descrição */}
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* Campo de Endereço */}
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      {/* Botão para buscar endereço */}
      <TouchableOpacity style={styles.button} onPress={handleBuscarEndereco}>
        <Text style={styles.buttonText}>Buscar Endereço</Text>
      </TouchableOpacity>

      {/* Mapa para seleção de localização */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordenadas.latitude,
          longitude: coordenadas.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => setCoordenadas(e.nativeEvent.coordinate)} // Atualiza as coordenadas ao tocar no mapa
      >
        <Marker coordinate={coordenadas} />
      </MapView>

      {/* Botão de Cadastrar */}
      <TouchableOpacity style={styles.button} onPress={handleCadastrarPonto}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    marginBottom: 15,
  },
});

export default AddPontoScreen;