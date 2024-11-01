package com.nikitin.kpitestplatform.config;

public class InvalidJwtException extends RuntimeException {

  public InvalidJwtException() {
    super("Invalid JWT token");
  }
}
