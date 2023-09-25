package com.servermanager.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.servermanager.server.model.enumuration.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Document
public class Server {
    @Id
    private String id;
    @Indexed(unique = true)
    private String ipAddress;
    private String name;
    private String memory;
    private String type;
    private String imgURL;
    private Status status;
}
