package kpi.ficting.kpitestplatform.service.impl;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;
import kpi.ficting.kpitestplatform.domain.Answer;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.ResponseEntry;
import kpi.ficting.kpitestplatform.domain.Sample;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.domain.TestSession;
import kpi.ficting.kpitestplatform.repository.TestSessionRepository;
import kpi.ficting.kpitestplatform.service.TestService;
import kpi.ficting.kpitestplatform.service.TestSessionService;
import kpi.ficting.kpitestplatform.service.exception.TestSessionAlreadyExistsException;
import kpi.ficting.kpitestplatform.service.exception.TestSessionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestSessionServiceImpl implements TestSessionService {

  private final TestService testService;
  private final TestSessionRepository testSessionRepository;

  @Override
  public TestSession findByCredentials(UUID testId, String credentials) {
    String studentGroup = credentials.split(":")[0];
    String studentName = credentials.split(":")[1];
    return testSessionRepository.findTestSessionByStudentGroupAndStudentNameAndTestId(
        studentGroup, studentName, testId)
        .orElseThrow(() -> new TestSessionNotFoundException(studentGroup, studentName));
  }

  @Override
  public TestSession startTestSession(UUID testId, TestSession testSession) {
    if (testSessionRepository.existsByStudentGroupAndStudentName(
        testSession.getStudentGroup(), testSession.getStudentName())) {
      throw new TestSessionAlreadyExistsException(
          testSession.getStudentGroup(), testSession.getStudentName());
    }
    Test test = testService.findById(testId);
    List<ResponseEntry> responses = new ArrayList<>();
    addTestQuestions(responses, test.getQuestions(), testSession);
    addSampleQuestions(responses, test.getSamples(), testSession);
    Collections.shuffle(responses);
    testSession.setResponses(responses);
    testSession.setTest(test);
    testSession.setIsFinished(false);
    testSession.setCurrentQuestionIndex(0);
    return testSessionRepository.save(testSession);
  }

  @Override
  @Transactional
  public Question nextQuestion(UUID testId, String credentials) {
    TestSession testSession = findByCredentials(testId, credentials);
    Hibernate.initialize(testSession.getResponses());
    ResponseEntry responseEntry = nextResponseEntry(testSession);
    Hibernate.initialize(responseEntry.getQuestion().getAnswers());
    return responseEntry.getQuestion();
  }

  @Override
  @Transactional
  public TestSession saveAnswer(UUID testId, String credentials, List<Long> answerIds) {
    TestSession testSession = findByCredentials(testId, credentials);
    Hibernate.initialize(testSession.getResponses());
    ResponseEntry responseEntry = nextResponseEntry(testSession);
    Hibernate.initialize(responseEntry.getQuestion().getAnswers());
    List<Answer> answers = new ArrayList<>(responseEntry.getQuestion().getAnswers());
    answers = answers.stream()
        .filter(a -> answerIds.contains(a.getId()))
        .collect(Collectors.toList());
    if (answers.isEmpty()) {
      throw new IllegalArgumentException("Answers must not be empty");
    }
    responseEntry.setAnswers(answers);
    testSession.setCurrentQuestionIndex(testSession.getCurrentQuestionIndex() + 1);
    return testSessionRepository.save(testSession);
  }

  @Override
  public TestSession finishTestSession(UUID testId, String credentials) {
    TestSession testSession = findByCredentials(testId, credentials);
    testSession.setIsFinished(true);
    return testSessionRepository.save(testSession);
  }

  private static void addTestQuestions(List<ResponseEntry> responses, List<Question> testQuestions,
      TestSession testSession) {
    for (Question question : testQuestions) {
      responses.add(ResponseEntry.builder()
          .question(question)
          .testSession(testSession)
          .build());
    }
  }

  private static void addSampleQuestions(List<ResponseEntry> responses, List<Sample> samples,
      TestSession testSession) {
    Random random = new Random();
    for (Sample sample : samples) {
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
  }

  private static ResponseEntry nextResponseEntry(TestSession testSession) {
    return testSession.getResponses().stream()
        .filter(r -> r.getAnswers().isEmpty())
        .findFirst()
        .orElseThrow(() -> new IllegalStateException("No more questions"));
  }
}
