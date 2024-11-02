package kpi.ficting.kpitestplatform.service.mapper;

import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.dto.TestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TestMapper {

  @Mapping(target = "id", source = "id")
  @Mapping(target = "name", source = "name")
  @Mapping(target = "description", source = "description")
  @Mapping(target = "openDate", source = "openDate")
  @Mapping(target = "deadline", source = "deadline")
  TestDto toTestDto(Test test);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "name", source = "name")
  @Mapping(target = "description", source = "description")
  @Mapping(target = "openDate", source = "openDate")
  @Mapping(target = "deadline", source = "deadline")
  Test toTest(TestDto testDto);
}
