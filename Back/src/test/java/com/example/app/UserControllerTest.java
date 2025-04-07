package com.example.app;

import com.mapeamento.controller.PontoController;
import com.mapeamento.model.Usuario;
import com.mapeamento.service.PontoService;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Test
    public void testLoginSuccess() {
        // Arrange
        PontoService mockService = mock(PontoService.class);
        PontoController controller = new PontoController(mockService);
        Usuario usuario = new Usuario();
        usuario.setEmail("usuario@exemplo.com");
        usuario.setSenha("senha123");

        when(mockService.autenticarUsuario(usuario)).thenReturn("fake-jwt-token");

        // Act
        ResponseEntity<String> response = controller.login(usuario);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("fake-jwt-token", response.getBody());
    }

    @Test
    public void testLoginFailure() {
        // Arrange
        PontoService mockService = mock(PontoService.class);
        PontoController controller = new PontoController(mockService);
        Usuario usuario = new Usuario();
        usuario.setEmail("usuario@exemplo.com");
        usuario.setSenha("wrongpassword");

        when(mockService.autenticarUsuario(usuario)).thenReturn(null);

        // Act
        ResponseEntity<String> response = controller.login(usuario);

        // Assert
        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Credenciais inválidas.", response.getBody());
    }
}
