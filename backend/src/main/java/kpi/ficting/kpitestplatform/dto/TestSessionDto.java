package kpi.ficting.kpitestplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TestSessionDto {

  private String studentGroup;
  private String studentName;

  private String testId;
}
