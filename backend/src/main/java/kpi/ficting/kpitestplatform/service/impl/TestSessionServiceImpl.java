package kpi.ficting.kpitestplatform.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.ResponseEntry;
import kpi.ficting.kpitestplatform.domain.Sample;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.domain.TestSession;
import kpi.ficting.kpitestplatform.dto.ResponseEntryDto;
import kpi.ficting.kpitestplatform.repository.TestSessionRepository;
import kpi.ficting.kpitestplatform.service.TestService;
import kpi.ficting.kpitestplatform.service.TestSessionService;
import kpi.ficting.kpitestplatform.service.exception.TestSessionAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestSessionServiceImpl implements TestSessionService {

  private final TestService testService;
  private final TestSessionRepository testSessionRepository;

  @Override
  public TestSession startTestSession(UUID testId, TestSession testSession) {
    if (testSessionRepository.existsByStudentGroupAndStudentName(testSession.getStudentGroup(),
        testSession.getStudentName())) {
      throw new TestSessionAlreadyExistsException(testSession.getStudentGroup(),
          testSession.getStudentName());
    }
    Test test = testService.findById(testId);

    List<ResponseEntry> responses = new ArrayList<>();
    for (Question question : test.getQuestions()) {
      responses.add(ResponseEntry.builder()
          .question(question)
          .testSession(testSession)
          .build());
    }

    Random random = new Random();
    for (Sample sample : test.getSamples()) {
      List<Question> sampleQuestions = sample.getCollection().getQuestions();
      List<Question> selectedQuestions = sampleQuestions.stream()
          .filter(q -> q.getPoints().equals(sample.getPoints()))
          .collect(Collectors.toList());
      for (int i = 0; i < sample.getQuestionsCount(); i++) {
        Question question = selectedQuestions.remove(random.nextInt(selectedQuestions.size()));
        responses.add(ResponseEntry.builder()
            .question(question)
            .testSession(testSession)
            .build());
      }
    }

    testSession.setResponses(responses);
    testSession.setTest(test);
    testSession.setIsFinished(false);

    return testSessionRepository.save(testSession);
  }

  @Override
  public TestSession saveAnswer(UUID testId, ResponseEntryDto responseEntryDto) {
    return null;
  }

  @Override
  public TestSession finishTestSession(UUID testId) {
    return null;
  }
}
