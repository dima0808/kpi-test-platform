package kpi.ficting.kpitestplatform.service.impl;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.repository.QuestionRepository;
import kpi.ficting.kpitestplatform.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

  private final QuestionRepository questionRepository;

  @Override
  @Transactional
  public List<Question> findByTestId(UUID testId) {
    List<Question> questions = questionRepository.findByTestId(testId);
    questions.forEach(question -> Hibernate.initialize(question.getAnswers()));
    return questions;
  }
}
