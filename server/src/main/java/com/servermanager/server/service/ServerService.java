package com.servermanager.server.service;

import java.io.IOException;
import java.util.List;

import com.servermanager.server.model.Server;

public interface ServerService {
    List<Server> listAllServers ();
    Server getServer (String id);
    Server createServer (Server server);
    Server updateServer (Server server);
    void deleteServer (String id);
    Server pingServer (String ipAddress) throws IOException; 
}
