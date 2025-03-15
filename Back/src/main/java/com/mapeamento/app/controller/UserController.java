package com.example.app.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        return "Usuário autenticado com sucesso!";
    }
}
