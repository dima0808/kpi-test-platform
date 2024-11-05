package kpi.ficting.kpitestplatform.service.exception;

public class CollectionNotFoundException extends RuntimeException {

  public CollectionNotFoundException(Long id) {
    super("Collection with id " + id + " not found");
  }
}
