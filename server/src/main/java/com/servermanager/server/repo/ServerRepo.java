package com.servermanager.server.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.servermanager.server.model.Server;


public interface ServerRepo extends MongoRepository <Server, String> {
    Server findByIpAddress(String ipAddress);
}
