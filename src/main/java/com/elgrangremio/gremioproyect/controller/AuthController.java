package com.elgrangremio.gremioproyect.controller;

import com.elgrangremio.gremioproyect.model.Admin;
import com.elgrangremio.gremioproyect.model.AuthResponse;
import com.elgrangremio.gremioproyect.model.LoginRequest;
import com.elgrangremio.gremioproyect.model.Usuario;
import com.elgrangremio.gremioproyect.repository.AdminRepository;
import com.elgrangremio.gremioproyect.repository.UsuarioRepository;
import com.elgrangremio.gremioproyect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        try {
            String email = request.getEmail();
            String password = request.getPassword();

            System.out.println("Login email: " + email);

            Admin admin = adminRepository.findFirstByEmail(email);
            System.out.println("Admin: " + (admin != null ? admin.getEmail() : "null"));

            if (admin != null && admin.getPassword().equals(password)) {
                System.out.println("Login como admin OK");
                return new AuthResponse(jwtUtil.generateToken(admin.getEmail()));
            }

            Usuario usuario = usuarioRepository.findFirstByEmail(email);
            System.out.println("Usuario: " + (usuario != null ? usuario.getEmail() : "null"));

            if (usuario != null && usuario.getPassword().equals(password)) {
                System.out.println("Login como usuario OK");
                return new AuthResponse(jwtUtil.generateToken(usuario.getEmail()));
            }

            System.out.println("Credenciales inválidas");
            throw new RuntimeException("Credenciales inválidas");

        } catch (Exception e) {
            System.out.println("ERROR DETECTADO:");
            e.printStackTrace(); // ⚠️ aquí debería aparecer la excepción real
            throw new RuntimeException("Error interno al procesar el login", e);
        }
    }

}
