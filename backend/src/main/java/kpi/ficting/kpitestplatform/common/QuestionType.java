package kpi.ficting.kpitestplatform.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum QuestionType {

  SINGLE_CHOICE("single"),
  MULTIPLE_CHOICES("multiple"),
  MATCHING("matching");

  private final String displayName;
}
