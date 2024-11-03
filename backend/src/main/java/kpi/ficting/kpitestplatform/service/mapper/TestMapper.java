package kpi.ficting.kpitestplatform.service.mapper;

import static kpi.ficting.kpitestplatform.util.TestUtils.getFinishedSessions;
import static kpi.ficting.kpitestplatform.util.TestUtils.getMaxScore;
import static kpi.ficting.kpitestplatform.util.TestUtils.getStartedSessions;

import java.util.ArrayList;
import java.util.List;
import kpi.ficting.kpitestplatform.common.QuestionType;
import kpi.ficting.kpitestplatform.domain.Answer;
import kpi.ficting.kpitestplatform.domain.Choice;
import kpi.ficting.kpitestplatform.domain.MatchingPair;
import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.dto.AnswerDto;
import kpi.ficting.kpitestplatform.dto.QuestionDto;
import kpi.ficting.kpitestplatform.dto.QuestionListDto;
import kpi.ficting.kpitestplatform.dto.TestDto;
import kpi.ficting.kpitestplatform.dto.TestInfo;
import kpi.ficting.kpitestplatform.dto.TestListInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestMapper {

  default TestInfo toTestInfo(Test test, boolean isAdmin) {
    return TestInfo.builder()
        .id(test.getId().toString())
        .name(test.getName())
        .openDate(test.getOpenDate())
        .deadline(test.getDeadline())
        .minutesToComplete(test.getMinutesToComplete())
        .maxScore(getMaxScore(test.getQuestions()))
        .startedSessions(isAdmin ? getStartedSessions(test.getSessions()) : null)
        .finishedSessions(isAdmin ? getFinishedSessions(test.getSessions()) : null)
        .build();
  }

  default TestInfo toTestInfo(Test test) {
    return toTestInfo(test, false);
  }

  default List<TestInfo> toTestInfo(List<Test> tests, boolean isAdmin) {
    return tests.stream()
        .map((test) -> toTestInfo(test, isAdmin))
        .toList();
  }

  default TestListInfo toTestListInfo(List<Test> tests, boolean isAdmin) {
    return TestListInfo.builder()
        .tests(toTestInfo(tests, isAdmin))
        .build();
  }

  default Test toTest(TestDto testDto) {
    Test test = Test.builder()
        .name(testDto.getName())
        .openDate(testDto.getOpenDate())
        .deadline(testDto.getDeadline())
        .minutesToComplete(testDto.getMinutesToComplete())
        .build();
    test.setQuestions(toQuestionList(testDto.getQuestions(), test));
    return test;
  }

  default List<Question> toQuestionList(List<QuestionDto> questionDtos, Test test) {
    return questionDtos.stream()
        .map((questionDto) -> {
          Question question = Question.builder()
              .content(questionDto.getContent())
              .points(questionDto.getPoints())
              .type(QuestionType.valueOf(questionDto.getType().toUpperCase()))
              .test(test)
              .build();
          question.setAnswers(toAnswerList(questionDto.getAnswers(), question));
          return question;
        })
        .toList();
  }

  default List<Answer> toAnswerList(List<AnswerDto> answerDtos, Question question) {
    List<Answer> answers = new ArrayList<>();
    for (AnswerDto answerDto : answerDtos) {
      if (question.getType() == QuestionType.MATCHING) {
        answerDtos.forEach(option ->
            answers.add(MatchingPair.builder()
                .leftOption(answerDto.getLeftOption())
                .rightOption(option.getRightOption())
                .isCorrect(answerDto.getRightOption().equals(option.getRightOption()))
                .question(question)
                .build()));
      } else {
        answers.add(Choice.builder()
            .content(answerDto.getContent())
            .isCorrect(answerDto.getIsCorrect())
            .question(question)
            .build());
      }
    }
    return answers;
  }

  default QuestionListDto toQuestionDtoList(List<Question> questions, boolean isAdmin) {
    List<QuestionDto> questionDtos = questions.stream()
        .map((question) -> QuestionDto.builder()
            .content(question.getContent())
            .points(question.getPoints())
            .type(question.getType().getDisplayName())
            .answers(toAnswerDtoList(question.getAnswers(), isAdmin))
            .build())
        .toList();
    return QuestionListDto.builder()
        .questions(questionDtos)
        .build();
  }

  default List<AnswerDto> toAnswerDtoList(List<Answer> answers, boolean isAdmin) {
    return answers.stream()
        .map((answer) -> {
          if (answer instanceof MatchingPair matchingPair) {
            return AnswerDto.builder()
                .leftOption(matchingPair.getLeftOption())
                .rightOption(matchingPair.getRightOption())
                .isCorrect(isAdmin ? matchingPair.getIsCorrect() : null)
                .build();
          } else {
            Choice choice = (Choice) answer;
            return AnswerDto.builder()
                .content(choice.getContent())
                .isCorrect(isAdmin ? choice.getIsCorrect() : null)
                .build();
          }
        })
        .toList();
  }
}
