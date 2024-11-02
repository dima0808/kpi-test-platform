package kpi.ficting.kpitestplatform.web;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import kpi.ficting.kpitestplatform.dto.QuestionDto;
import kpi.ficting.kpitestplatform.dto.TestDto;
import kpi.ficting.kpitestplatform.service.QuestionService;
import kpi.ficting.kpitestplatform.service.TestService;
import kpi.ficting.kpitestplatform.service.mapper.QuestionMapper;
import kpi.ficting.kpitestplatform.service.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

  @GetMapping
  public ResponseEntity<List<TestDto>> getAllTests() {
    return ResponseEntity.ok(testService.findAll().stream()
        .map(testMapper::toTestDto)
        .toList());
  }

  @GetMapping("{testId}")
  public ResponseEntity<TestDto> getTestById(@PathVariable UUID testId) {
    return ResponseEntity.ok(testMapper.toTestDto(testService.findById(testId)));
  }

  @GetMapping("{testId}/questions")
  public ResponseEntity<List<QuestionDto>> getQuestionsByTestId(@PathVariable UUID testId) {
    return ResponseEntity.ok(questionService.findByTestId(testId).stream()
        .map(questionMapper::toQuestionDto)
        .toList());
  }

  @PostMapping
  public ResponseEntity<TestDto> createTest(@RequestBody @Valid TestDto testDto) {
    return ResponseEntity.status(HttpStatus.CREATED.value())
        .body(testMapper.toTestDto(testService.create(testMapper.toTest(testDto))));
  }
}
