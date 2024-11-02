package kpi.ficting.kpitestplatform.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TestDto {

  private String id;

  @NotBlank(message = "Name is mandatory")
  @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
  private String name;

  @Size(min = 3, max = 250, message = "Description must be between 3 and 250 characters")
  private String description;

  @FutureOrPresent(message = "Open date must be in the present or future")
  @NotNull(message = "Open date is mandatory") // todo: ask Valerii about nullable open date
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
  private LocalDateTime openDate;

  @Future(message = "Deadline must be in the future")
  @NotNull(message = "Deadline is mandatory")
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy HH:mm")
  private LocalDateTime deadline;
}
