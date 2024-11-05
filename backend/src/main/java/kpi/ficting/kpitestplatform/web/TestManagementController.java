package kpi.ficting.kpitestplatform.web;

import jakarta.validation.Valid;
import java.util.UUID;
import kpi.ficting.kpitestplatform.dto.QuestionListDto;
import kpi.ficting.kpitestplatform.dto.SampleListDto;
import kpi.ficting.kpitestplatform.dto.TestDto;
import kpi.ficting.kpitestplatform.dto.TestInfo;
import kpi.ficting.kpitestplatform.dto.TestListInfo;
import kpi.ficting.kpitestplatform.service.QuestionService;
import kpi.ficting.kpitestplatform.service.SampleService;
import kpi.ficting.kpitestplatform.service.TestService;
import kpi.ficting.kpitestplatform.service.mapper.QuestionMapper;
import kpi.ficting.kpitestplatform.service.mapper.TestMapper;
import kpi.ficting.kpitestplatform.service.mapper.impl.SampleMapperImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/tests")
@RequiredArgsConstructor
public class TestManagementController {

  private final TestService testService;
  private final TestMapper testMapper;

  private final QuestionService questionService;
  private final QuestionMapper questionMapper;

  private final SampleService sampleService;
  private final SampleMapperImpl sampleMapper;

  @GetMapping
  public ResponseEntity<TestListInfo> getAllTests() {
    return ResponseEntity.ok(testMapper.toTestListInfo(testService.findAll(), true));
  }

  @GetMapping("{testId}")
  public ResponseEntity<TestInfo> getTestInfoById(@PathVariable UUID testId) {
    return ResponseEntity.ok(testMapper.toTestInfo(testService.findById(testId), true));
  }

  @GetMapping("{testId}/questions")
  public ResponseEntity<QuestionListDto> getQuestionsByTestId(@PathVariable UUID testId) {
    return ResponseEntity.ok(
        questionMapper.toQuestionListDto(questionService.findByTestId(testId), true));
  }

  @GetMapping("{testId}/samples")
  public ResponseEntity<SampleListDto> getSamplesByTestId(@PathVariable UUID testId) {
    return ResponseEntity.ok(sampleMapper.toSampleListDto(sampleService.findByTestId(testId)));
  }

  @PostMapping
  public ResponseEntity<TestInfo> createTest(@RequestBody @Valid TestDto testDto) {
    return ResponseEntity.status(HttpStatus.CREATED.value())
        .body(testMapper.toTestInfo(testService.create(testMapper.toTest(testDto)), true));
  }

  @PutMapping("{testId}")
  public ResponseEntity<TestInfo> updateTest(@PathVariable UUID testId,
      @RequestBody @Valid TestDto testDto) {
    return ResponseEntity.ok(
        testMapper.toTestInfo(testService.update(testId, testMapper.toTest(testDto)), true));
  }

  @DeleteMapping("{testId}")
  public ResponseEntity<Void> deleteTest(@PathVariable UUID testId) {
    testService.deleteById(testId);
    return ResponseEntity.noContent().build();
  }
}
