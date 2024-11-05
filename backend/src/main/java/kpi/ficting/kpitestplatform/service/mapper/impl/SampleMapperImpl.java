package kpi.ficting.kpitestplatform.service.mapper.impl;

import java.util.List;
import kpi.ficting.kpitestplatform.domain.Sample;
import kpi.ficting.kpitestplatform.domain.Test;
import kpi.ficting.kpitestplatform.dto.SampleDto;
import kpi.ficting.kpitestplatform.service.CollectionService;
import kpi.ficting.kpitestplatform.service.mapper.SampleMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SampleMapperImpl implements SampleMapper {

  private final CollectionService collectionService;

  @Override
  public List<Sample> toSampleList(List<SampleDto> sampleDtos, Test test) {
    return sampleDtos.stream()
        .map((sampleDto) -> Sample.builder()
            .points(sampleDto.getPoints())
            .questionsCount(sampleDto.getQuestionsCount())
            .collection(collectionService.findByName(sampleDto.getCollectionName()))
            .test(test)
            .build())
        .toList();
  }
}
