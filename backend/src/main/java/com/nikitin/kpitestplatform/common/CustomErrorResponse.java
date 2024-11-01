package com.nikitin.kpitestplatform.common;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CustomErrorResponse {

  private int status;
  private String error;
  private String message;
  private String path;
}
