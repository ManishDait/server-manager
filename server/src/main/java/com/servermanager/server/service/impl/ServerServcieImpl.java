package com.servermanager.server.service.impl;

import java.io.IOException;
import java.net.InetAddress;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servermanager.server.model.Server;
import com.servermanager.server.model.enumuration.Status;
import com.servermanager.server.repo.ServerRepo;
import com.servermanager.server.service.ServerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ServerServcieImpl implements ServerService {

    @Autowired
    private ServerRepo repo;

    @Override
    public List<Server> listAllServers() {
        log.info("Retriving servers list");
        return repo.findAll();
    }

    @Override
    public Server getServer(String id) {
        log.info("Retriving server: {}", id);
        Optional<Server> serverOptional = repo.findById(id);
        return serverOptional.isPresent() ? serverOptional.get() : null;
    }

    @Override
    public Server createServer(Server server) {
        log.info("Saving server: {}", server.getName());
        server.setImgURL(setImgURL());
        return repo.insert(server);
    }

    @Override
    public Server updateServer(Server server) {
        log.info("Updated server: {}", server.getId());
        return repo.save(server);
    }

    @Override
    public void deleteServer(String id) {
        log.info("Deleted server: {}", id);
        repo.deleteById(id);
    }

    @Override
    public Server pingServer(String ipAddress) throws IOException {
        Server server = repo.findByIpAddress(ipAddress);
        if (server == null) {
            return null;
        }
        log.info("Pinging server: {}", server.getIpAddress());
        InetAddress address = InetAddress.getByName(ipAddress);
        server.setStatus(address.isReachable(100000) ? Status.SERVER_UP : Status.SERVER_DOWN);
        repo.save(server);
        return server;
    }


    private String setImgURL() {
        String[] images = {"https://cdn-icons-png.flaticon.com/512/188/188109.png", "https://cdn-icons-png.flaticon.com/512/438/438599.png", "https://cdn-icons-png.flaticon.com/512/718/718874.png"};
        return images[new Random().nextInt(images.length)];
    }
    
}
