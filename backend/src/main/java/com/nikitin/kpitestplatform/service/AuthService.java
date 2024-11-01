package com.nikitin.kpitestplatform.service;

import com.nikitin.kpitestplatform.dto.LoginDto;

public interface AuthService {

  String login(LoginDto loginDto);
}
