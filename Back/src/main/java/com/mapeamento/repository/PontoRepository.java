package com.mapeamento.repository;

import com.mapeamento.model.Ponto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PontoRepository extends MongoRepository<Ponto, String> {
    // Métodos padrão do MongoRepository já estão disponíveis:
    // - save(), findById(), findAll(), deleteById(), etc.

    // Exemplo de método personalizado para buscar pontos por descrição
    List<Ponto> findByDescricao(String descricao);

    // Exemplo de método personalizado para buscar pontos por latitude e longitude
    List<Ponto> findByLatitudeAndLongitude(double latitude, double longitude);
}