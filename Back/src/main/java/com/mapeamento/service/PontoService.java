package com.mapeamento.service;

import com.mapeamento.model.Ponto;
import com.mapeamento.model.Usuario;
import com.mapeamento.repository.PontoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PontoService {
    private final PontoRepository repository;

    // Injeção de dependência do PontoRepository
    public PontoService(PontoRepository repository) {
        this.repository = repository;
    }

    // Método para autenticar usuário
    public boolean autenticarUsuario(Usuario usuario) {
        // Simulação de autenticação (substitua por uma consulta ao banco de dados)
        if ("usuario@exemplo.com".equals(usuario.getEmail()) && "senha123".equals(usuario.getSenha())) {
            return true;
        }
        if ("12345678901".equals(usuario.getCpf()) && "senha123".equals(usuario.getSenha())) {
            return true;
        }
        return false;
    }

    // Método para listar todos os pontos
    public List<Ponto> listarPontos() {
        return repository.findAll(); // Usa o método padrão do MongoRepository
    }

    // Método para cadastrar um novo ponto
    public Ponto cadastrarPonto(Ponto ponto) {
        return repository.save(ponto); // Usa o método padrão do MongoRepository
    }

    // Método para enviar e-mail de recuperação de senha (opcional)
    public boolean enviarEmailRecuperacao(String email) {
        // Lógica para enviar e-mail (não implementada)
        return false;
    }
}