package kpi.ficting.kpitestplatform.util;

import java.util.List;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.TestSession;

public class TestUtils {

  public static int getMaxScore(List<Question> questions) {
    return questions.stream()
        .map(Question::getPoints)
        .reduce(Integer::sum)
        .orElse(0);
  }

  public static int getStartedSessions(List<TestSession> sessions) {
    return (int) sessions.stream()
        .filter(session -> !session.getIsFinished())
        .count();
  }

  public static int getFinishedSessions(List<TestSession> sessions) {
    return (int) sessions.stream()
        .filter(TestSession::getIsFinished)
        .count();
  }
}
