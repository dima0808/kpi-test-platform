package kpi.ficting.kpitestplatform.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TestDto {

  @NotBlank(message = "Test name is mandatory")
  @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
  private String name;

  @FutureOrPresent(message = "Open date must be in the present or future")
  @NotNull(message = "Open date is mandatory")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
  private LocalDateTime openDate;

  @Future(message = "Deadline must be in the future")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
  private LocalDateTime deadline;

  @Min(value = 1, message = "Minutes to complete test must be greater than 0")
  private Integer minutesToComplete;

  @NotNull(message = "Questions are mandatory")
  @Size(min = 1, message = "Test must have at least one question")
  @Valid
  private List<QuestionDto> questions;
}
