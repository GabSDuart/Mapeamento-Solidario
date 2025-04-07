package com.mapeamento.controller;

import com.mapeamento.model.Usuario;
import com.mapeamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracker")
public class TrackerController {

    @Autowired private UsuarioRepository usuarioRepository;

    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody Usuario req) {
        Usuario user = usuarioRepository.findByCpf(req.getCpf());
        if (user != null) {
            GeoJsonPoint point = new GeoJsonPoint(req.getLastKnownLocation().getX(), req.getLastKnownLocation().getY());
            user.setLastKnownLocation(point);
            user.getRouteLog().add(point);
            usuarioRepository.save(user);
            return ResponseEntity.ok("Localização atualizada");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
    }
}
