package com.elgrangremio.gremioproyect.controller;

import com.elgrangremio.gremioproyect.model.Mascota;
import com.elgrangremio.gremioproyect.repository.MascotaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {

        @Autowired
        private MascotaRepository mascotaRepository;

        @GetMapping
        public List<Mascota> obtenerMascotas() {
                return mascotaRepository.findAll();
        }

        @PostMapping
        public Mascota agregarMascota(@RequestBody Mascota mascota) {
                // Generar códigos únicos
                String codigoMascota = "M" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
                String codigoHumano = "H" + UUID.randomUUID().toString().substring(0, 4).toUpperCase();

                mascota.setCodigo_mascota(codigoMascota);
                mascota.setCodigo_humano(codigoHumano);

                // Si no se envió estado, lo ponemos por defecto
                if (mascota.getEstado() == null || mascota.getEstado().isBlank()) {
                        mascota.setEstado("Por adoptar");
                }

                return mascotaRepository.save(mascota);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Mascota> actualizarMascota(@PathVariable String id,
                        @RequestBody Mascota mascotaActualizada) {
                Optional<Mascota> mascotaOpt = mascotaRepository.findById(id);
                if (mascotaOpt.isEmpty()) {
                        return ResponseEntity.notFound().build();
                }

                Mascota mascota = mascotaOpt.get();
                mascota.setNombre(mascotaActualizada.getNombre());
                mascota.setEspecie(mascotaActualizada.getEspecie());
                mascota.setRaza(mascotaActualizada.getRaza());
                mascota.setEdad(mascotaActualizada.getEdad());
                mascota.setPeso(mascotaActualizada.getPeso());
                mascota.setWhatsapp(mascotaActualizada.getWhatsapp());
                mascota.setEstado(mascotaActualizada.getEstado());
                mascota.setImagen(mascotaActualizada.getImagen());

                mascotaRepository.save(mascota);
                return ResponseEntity.ok(mascota);
        }

        @DeleteMapping("/{id}")
        public void eliminarMascota(@PathVariable String id) {
                mascotaRepository.deleteById(id);
        }

}
