package kpi.ficting.kpitestplatform.service.mapper;

import java.util.List;
import kpi.ficting.kpitestplatform.domain.Collection;
import kpi.ficting.kpitestplatform.dto.CollectionDto;
import kpi.ficting.kpitestplatform.dto.CollectionInfo;
import kpi.ficting.kpitestplatform.dto.CollectionListInfo;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
@RequiredArgsConstructor
public abstract class CollectionMapper {

  private final QuestionMapper questionMapper;

  public CollectionInfo toCollectionInfo(Collection collection) {
    return CollectionInfo.builder()
        .id(collection.getId())
        .name(collection.getName())
        .build();
  }

  public List<CollectionInfo> toCollectionInfo(List<Collection> collections) {
    return collections.stream()
        .map(this::toCollectionInfo)
        .toList();
  }

  public CollectionListInfo toCollectionListInfo(List<Collection> collections) {
    return CollectionListInfo.builder()
        .collections(toCollectionInfo(collections))
        .build();
  }

  public Collection toCollection(CollectionDto collectionDto) {
    Collection collection = Collection.builder()
        .name(collectionDto.getName())
        .build();
    collection.setQuestions(
        questionMapper.toQuestionList(collectionDto.getQuestions(), collection));
    return collection;
  }
}
