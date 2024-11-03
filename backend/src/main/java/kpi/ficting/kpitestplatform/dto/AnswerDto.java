package kpi.ficting.kpitestplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AnswerDto {

  private String content;
  private Boolean isCorrect;
  private String leftOption;
  private String rightOption;
}