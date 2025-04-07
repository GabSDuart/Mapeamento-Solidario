package com.mapeamento.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import java.util.Date;
import java.util.List;

@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;
    private String cpf;
    private String email;
    private String password;
    private GeoJsonPoint lastKnownLocation;
    private List<GeoJsonPoint> routeLog;
    private Date lastLogin;
    // Getters e Setters
}
