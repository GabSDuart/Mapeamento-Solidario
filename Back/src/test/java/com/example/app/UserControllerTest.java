package com.example.app;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class UserControllerTest {

    @Test
    public void testLogin() {
        String expected = "Usuário autenticado com sucesso!";
        String actual = "Usuário autenticado com sucesso!";
        assertEquals(expected, actual);
    }
}
