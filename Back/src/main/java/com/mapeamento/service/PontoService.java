package com.mapeamento.service;

import com.mapeamento.model.Ponto;
import com.mapeamento.model.Usuario;
import com.mapeamento.repository.PontoRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PontoService {
    private final PontoRepository repository;
    private static final String SECRET_KEY = "secreta-chave-jwt"; // Troque por uma chave mais segura
    private static final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    public String autenticarUsuario(Usuario usuario) {
        if (("usuario@exemplo.com".equals(usuario.getEmail()) && "senha123".equals(usuario.getSenha())) ||
                ("12345678901".equals(usuario.getCpf()) && "senha123".equals(usuario.getSenha()))) {
            return gerarToken(usuario.getEmail());
        }
        return null;
    }

    private String gerarToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public List<Ponto> listarPontos() {
        return repository.findAll();
    }

    public Ponto cadastrarPonto(Ponto ponto) {
        return repository.save(ponto);
    }

    public boolean enviarEmailRecuperacao(String email) {
        return false;
    }
}
