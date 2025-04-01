import{_ as s,c as e,a,o as t}from"./app-vo1rYq2c.js";const n={};function l(h,i){return t(),e("div",null,i[0]||(i[0]=[a(`<h2 id="连接至飞行器机载电脑" tabindex="-1"><a class="header-anchor" href="#连接至飞行器机载电脑"><span>连接至飞行器机载电脑</span></a></h2><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>默认账户密码为</p><table><thead><tr><th>Account</th><th>Password</th></tr></thead><tbody><tr><td>emnavi</td><td>123456</td></tr></tbody></table></div><p>有四种方法可以连接到飞行器pc</p><ul><li>USB 虚拟网卡连接</li><li>连接至 X152b的热点（AP）</li><li>将X152b连接至路由器 (STA)</li><li>Hdmi + 键鼠</li></ul><p>热点 和 STA 模式不兼容，切换推荐通过 USB有线</p><h3 id="usb-连接" tabindex="-1"><a class="header-anchor" href="#usb-连接"><span>USB 连接</span></a></h3><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>USB OTG模式会在连接过其他设备后自动退出</p></div><p>通过usb连接到主机(连接后主机会自动获取ip)，飞行器ip地址为 <code>192.168.108.1</code>,你可以通过ssh连接至设备</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">ssh</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> emnavi@192.168.108.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>除了ssh登录外，你还可以使用Nomachine登录</p><h3 id="ap模式" tabindex="-1"><a class="header-anchor" href="#ap模式"><span>AP模式</span></a></h3><p>X152b设备被设计为出厂设置为AP模式，你可以通过连接至 <code>emNavi-XXXXXXXXX-5G</code>访问设备，飞行器ip为 <strong>192.168.109.1</strong></p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">ssh</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> emnavi@192.168.109.1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>除了ssh登录外，你还可以使用Nomachine登录</p><h3 id="sta-模式" tabindex="-1"><a class="header-anchor" href="#sta-模式"><span>STA 模式</span></a></h3><p>在<strong>除AP模式之外</strong>的其他连接模式中通过以下方式连接至其他wifi</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> python3</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> /opt/init_emnavi_device/04_clean_wifi_connect.py</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # 清除所有wifi连接，包括关闭ap模式</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nmcli</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> device</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> wifi</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> list</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # 列出所有的搜索到的wifi</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> nmcli</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> device</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> wifi</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> connect</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">wifi_nam</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">e</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">  password</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &lt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">wifi_passwor</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">d</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>&lt;wifi_name&gt; ： wifi名</li><li>&lt;wifi_password&gt;: wifi密码</li></ul><p>除了ssh登录外，你还可以使用Nomachine登录</p><h3 id="hdmi-键鼠" tabindex="-1"><a class="header-anchor" href="#hdmi-键鼠"><span>Hdmi + 键鼠</span></a></h3><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>出厂状态下，连接HDMI并不会直接进入到图形化界面，这是这是为了Nomachine能够正常工作。为了图形化界面正常工作，你可以进行如下操作。</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 在连接了键鼠之后，使用emnavi账户登录，密码123456</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> systemctl</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> set-default</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> graphical.target</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> reboot</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> #重启设备</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启完成后应该正常显示图形化界面</p></div>`,21)]))}const d=s(n,[["render",l],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/production_doc/X152b/zfxyfnb2/","title":"连接至X152b","lang":"zh-CN","frontmatter":{"title":"连接至X152b","createTime":"2024/10/23 20:04:31","permalink":"/production_doc/X152b/zfxyfnb2/","description":"连接至飞行器机载电脑 相关信息 默认账户密码为 有四种方法可以连接到飞行器pc USB 虚拟网卡连接 连接至 X152b的热点（AP） 将X152b连接至路由器 (STA) Hdmi + 键鼠 热点 和 STA 模式不兼容，切换推荐通过 USB有线 USB 连接 相关信息 USB OTG模式会在连接过其他设备后自动退出 通过usb连接到主机(连接后主机...","head":[["meta",{"property":"og:url","content":"https://hyaline.qyswarm.top/production_doc/X152b/zfxyfnb2/"}],["meta",{"property":"og:site_name","content":"Reflections of Hyaline"}],["meta",{"property":"og:title","content":"连接至X152b"}],["meta",{"property":"og:description","content":"连接至飞行器机载电脑 相关信息 默认账户密码为 有四种方法可以连接到飞行器pc USB 虚拟网卡连接 连接至 X152b的热点（AP） 将X152b连接至路由器 (STA) Hdmi + 键鼠 热点 和 STA 模式不兼容，切换推荐通过 USB有线 USB 连接 相关信息 USB OTG模式会在连接过其他设备后自动退出 通过usb连接到主机(连接后主机..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-24T06:17:18.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-24T06:17:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"连接至X152b\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-24T06:17:18.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"连接至飞行器机载电脑","slug":"连接至飞行器机载电脑","link":"#连接至飞行器机载电脑","children":[{"level":3,"title":"USB 连接","slug":"usb-连接","link":"#usb-连接","children":[]},{"level":3,"title":"AP模式","slug":"ap模式","link":"#ap模式","children":[]},{"level":3,"title":"STA 模式","slug":"sta-模式","link":"#sta-模式","children":[]},{"level":3,"title":"Hdmi + 键鼠","slug":"hdmi-键鼠","link":"#hdmi-键鼠","children":[]}]}],"readingTime":{"minutes":1.42,"words":425},"git":{"createdTime":1729748473000,"updatedTime":1729750638000,"contributors":[{"name":"hyaline-wang","email":"hyaline-wang","commits":1}]},"autoDesc":true,"filePathRelative":"notes/production_doc/X152b/X152b_connect.md"}');export{d as comp,r as data};
