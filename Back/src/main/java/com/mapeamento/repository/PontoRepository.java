package com.mapeamento.repository;

import com.mapeamento.model.Ponto;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PontoRepository extends MongoRepository<Ponto, String> {
    // Buscar pontos por descrição
    List<Ponto> findByDescricao(String descricao);

    // Buscar pontos por coordenadas
    List<Ponto> findByLatitudeAndLongitude(double latitude, double longitude);
}
