package kpi.ficting.kpitestplatform.web;

import static kpi.ficting.kpitestplatform.util.ValidationUtils.getErrorResponseOfFieldErrors;
import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import kpi.ficting.kpitestplatform.common.CustomErrorResponse;
import kpi.ficting.kpitestplatform.config.InvalidJwtException;
import kpi.ficting.kpitestplatform.service.exception.TestNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
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
  public ResponseEntity<CustomErrorResponse> handleBadCredentialsException(WebRequest request) {
    log.info("BadCredentialsException raised");
    CustomErrorResponse errorResponse = CustomErrorResponse.builder()
        .status(UNAUTHORIZED.value())
        .error(UNAUTHORIZED.getReasonPhrase())
        .message("Wrong password")
        .path(request.getDescription(false).substring(4))
        .build();
    return ResponseEntity.status(UNAUTHORIZED).body(errorResponse);
  }

  @ExceptionHandler(InvalidJwtException.class)
  public ResponseEntity<CustomErrorResponse> handleInvalidJwtException(InvalidJwtException exc,
      WebRequest request) {
    log.info("InvalidJwtException raised");
    CustomErrorResponse errorResponse = CustomErrorResponse.builder()
        .status(FORBIDDEN.value())
        .error(FORBIDDEN.getReasonPhrase())
        .message(exc.getMessage())
        .path(request.getDescription(false).substring(4))
        .build();
    return ResponseEntity.status(FORBIDDEN).body(errorResponse);
  }

  @ExceptionHandler(TestNotFoundException.class)
  public ResponseEntity<CustomErrorResponse> handleTestNotFoundException(TestNotFoundException exc,
      WebRequest request) {
    log.info("TestNotFoundException raised");
    CustomErrorResponse errorResponse = CustomErrorResponse.builder()
        .status(NOT_FOUND.value())
        .error(NOT_FOUND.getReasonPhrase())
        .message(exc.getMessage())
        .path(request.getDescription(false).substring(4))
        .build();
    return ResponseEntity.status(NOT_FOUND).body(errorResponse);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, @NonNull WebRequest request) {
    log.info("Input params validation failed");
    return ResponseEntity.status(BAD_REQUEST)
        .body(getErrorResponseOfFieldErrors(ex.getBindingResult().getFieldErrors(), request));
  }
}
