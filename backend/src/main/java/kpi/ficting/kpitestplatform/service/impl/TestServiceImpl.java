package kpi.ficting.kpitestplatform.service.impl;

import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.repository.TestRepository;
import kpi.ficting.kpitestplatform.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestServiceImpl implements TestService {

  private final TestRepository testRepository;

  @Override
  public List<Test> findAll() {
    return testRepository.findAll();
  }

  @Override
  public Test findById(UUID testId) {
    return testRepository.findById(testId).orElse(null); // todo: throw exception
  }

  @Override
  public Test create(Test test) {
    return testRepository.save(test);
  }
}
