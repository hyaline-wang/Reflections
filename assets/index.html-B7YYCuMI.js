import{_ as i,c as a,a as t,o as e}from"./app-vo1rYq2c.js";const n={};function l(r,s){return e(),a("div",null,s[0]||(s[0]=[t(`<p>Px4 文档提供了<a href="https://docs.px4.io/main/en/flight_stack/controller_diagrams.html#multicopter-control-architecture" target="_blank" rel="noopener noreferrer">Multicopter Control Architecture</a></p><p>但是实际速度不太能对的上</p><p>PX4 上的应用程序拥有<a href="https://docs.px4.io/main/en/concept/architecture.html#runtime-environment" target="_blank" rel="noopener noreferrer">两种模式</a></p><ul><li>Task</li><li>work queue Task <ul><li>通过指定<strong>未来的固定时间</strong>或通过 uORB 主题<strong>更新回调</strong>来安排工作队列任务。一般在init 中设置 控制器的实现均依靠 work queue Task，因此其频率orb msg 的频率是相关的，Px4提供了<a href="https://docs.px4.io/main/en/middleware/uorb.html" target="_blank" rel="noopener noreferrer"><code>uorb top -1</code></a>的命令监控消息频率。</li></ul></li></ul><h1 id="orb-频率监控" tabindex="-1"><a class="header-anchor" href="#orb-频率监控"><span>orb 频率监控</span></a></h1><p>以下是 6c 和 nxtpx4 的实测数据</p><blockquote><p>px4 提供了 <a href="https://docs.px4.io/main/en/middleware/uorb_graph.html#uorb-publication-subscription-graph" target="_blank" rel="noopener noreferrer">uORB Publication/Subscription Graph</a> ，但是太乱了</p></blockquote><p>FMU v6 V1. 13.1 和 V1.13.2 （两个版本数据接近）</p><p>nsh&gt; uorb top -1</p><p>update: 1s, topics: 122, total publications: 15685, 1472.2 kB/s<br> TOPIC NAME                      INST #SUB RATE #Q SIZE<br> actuator_armed                     0   13    2  1   16 <br> actuator_controls_0                0   10  663  1   48 <br> actuator_outputs                   2    1  400  1   80 <br> adc_report                         0    1  100  1   96 <br> battery_status                     0    7  100  1  168 <br> commander_state                    0    1    2  1   16 <br> cpuload                            0    4    2  1   16 <br> ekf2_timestamps                    0    1  221  1   24 <br> estimator_attitude                 0    2  221  1   56 <br> estimator_attitude                 1    1  203  1   56 <br> estimator_event_flags              0    1    1  1   56 <br> estimator_event_flags              1    1    1  1   56 <br> estimator_innovation_test_ratios   0    1  110  1  136 <br> estimator_innovation_test_ratios   1    1  101  1  136 <br> estimator_innovation_variances     0    1  110  1  136 <br> estimator_innovation_variances     1    1  101  1  136 <br> estimator_innovations              0    1  110  1  136 <br> estimator_innovations              1    1  101  1  136 <br> estimator_local_position           0    2  110  1  168 <br> estimator_local_position           1    1  101  1  168 <br> estimator_odometry                 0    1  110  1  256 <br> estimator_selector_status          0    7    1  1  160 <br> estimator_sensor_bias              0    4    1  1  120 <br> estimator_sensor_bias              1    1    1  1  120 <br> estimator_states                   0    1  110  1  216 <br> estimator_states                   1    1  101  1  216 <br> estimator_status                   0    5  110  1  112 <br> estimator_status                   1    2  101  1  112 <br> estimator_status_flags             0    2    1  1   96 <br> estimator_status_flags             1    1    1  1   96 <br> failure_detector_status            0    1    2  1   24 <br> magnetometer_bias_estimate         0    2   46  1   64 <br> px4io_status                       0    1    1  1  144 <br> rate_ctrl_status                   0    1  663  1   24 <br> rtl_time_estimate                  0    2    1  1   24 <br> safety                             0    2    1  1   16 <br> sensor_accel                       0    5  664  8   48 <br> sensor_accel                       1    4  812  8   48 <br> sensor_baro                        0    2   69  4   32 <br> sensor_combined                    0    3  221  1   48 <br> sensor_gyro                        0    6  665  8   48 <br> sensor_gyro                        1    4  812  8   48 <br> sensor_gyro_fifo                   0    2  665  4  224 <br> sensor_mag                         0    5   46  4   40 <br> sensors_status_imu                 0    2  221  1   96 <br> system_power                       0    2  100  1   40 <br> telemetry_status                   0    2    2  1   88 <br> telemetry_status                   1    1    1  1   88 <br> vehicle_acceleration               0    2  221  1   32 <br> vehicle_air_data                   0   11   19  1   40 <br> vehicle_angular_acceleration       0    2  663  1   32 <br> vehicle_angular_velocity           0    9  663  1   32 <br> vehicle_attitude                   0    9  221  1   56 <br> vehicle_attitude_setpoint          0    4  221  1   64 <br> vehicle_control_mode               0   16    2  1   24 <br> vehicle_imu                        0    5  221  1   56 <br> vehicle_imu                        1    5  203  1   56 <br> vehicle_imu_status                 0    8   10  1  120 <br> vehicle_imu_status                 1    5    9  1  120 <br> vehicle_land_detected              0   14    1  1   24 <br> vehicle_local_position             0   24  110  1  168 <br> vehicle_magnetometer               0    4   13  1   40 <br> vehicle_odometry                   0    1  110  1  256 <br> vehicle_rates_setpoint             0    4  221  1   32 <br> vehicle_status                     0   28    2  1   88 <br> vehicle_status_flags               0    5    2  1   48</p><hr><p>Nxtpx4 V1.13.2</p><p>update: 1s, topics: 89, total publications: 27719, 2088.0 kB/s<br> TOPIC NAME                      INST #SUB RATE #Q SIZE<br> actuator_armed                     0    9    2  1   16 <br> actuator_controls_0                0    9 2000  1   48 <br> actuator_outputs                   0    3 2000  1   80 <br> adc_report                         0    2  100  1   96 <br> battery_status                     0    7  100  1  168 <br> commander_state                    0    1    2  1   16 <br> control_allocator_status           0    2 2000  1   80 <br> cpuload                            0    4    2  1   16 <br> ekf2_timestamps                    0    1  173  1   24 <br> estimator_attitude                 0    2  173  1   56 <br> estimator_event_flags              0    1    1  1   56 <br> estimator_innovation_test_ratios   0    1   86  1  136 <br> estimator_innovation_variances     0    1   86  1  136 <br> estimator_innovations              0    1   86  1  136 <br> estimator_local_position           0    2   86  1  168 <br> estimator_odometry                 0    1   86  1  256 <br> estimator_selector_status          0    6    1  1  160 <br> estimator_sensor_bias              0    4    1  1  120 <br> estimator_states                   0    1   86  1  216 <br> estimator_status                   0    5   86  1  112 <br> estimator_status_flags             0    2    1  1   96 <br> estimator_visual_odometry_aligned  0    1  154  1  256 <br> failure_detector_status            0    1    2  1   24 <br> rate_ctrl_status                   0    1 2000  1   24 <br> rtl_time_estimate                  0    2    1  1   24 <br> safety                             0    2    1  1   16 <br> sensor_accel                       0    5 1600  8   48 <br> sensor_baro                        0    2   23  4   32 <br> sensor_combined                    0    2  173  1   48 <br> sensor_gyro                        0    6 2000  8   48 <br> sensor_gyro_fifo                   0    2 2000  4  224 <br> sensors_status_imu                 0    2  173  1   96 <br> system_power                       0    2  100  1   40 <br> telemetry_status                   0    2    1  1   88 <br> telemetry_status                   1    1    2  1   88 <br> vehicle_acceleration               0    3 1600  1   32 <br> vehicle_air_data                   0   10   15  1   40 <br> vehicle_angular_acceleration       0    2 2000  1   32 <br> vehicle_angular_velocity           0   10 2000  1   32 <br> vehicle_attitude                   0    9  173  1   56 <br> vehicle_attitude_setpoint          0    4  173  1   64 <br> vehicle_control_mode               0   14    2  1   24 <br> vehicle_imu                        0    4  173  1   56 <br> vehicle_imu_status                 0    8    9  1  120 <br> vehicle_land_detected              0   13    1  1   24 <br> vehicle_local_position             0   24   86  1  168 <br> vehicle_odometry                   0    1   86  1  256 <br> vehicle_rates_setpoint             0    4  173  1   32 <br> vehicle_status                     0   27    2  1   88 <br> vehicle_status_flags               0    5    2  1   48 <br> vehicle_visual_odometry            0    2  200  1  256</p><h1 id="控制频率图" tabindex="-1"><a class="header-anchor" href="#控制频率图"><span>控制频率图</span></a></h1><p>根据以上数据,得到实际的控制频率如下图</p><p><img src="https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted image 20240724170815.png" alt=""></p><p><img src="https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted image 20240724170834.png" alt=""></p><p>观察上图 ，ORB_ID(vehicle_attitude_setpoint) 两倍于输入频率</p><blockquote><p>以下以 Nxtpx4 V1.13.2 为例</p></blockquote><h1 id="orb-id-vehicle-attitude-setpoint" tabindex="-1"><a class="header-anchor" href="#orb-id-vehicle-attitude-setpoint"><span>ORB_ID(vehicle_attitude_setpoint)</span></a></h1><p>对于 四旋翼 PUB 来自三个程序</p><h2 id="multicopterpositioncontrol" tabindex="-1"><a class="header-anchor" href="#multicopterpositioncontrol"><span>MulticopterPositionControl</span></a></h2><p>_vehicle_attitude_setpoint_pub 与以下两个因素相关</p><ul><li>_vehicle_control_mode.flag_multicopter_position_control_enabled</li><li>ORB_ID(vehicle_local_position)</li></ul><h2 id="multicopterattitudecontrol" tabindex="-1"><a class="header-anchor" href="#multicopterattitudecontrol"><span>MulticopterAttitudeControl</span></a></h2><p>与以下两个因素相关</p><ul><li>_v_control_mode.flag_control_attitude_enabled &amp;&amp; (is_hovering || is_tailsitter_transition)</li><li>ORB_ID(vehicle_attitude)</li></ul><p>注意: vehicle attitude 的频率是 221 hz</p><h1 id="mavlinkreceiver" tabindex="-1"><a class="header-anchor" href="#mavlinkreceiver"><span>MavlinkReceiver</span></a></h1><p>mavlink 直接控制姿态</p><p>使用 <strong>Nxtpx4</strong> 重新测试： 将 飞机切换为 POSITION 模式后 ，ORB_ID(vehicle_attitude_setpoint) 频率变为 87 hz。</p><h1 id="工作队列频率" tabindex="-1"><a class="header-anchor" href="#工作队列频率"><span>工作队列频率</span></a></h1><p>最后通过 <code>work_queue status</code> 可以看到(Nxtxp4)工作队列的频率</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">nsh</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> work_queue status</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  </span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Work Queue: 8  threads                          RATE        INTERVAL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:rate_ctrl      </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) mc_rate_control                 2000.6 Hz          500 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) pwm_out0                        1997.3 Hz          501 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 3</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) vehicle_angular_velocity        2000.6 Hz          500 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:SPI3           </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) bmi088_accel                    1606.2 Hz          623 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) bmi088_gyro                     2000.5 Hz          500 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 3</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:I2C1           </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) bmp388                            23.1 Hz        43299 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">43300 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 4</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:nav_and_controllers  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) ekf2_selector                    258.8 Hz         3863 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) flight_mode_manager               50.0 Hz        19998 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 3</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) land_detector                     86.4 Hz        11579 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 4</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) mc_att_control                   173.1 Hz         5776 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 5</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) mc_hover_thrust_estimator         86.6 Hz        11552 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 6</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) mc_pos_control                    86.3 Hz        11584 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 7</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) sensors                          173.1 Hz         5776 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 8</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) vehicle_acceleration            1606.3 Hz          623 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 9</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) vehicle_air_data                  23.1 Hz        43307 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__10</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) vehicle_gps_position               3.3 Hz       299993 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 5</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:INS0           </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) ekf2                             173.1 Hz         5776 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) vehicle_imu                      519.4 H                 100.0 Hz        10000 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) board_adc                        100.0 Hz        10000 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">10000 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 3</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) gyro_totune_attitude_control       0.0 Hz            0 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">   |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 6</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) rc_update                        142.9 Hz         7000 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 7</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) tone_alarm                         0.1 Hz     15154584 us  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 7</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:ttyS4          </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">|</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">   \\__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) rc_input                         250.0 Hz         4000 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">4000 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">\\__ 8</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) wq:lp_default     </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) gyro_calibration                  48.8 Hz        20479 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">20000 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 2</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) load_mon                           2.0 Hz       499799 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">500000 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">__ 3</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) mag_bias_estimator                49.9 Hz        20041 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">20000 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)  </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    \\__ 4</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) send_event                        30.0 Hz        33333 us (</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">33333 us</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与orb数据可以对的上 |   |__ 1) mc_rate_control                 2000.6 Hz          500 us<br> |   |__ 6) mc_pos_control                    86.3 Hz        11584 us<br> |   |__ 4) mc_att_control                   173.1 Hz         5776 us</p>`,35)]))}const h=i(n,[["render",l],["__file","index.html.vue"]]),o=JSON.parse('{"path":"/px4code/controller/pwlltgw1/","title":"ctrl_freq","lang":"zh-CN","frontmatter":{"title":"ctrl_freq","createTime":"2024/09/09 17:26:41","permalink":"/px4code/controller/pwlltgw1/","description":"Px4 文档提供了Multicopter Control Architecture 但是实际速度不太能对的上 PX4 上的应用程序拥有两种模式 Task work queue Task 通过指定未来的固定时间或通过 uORB 主题更新回调来安排工作队列任务。一般在init 中设置 控制器的实现均依靠 work queue Task，因此其频率orb m...","head":[["meta",{"property":"og:url","content":"https://hyaline.qyswarm.top/px4code/controller/pwlltgw1/"}],["meta",{"property":"og:site_name","content":"Reflections of Hyaline"}],["meta",{"property":"og:title","content":"ctrl_freq"}],["meta",{"property":"og:description","content":"Px4 文档提供了Multicopter Control Architecture 但是实际速度不太能对的上 PX4 上的应用程序拥有两种模式 Task work queue Task 通过指定未来的固定时间或通过 uORB 主题更新回调来安排工作队列任务。一般在init 中设置 控制器的实现均依靠 work queue Task，因此其频率orb m..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240724170815.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T14:14:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-20T14:14:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ctrl_freq\\",\\"image\\":[\\"https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240724170815.png\\",\\"https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240724170834.png\\"],\\"dateModified\\":\\"2024-10-20T14:14:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"MulticopterPositionControl","slug":"multicopterpositioncontrol","link":"#multicopterpositioncontrol","children":[]},{"level":2,"title":"MulticopterAttitudeControl","slug":"multicopterattitudecontrol","link":"#multicopterattitudecontrol","children":[]}],"readingTime":{"minutes":4.55,"words":1366},"git":{"createdTime":1725899925000,"updatedTime":1729433657000,"contributors":[{"name":"hyaline-wang","email":"hyaline-wang","commits":1}]},"autoDesc":true,"filePathRelative":"notes/px4code/控制器/ctrl_freq.md"}');export{h as comp,o as data};
