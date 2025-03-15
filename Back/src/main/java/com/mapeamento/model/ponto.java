package com.mapeamento.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pontos") // Define o nome da coleção no MongoDB
public class Ponto {
    @Id // Indica que este campo é a chave primária
    private String id; // ID único gerado automaticamente pelo MongoDB

    private String descricao; // Descrição do ponto
    private double latitude; // Latitude do ponto
    private double longitude; // Longitude do ponto

    // Construtor padrão (necessário para o Spring Data MongoDB)
    public Ponto() {
    }

    // Construtor com parâmetros
    public Ponto(String descricao, double latitude, double longitude) {
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    // Método toString (opcional, para facilitar a visualização)
    @Override
    public String toString() {
        return "Ponto{" +
                "id='" + id + '\'' +
                ", descricao='" + descricao + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}