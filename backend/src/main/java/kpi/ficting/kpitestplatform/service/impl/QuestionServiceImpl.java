package kpi.ficting.kpitestplatform.service.impl;

import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.repository.QuestionRepository;
import kpi.ficting.kpitestplatform.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

  private final QuestionRepository questionRepository;

  @Override
  public List<Question> findByTestId(UUID testId) {
    return questionRepository.findByTestId(testId);
  }
}
