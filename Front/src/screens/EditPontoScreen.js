import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const EditPontoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pontoId } = route.params; // Recebe o ID do ponto selecionado
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const doc = await firestore().collection('pontos').doc(pontoId).get();
        if (doc.exists) {
          const data = doc.data();
          setNome(data.nome);
          setDescricao(data.descricao);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do ponto.');
      }
    };

    carregarDados();
  }, [pontoId]);

  const handleSalvar = async () => {
    try {
      await firestore().collection('pontos').doc(pontoId).update({
        nome,
        descricao,
      });
      Alert.alert('Sucesso', 'Ponto atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o ponto.');
    }
  };

  const handleExcluir = async () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir este ponto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore().collection('pontos').doc(pontoId).delete();
              Alert.alert('Sucesso', 'Ponto excluído com sucesso!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o ponto.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Ponto:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do ponto"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Digite a descrição"
      />

      <Button title="Salvar Alterações" onPress={handleSalvar} />
      <Button title="Excluir Ponto" onPress={handleExcluir} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default EditPontoScreen;
