package kpi.ficting.kpitestplatform.service;

import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Test;

public interface TestService {

  List<Test> findAll();

  Test findById(UUID testId);

  Test create(Test test);

  Test update(UUID testId, Test test);

  void deleteById(UUID testId);
}
