package kpi.ficting.kpitestplatform.web;

import static kpi.ficting.kpitestplatform.util.ValidationUtils.getErrorResponseOfFieldErrors;

import kpi.ficting.kpitestplatform.common.CustomErrorResponse;
import kpi.ficting.kpitestplatform.config.InvalidJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
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

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, @NonNull WebRequest request) {
    log.info("Input params validation failed");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(getErrorResponseOfFieldErrors(ex.getBindingResult().getFieldErrors(), request));
  }
}
