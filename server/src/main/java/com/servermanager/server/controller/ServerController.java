package com.servermanager.server.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servermanager.server.model.Response;
import com.servermanager.server.model.Server;
import com.servermanager.server.model.enumuration.Status;
import com.servermanager.server.service.impl.ServerServcieImpl;

@RestController
@RequestMapping("/server_manager/api")
@CrossOrigin
public class ServerController {
    
    @Autowired
    private ServerServcieImpl servcie;

    @GetMapping("/list")
    public ResponseEntity<Response> listAllServers() {
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .data(Map.of("servers", servcie.listAllServers()))
            .message("Retrive servers")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<Response> getServer(@PathVariable String id) {
        Server server = servcie.getServer(id);
        if (server == null) {
            return serverNotFound();
        }
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .data(Map.of("server", server))
            .message(server.equals(null) ? "Server not found" : "Retrive server")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

    @PostMapping("/create")
    public ResponseEntity<Response> createServer(@RequestBody Server server) {
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .data(Map.of("server", servcie.createServer(server)))
            .message("Created server")
            .status(HttpStatus.CREATED)
            .statusCode(HttpStatus.CREATED.value())
            .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Response> updateServer(@RequestBody Server server) {
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .data(Map.of("server", servcie.updateServer(server)))
            .message("Updated server")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteServer(@PathVariable String id) {
        servcie.deleteServer(id);
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .message("Deleted server")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

    @GetMapping("/ping/{ipAddress}")
    public ResponseEntity<Response> pingServer(@PathVariable String ipAddress) throws IOException {
        Server server = servcie.pingServer(ipAddress);
        if (server == null) {
            return serverNotFound();
        }

        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .data(Map.of("server", server))
            .message(server.getStatus().equals(Status.SERVER_UP) ? "Ping sucessfull" : "Ping not sucessfull")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

    private ResponseEntity<Response> serverNotFound() {
        return ResponseEntity.ok(
            Response.builder()
            .timeStamp(LocalDateTime.now())
            .message("Server not found")
            .status(HttpStatus.OK)
            .statusCode(HttpStatus.OK.value())
            .build()
        );
    }

}
