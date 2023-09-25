package com.servermanager.server.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private LocalDateTime timeStamp;
    private String message;
    private String reason;
    private HttpStatus status;
    private int statusCode;
    private Map <?, ?> data;
}
