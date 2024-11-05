package kpi.ficting.kpitestplatform.service.mapper;

import static kpi.ficting.kpitestplatform.util.TestUtils.getFinishedSessions;
import static kpi.ficting.kpitestplatform.util.TestUtils.getMaxScore;
import static kpi.ficting.kpitestplatform.util.TestUtils.getStartedSessions;

import java.util.List;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.dto.TestDto;
import kpi.ficting.kpitestplatform.dto.TestInfo;
import kpi.ficting.kpitestplatform.dto.TestListInfo;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
@RequiredArgsConstructor
public abstract class TestMapper {

  private final QuestionMapper questionMapper;

  public TestInfo toTestInfo(Test test, boolean isAdmin) {
    return TestInfo.builder()
        .id(test.getId().toString())
        .name(test.getName())
        .openDate(test.getOpenDate())
        .deadline(test.getDeadline())
        .minutesToComplete(test.getMinutesToComplete())
        .maxScore(getMaxScore(test.getQuestions()))
        .questionsCount(test.getQuestions().size())
        .startedSessions(isAdmin ? getStartedSessions(test.getSessions()) : null)
        .finishedSessions(isAdmin ? getFinishedSessions(test.getSessions()) : null)
        .build();
  }

  public TestInfo toTestInfo(Test test) {
    return toTestInfo(test, false);
  }

  public List<TestInfo> toTestInfo(List<Test> tests, boolean isAdmin) {
    return tests.stream()
        .map((test) -> toTestInfo(test, isAdmin))
        .toList();
  }

  public TestListInfo toTestListInfo(List<Test> tests, boolean isAdmin) {
    return TestListInfo.builder()
        .tests(toTestInfo(tests, isAdmin))
        .build();
  }

  public Test toTest(TestDto testDto) {
    Test test = Test.builder()
        .name(testDto.getName())
        .openDate(testDto.getOpenDate())
        .deadline(testDto.getDeadline())
        .minutesToComplete(testDto.getMinutesToComplete())
        .build();
    test.setQuestions(questionMapper.toQuestionList(testDto.getQuestions(), test));
    return test;
  }
}
