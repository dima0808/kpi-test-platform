package kpi.ficting.kpitestplatform.util;

import java.util.List;
import java.util.stream.Collectors;
import kpi.ficting.kpitestplatform.common.QuestionType;
import kpi.ficting.kpitestplatform.domain.Answer;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.ResponseEntry;
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
        .filter(session -> session.getFinishedAt() == null)
        .count();
  }

  public static int getFinishedSessions(List<TestSession> sessions) {
    return (int) sessions.stream()
        .filter(session -> session.getFinishedAt() != null)
        .count();
  }

  public static int calculateMark(ResponseEntry responseEntry) {
    List<Long> correctAnswerIds = responseEntry.getQuestion().getAnswers().stream()
        .filter(Answer::getIsCorrect)
        .map(Answer::getId)
        .toList();
    List<Long> studentAnswerIds = responseEntry.getAnswers().stream()
        .map(Answer::getId)
        .toList();
    long correctCount = studentAnswerIds.stream()
        .filter(correctAnswerIds::contains)
        .count();
    if (responseEntry.getQuestion().getType() == QuestionType.MULTIPLE_CHOICES) {
      correctCount -= studentAnswerIds.size() - correctCount;
    }
    double percentageCorrect = (double) correctCount / correctAnswerIds.size();
    return (int) (percentageCorrect * responseEntry.getQuestion().getPoints());
  }
}
