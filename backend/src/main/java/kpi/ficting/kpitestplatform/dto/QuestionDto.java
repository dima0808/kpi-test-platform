package kpi.ficting.kpitestplatform.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class QuestionDto {

  private String content;
  private Integer points;
  private String type;
  private List<AnswerDto> answers;
}
