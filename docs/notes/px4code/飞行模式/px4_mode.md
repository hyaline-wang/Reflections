---
title: Px4Mode
createTime: 2024/09/06 23:36:40
permalink: /px4code/lx82vmmh/
---

#  控制模式

```c++
uint64_t timestamp;

bool flag_armed;
bool flag_multicopter_position_control_enabled;
bool flag_control_manual_enabled;
bool flag_control_auto_enabled;
bool flag_control_offboard_enabled;
bool flag_control_position_enabled;
bool flag_control_velocity_enabled;
bool flag_control_altitude_enabled;
bool flag_control_climb_rate_enabled;
bool flag_control_acceleration_enabled;
bool flag_control_attitude_enabled;
bool flag_control_rates_enabled;
bool flag_control_allocation_enabled;
bool flag_control_termination_enabled;
uint8_t source_id;
uint8_t _padding0[1]; // required for logger
```

似乎是可以自由组合的