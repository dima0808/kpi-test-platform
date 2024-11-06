package kpi.ficting.kpitestplatform.service;

import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.TestSession;

public interface TestSessionService {

  TestSession findByTestIdAndCredentials(UUID testId, String credentials, boolean finishedOnly);

  TestSession findByTestIdAndCredentials(UUID testId, String credentials);

  List<TestSession> findByTestId(UUID testId, boolean finishedOnly);

  TestSession startTestSession(UUID testId, TestSession testSession);

  Question nextQuestion(UUID testId, String credentials);

  TestSession saveAnswer(UUID testId, String credentials, List<Long> answerIds);

  TestSession finishTestSession(UUID testId, String credentials);
}
