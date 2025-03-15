import axios from 'axios';

const API_KEY = 'SUA_CHAVE_DA_API_GOOGLE_MAPS'; // Substitua pela sua chave de API

export const geocodeAddress = async (endereco) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Endereço não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao geocodificar endereço:', error);
    throw error;
  }
};