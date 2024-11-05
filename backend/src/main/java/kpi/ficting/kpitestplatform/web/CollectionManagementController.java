package kpi.ficting.kpitestplatform.web;

import jakarta.validation.Valid;
import java.util.UUID;
import kpi.ficting.kpitestplatform.dto.CollectionDto;
import kpi.ficting.kpitestplatform.dto.CollectionInfo;
import kpi.ficting.kpitestplatform.dto.CollectionListInfo;
import kpi.ficting.kpitestplatform.dto.QuestionListDto;
import kpi.ficting.kpitestplatform.dto.TestInfo;
import kpi.ficting.kpitestplatform.service.CollectionService;
import kpi.ficting.kpitestplatform.service.QuestionService;
import kpi.ficting.kpitestplatform.service.mapper.CollectionMapper;
import kpi.ficting.kpitestplatform.service.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/collections")
@RequiredArgsConstructor
public class CollectionManagementController {

  private final CollectionService collectionService;
  private final CollectionMapper collectionMapper;

  private final QuestionService questionService;
  private final QuestionMapper questionMapper;

  @GetMapping
  public ResponseEntity<CollectionListInfo> getAllCollections() {
    return ResponseEntity.ok(collectionMapper.toCollectionListInfo(collectionService.findAll()));
  }

  @GetMapping("{collectionId}")
  public ResponseEntity<CollectionInfo> getCollectionInfoById(@PathVariable Long collectionId) {
    return ResponseEntity.ok(
        collectionMapper.toCollectionInfo(collectionService.findById(collectionId)));
  }

  @GetMapping("{collectionId}/questions")
  public ResponseEntity<QuestionListDto> getQuestionsByCollectionId(
      @PathVariable Long collectionId) {
    return ResponseEntity.ok(
        questionMapper.toQuestionListDto(questionService.findByCollectionId(collectionId), true));
  }

  @PostMapping
  public ResponseEntity<CollectionInfo> createCollection(
      @RequestBody @Valid CollectionDto collectionDto) {
    return ResponseEntity.status(HttpStatus.CREATED.value())
        .body(collectionMapper.toCollectionInfo(
            collectionService.create(collectionMapper.toCollection(collectionDto))));
  }

  @DeleteMapping("{collectionId}")
  public ResponseEntity<Void> deleteCollection(@PathVariable Long collectionId) {
    collectionService.delete(collectionId);
    return ResponseEntity.noContent().build();
  }
}
