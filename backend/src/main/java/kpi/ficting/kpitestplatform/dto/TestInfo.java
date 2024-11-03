package kpi.ficting.kpitestplatform.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TestInfo {

  String id;
  private String name;
  private String description;
  private LocalDateTime openDate;
  private LocalDateTime deadline;
  private Integer minutesToComplete;
  private Integer maxScore;
}
