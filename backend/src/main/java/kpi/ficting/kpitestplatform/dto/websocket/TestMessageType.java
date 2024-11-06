package kpi.ficting.kpitestplatform.dto.websocket;

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
