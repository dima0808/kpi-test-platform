package kpi.ficting.kpitestplatform.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CollectionDto {

  @NotBlank(message = "Collection name is mandatory")
  @Size(min = 1, max = 100, message = "Collection name must be between 3 and 100 characters")
  private String name;

  @NotNull(message = "Questions are mandatory")
  @Valid
  private List<QuestionDto> questions;
}
