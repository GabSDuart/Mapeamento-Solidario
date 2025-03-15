package com.mapeamento.controller;

import com.mapeamento.model.Ponto;
import com.mapeamento.model.Usuario;
import com.mapeamento.service.PontoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PontoController {
    private final PontoService service;

    public PontoController(PontoService service) {
        this.service = service;
    }

    // Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario usuario) {
        if (service.autenticarUsuario(usuario)) {
            return ResponseEntity.ok("Login bem-sucedido!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        }
    }

    // Endpoint para listar pontos
    @GetMapping("/pontos")
    public List<Ponto> listarPontos() {
        return service.listarPontos();
    }

    // Endpoint para cadastrar ponto
    @PostMapping("/pontos")
    public Ponto cadastrarPonto(@RequestBody Ponto ponto) {
        return service.salvarPonto(ponto);
    }

    // Endpoint para recuperar senha (opcional)
    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> recuperarSenha(@RequestBody String email) {
        if (service.enviarEmailRecuperacao(email)) {
            return ResponseEntity.ok("E-mail de recuperação enviado.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao enviar e-mail.");
        }
    }
}