package kpi.ficting.kpitestplatform.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TestMessageType {

  OPEN("open"),
  ANSWER("answer"),
  CLOSE("close");

  private final String displayName;
}
