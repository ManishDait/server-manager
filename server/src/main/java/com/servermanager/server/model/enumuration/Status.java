package com.servermanager.server.model.enumuration;

public enum Status {

    SERVER_UP("SERVER_UP"),
    SERVER_DOWN("SERVER_DOWN");

    private String status;
    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }
}
