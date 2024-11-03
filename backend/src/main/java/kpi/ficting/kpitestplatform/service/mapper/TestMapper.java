package kpi.ficting.kpitestplatform.service.mapper;

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
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface TestMapper {

  @Mapping(target = "id", source = "id")
  @Mapping(target = "name", source = "name")
  @Mapping(target = "description", source = "description")
  @Mapping(target = "openDate", source = "openDate")
  @Mapping(target = "deadline", source = "deadline")
  @Mapping(target = "minutesToComplete", source = "minutesToComplete")
  @Mapping(target = "maxScore", source = "questions", qualifiedByName = "maxScore")
  TestInfo toTestInfo(Test test);

  List<TestInfo> toTestInfo(List<Test> tests);

  default TestListInfo toTestListInfo(List<Test> tests) {
    return TestListInfo.builder()
        .tests(toTestInfo(tests))
        .build();
  }

  @Named("maxScore")
  default Integer maxScore(List<Question> questions) {
    return questions.stream()
        .map(Question::getPoints)
        .reduce(Integer::sum)
        .orElse(0);
  }

  default Test toTest(TestDto testDto) {
    Test test = Test.builder()
        .name(testDto.getName())
        .description(testDto.getDescription())
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
    return answerDtos.stream()
        .map((answerDto) -> {
          if (answerDto.getContent() != null) {
            return Choice.builder()
                .content(answerDto.getContent())
                .isCorrect(answerDto.getIsCorrect())
                .question(question)
                .build();
          } else {
            return MatchingPair.builder()
                .leftOption(answerDto.getLeftOption())
                .rightOption(answerDto.getRightOption())
                .question(question)
                .build();
          }
        })
        .toList();
  }

  default QuestionListDto toQuestionDtoList(List<Question> questions) {
    List<QuestionDto> questionDtos = questions.stream()
        .map((question) -> QuestionDto.builder()
            .content(question.getContent())
            .points(question.getPoints())
            .type(question.getType().getDisplayName())
            .answers(toAnswerDtoList(question.getAnswers()))
            .build())
        .toList();
    return QuestionListDto.builder()
        .questions(questionDtos)
        .build();
  }

  default List<AnswerDto> toAnswerDtoList(List<Answer> answers) {
    return answers.stream()
        .map((answer) -> {
          if (answer instanceof MatchingPair matchingPair) {
            return AnswerDto.builder()
                .leftOption(matchingPair.getLeftOption())
                .rightOption(matchingPair.getRightOption())
                .build();
          } else {
            Choice choice = (Choice) answer;
            return AnswerDto.builder()
                .content(choice.getContent())
                .isCorrect(choice.getIsCorrect())
                .build();
          }
        })
        .toList();
  }
}
