package kpi.ficting.kpitestplatform.web;

import kpi.ficting.kpitestplatform.common.CustomErrorResponse;
import kpi.ficting.kpitestplatform.config.InvalidJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionTranslator extends ResponseEntityExceptionHandler {

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<CustomErrorResponse> handleProductNotFoundException(WebRequest request) {
    log.info("BadCredentialsException raised");
    CustomErrorResponse errorResponse = CustomErrorResponse.builder()
        .status(HttpStatus.UNAUTHORIZED.value())
        .error("Unauthorized")
        .message("Wrong password")
        .path(request.getDescription(false).substring(4))
        .build();
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
  }

  @ExceptionHandler(InvalidJwtException.class)
  public ResponseEntity<CustomErrorResponse> handleInvalidJwtException(WebRequest request) {
    log.info("InvalidJwtException raised");
    CustomErrorResponse errorResponse = CustomErrorResponse.builder()
        .status(HttpStatus.FORBIDDEN.value())
        .error("Forbidden")
        .message("Invalid JWT token")
        .path(request.getDescription(false).substring(4))
        .build();
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
  }
}
