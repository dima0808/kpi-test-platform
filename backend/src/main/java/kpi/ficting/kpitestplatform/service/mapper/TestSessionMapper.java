package kpi.ficting.kpitestplatform.service.mapper;

import kpi.ficting.kpitestplatform.domain.TestSession;
import kpi.ficting.kpitestplatform.dto.TestSessionDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestSessionMapper {

  default TestSession toTestSession(TestSessionDto testSessionDto) {
    return TestSession.builder()
        .studentGroup(testSessionDto.getStudentGroup())
        .studentName(testSessionDto.getStudentName())
        .build();
  }

  default TestSessionDto toTestSessionDto(TestSession testSession) {
    return TestSessionDto.builder()
        .studentGroup(testSession.getStudentGroup())
        .studentName(testSession.getStudentName())
        .isFinished(testSession.getIsFinished())
        .currentQuestionIndex(testSession.getCurrentQuestionIndex())
        .build();
  }
}
