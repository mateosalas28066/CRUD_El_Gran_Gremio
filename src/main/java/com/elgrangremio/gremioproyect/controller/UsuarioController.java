package com.elgrangremio.gremioproyect.controller;

import com.elgrangremio.gremioproyect.model.Usuario;
import com.elgrangremio.gremioproyect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getUsuarioById(@PathVariable String id) {
        return usuarioRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        usuario.setCodigo_humano(id);
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable String id) {
        usuarioRepository.deleteById(id);
    }

    @PostMapping
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

}
