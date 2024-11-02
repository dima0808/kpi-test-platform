package kpi.ficting.kpitestplatform.service.mapper;

import kpi.ficting.kpitestplatform.domain.Question;
import kpi.ficting.kpitestplatform.dto.QuestionDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

  @Mapping(target = "name", source = "name")
  QuestionDto toQuestionDto(Question question);
}
