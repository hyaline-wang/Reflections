import{_ as n,c as a,a as e,o as i}from"./app-vo1rYq2c.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<div class="hint-container warning"><p class="hint-container-title">注意</p><p>wireguard使用UDP进行通讯，国内运营商会对udp进行限流，导致带宽上不去，一种解决方案是将udp包装成tcp，但是需要服务器和客户端同时安装，比较麻烦。</p></div><p>vpn 虚拟局域网工具，其连接需要server 与 client 交换公钥。</p><p>没有办法 Traversing the NAT ， 似乎需要更多的配置</p><h1 id="ubuntu下的安装" tabindex="-1"><a class="header-anchor" href="#ubuntu下的安装"><span>ubuntu下的安装</span></a></h1><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> apt</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> wiregurad</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h2><p>生成公钥私钥</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>mkdir wireGuard_cfg</span></span>
<span class="line"><span>cd wireGuard_cfg/</span></span>
<span class="line"><span>wg genkey &gt; privatekey  # 生成私钥</span></span>
<span class="line"><span>wg pubkey &lt; privatekey &gt; publickey #用私钥生成公钥</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建配置文件<code>touch wg0.conf</code> server和 client 只有配置文件不同</p><p>server_config</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[Interface]</span></span>
<span class="line"><span>Address = 10.5.5.1/24</span></span>
<span class="line"><span>ListenPort = 51820</span></span>
<span class="line"><span># Use your own private key</span></span>
<span class="line"><span>PrivateKey =  your_private_key</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Peer]</span></span>
<span class="line"><span># Workstation public key 5900</span></span>
<span class="line"><span>PublicKey = your_public_key</span></span>
<span class="line"><span># VPN client&#39;s IP address in the VPN</span></span>
<span class="line"><span>AllowedIPs = 10.5.5.2/32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Peer]</span></span>
<span class="line"><span># laptop public key nuc server</span></span>
<span class="line"><span>PublicKey = your_public_key</span></span>
<span class="line"><span># VPN client&#39;s IP address in the VPN</span></span>
<span class="line"><span>AllowedIPs = 10.5.5.3/32</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>client_config</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[Interface]</span></span>
<span class="line"><span># The address your computer will use on the VPN</span></span>
<span class="line"><span>Address = 10.5.5.2/32</span></span>
<span class="line"><span>DNS = 8.8.8.8</span></span>
<span class="line"><span># Load your privatekey from file</span></span>
<span class="line"><span>PostUp = wg set %i private-key /home/hao/23_workspace/wireguard/privatekey</span></span>
<span class="line"><span># Also ping the vpn server to ensure the tunnel is initialized</span></span>
<span class="line"><span>PostUp = ping -c1 10.5.5.1</span></span>
<span class="line"><span>[Peer]</span></span>
<span class="line"><span># VPN server&#39;s wireguard public key</span></span>
<span class="line"><span>PublicKey = server_private_key</span></span>
<span class="line"><span># Public IP address of your VPN server (USE YOURS!)</span></span>
<span class="line"><span>Endpoint = 120.46.221.18:51820</span></span>
<span class="line"><span># 10.0.0.0/24 is the VPN subnet</span></span>
<span class="line"><span>AllowedIPs = 0.0.0.0/0, ::/0</span></span>
<span class="line"><span># PersistentKeepalive = 25</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启 与关闭</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wg-quick</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> up</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> $(</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">pwd</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/wg0.conf</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wg-quick</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> down</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> $(</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">pwd</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/wg0.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-wireguard配置" tabindex="-1"><a class="header-anchor" href="#_1-wireguard配置"><span>1.wireguard配置</span></a></h2><h1 id="_1-服务器端" tabindex="-1"><a class="header-anchor" href="#_1-服务器端"><span>1. 服务器端</span></a></h1><h2 id="ipv4-forward-enable" tabindex="-1"><a class="header-anchor" href="#ipv4-forward-enable"><span>ipv4 forward enable</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>vim /etc/sysctl.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 修改</span></span>
<span class="line"><span>##########################################</span></span>
<span class="line"><span># Uncomment the next line to enable packet forwarding for IPv4</span></span>
<span class="line"><span>net.ipv4.ip_forward=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>############################################</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sysctl -p # 生效设置，不要忘了</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装-wireguard" tabindex="-1"><a class="header-anchor" href="#安装-wireguard"><span>安装 wireguard</span></a></h2><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>apt install wireguard resolvconf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="server-配置" tabindex="-1"><a class="header-anchor" href="#server-配置"><span>server 配置</span></a></h2><p>生成key，找一个用来存储公钥和私钥的地方生成一对公钥和私钥</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wg</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> genkey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> privatekey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> wg</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> pubkey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> publickey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置，全在 /etc/wireguard/wg0.conf中完成，client也是如此</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[Interface]</span></span>
<span class="line"><span># 设置vpn中服务器的地址，client是可以ping到服务器的</span></span>
<span class="line"><span>Address = 10.120.0.1</span></span>
<span class="line"><span># wireguard提供了默认端口()，但是为了安全这里使用</span></span>
<span class="line"><span>ListenPort = 39814</span></span>
<span class="line"><span># 在配置里，私钥都是本机的，公钥全是其他机子的</span></span>
<span class="line"><span>PrivateKey = aChEu1qGxDAcKHFhOqzUNMCkfP3lhScppO3O6ORrf0Y=</span></span>
<span class="line"><span># DNS默认就好</span></span>
<span class="line"><span>DNS = 8.8.8.8</span></span>
<span class="line"><span># 如果用于上网的网卡不是 eth0 ，请改成对应的</span></span>
<span class="line"><span>PostUp   = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span>PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE</span></span>
<span class="line"><span></span></span>
<span class="line"><span># peer 指的是client，server上可以存多个peer,换句话说,增加设备需要更改服务器设置</span></span>
<span class="line"><span>[peer]</span></span>
<span class="line"><span># my 12700</span></span>
<span class="line"><span>AllowedIPs = 10.120.0.0/24</span></span>
<span class="line"><span># 这里指的是对应的client 的公钥</span></span>
<span class="line"><span>PublicKey = Xnrt2ZU8wtkWzpKqday6oTljD9Dy7gghIKN/46h0mEg=</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>[peer]</span></span>
<span class="line"><span># my 5900</span></span>
<span class="line"><span># 这里设置成仅设备ip可用</span></span>
<span class="line"><span>AllowedIPs = 10.120.0.0/24</span></span>
<span class="line"><span># 这里指的是对应的client 的公钥</span></span>
<span class="line"><span>PublicKey = 8u5/gIUUOqBbaCzvVwmfzhvYJMccZJTz2eAZrb1FSXo=</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果想添加一个设备,仅需使用下面设置</span></span>
<span class="line"><span>[peer]</span></span>
<span class="line"><span>PublicKey = 8u5/gIUUOqBbaCzvVwmfzhvYJMccZJTz2eAZrb1FSXo=</span></span>
<span class="line"><span>AllowedIPs = 10.120.0.0/24</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="server-热重载" tabindex="-1"><a class="header-anchor" href="#server-热重载"><span>server 热重载</span></a></h2><p>不知道是否管用</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>wg syncconf wg0 &lt;(wg-quick strip wg0)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="_2-客户端" tabindex="-1"><a class="header-anchor" href="#_2-客户端"><span>2. 客户端</span></a></h1><p>找一个用来存储公钥和私钥的地方生成一对公钥和私钥</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">wg</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> genkey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> tee</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> privatekey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> wg</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> pubkey</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> &gt;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> publickey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[Interface]</span></span>
<span class="line"><span># 本机地址要修改</span></span>
<span class="line"><span>Address = 10.120.0.3</span></span>
<span class="line"><span>ListenPort = 39815 # 如果不做中转可以没有这一行</span></span>
<span class="line"><span># 本机私钥</span></span>
<span class="line"><span>PrivateKey = 2GRUV9RwsJ8cOfif83S4pcWNVBTtcenaZBzVYK5BCkY=</span></span>
<span class="line"><span>DNS = 8.8.8.8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Peer]</span></span>
<span class="line"><span>AllowedIPs = 10.0.0.0/24</span></span>
<span class="line"><span>Endpoint = 45.89.228.246:39814</span></span>
<span class="line"><span># 服务器公钥，不要改</span></span>
<span class="line"><span>PublicKey = M20PNElOAo6AhLN4MeAkx65F3Cy7arCSpp9SawfbRDw=</span></span>
<span class="line"><span>PersistentKeepalive = 25</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更详细的客户端配置参考[[2.如何添加一个设备(用户侧)]]</p><h1 id="_3-其他" tabindex="-1"><a class="header-anchor" href="#_3-其他"><span>3. 其他</span></a></h1><h2 id="测试结果" tabindex="-1"><a class="header-anchor" href="#测试结果"><span>测试结果</span></a></h2><p>购买了一个月的俄罗斯服务器，测试从秦皇岛ping西伯利亚是 110ms，双向就是220ms，这个状况下桌面有明显的延时。(有一部分原因是 Nomachine 在 不创建服务器的情况下本身延时就大) 看来没有国内的服务器的话是不行的</p><h2 id="防火墙设置" tabindex="-1"><a class="header-anchor" href="#防火墙设置"><span>防火墙设置</span></a></h2><p>俄罗斯服务器Justshot的管理做的稀碎，防火墙需要自己整</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>root@vm799874:~# ufw status</span></span>
<span class="line"><span>Status: active</span></span>
<span class="line"><span></span></span>
<span class="line"><span>To                         Action      From</span></span>
<span class="line"><span>--                         ------      ----</span></span>
<span class="line"><span>22/tcp                     ALLOW       Anywhere</span></span>
<span class="line"><span>39814                      ALLOW       Anywhere</span></span>
<span class="line"><span>22/tcp (v6)                ALLOW       Anywhere (v6)</span></span>
<span class="line"><span>39814 (v6)                 ALLOW       Anywhere (v6)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开机自启" tabindex="-1"><a class="header-anchor" href="#开机自启"><span>开机自启</span></a></h2><h2 id="_2-如何添加一个设备-用户侧" tabindex="-1"><a class="header-anchor" href="#_2-如何添加一个设备-用户侧"><span>2.如何添加一个设备(用户侧)</span></a></h2><h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h1><p><a href="https://www.wireguard.com/install/" target="_blank" rel="noopener noreferrer">安装wireguard</a>，如果是ubuntu，可使用<code>apt install wireguard resolvconf</code>,以下均以ubuntu 为例</p><h1 id="创建密钥" tabindex="-1"><a class="header-anchor" href="#创建密钥"><span>创建密钥</span></a></h1><ol start="2"><li>创建一个文件夹用于存储公钥，并生成一对公钥和私钥<div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span># example</span></span>
<span class="line"><span>mkdir wg_key</span></span>
<span class="line"><span>cd wg_key</span></span>
<span class="line"><span>wg genkey | tee privatekey | wg pubkey &gt; publickey</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>将公钥<code>publickey</code>发给管理员，等待管理员回复过程中先继续</li></ol><h1 id="配置wireguard" tabindex="-1"><a class="header-anchor" href="#配置wireguard"><span>配置wireguard</span></a></h1><ol><li>切换到 root 模式 <code>sudo su</code></li><li><code>cd /etc/wireguard</code></li><li><code>vim wg0.conf</code></li></ol><p>复制下面文字到 wg0.conf， 修改 ip 和 私钥(上一步生成的<code>privatekey</code>)</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[Interface]</span></span>
<span class="line"><span># 本机地址要修改</span></span>
<span class="line"><span>Address = 10.120.0.3</span></span>
<span class="line"><span>ListenPort = 39815</span></span>
<span class="line"><span># 本机私钥</span></span>
<span class="line"><span>PrivateKey = 2GRUV9RwsJ8cOfif83S4pcWNVBTtcenaZBzVYK5BCkY=</span></span>
<span class="line"><span>DNS = 8.8.8.8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Peer]</span></span>
<span class="line"><span>AllowedIPs = 10.0.0.0/24</span></span>
<span class="line"><span>Endpoint = 45.89.228.246:39814</span></span>
<span class="line"><span># 服务器公钥，不要改</span></span>
<span class="line"><span>PublicKey = M20PNElOAo6AhLN4MeAkx65F3Cy7arCSpp9SawfbRDw=</span></span>
<span class="line"><span>PersistentKeepalive = 25</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="等待完成" tabindex="-1"><a class="header-anchor" href="#等待完成"><span>等待完成</span></a></h1><p>等待管理员的通知，</p><p>现在你可以使用以下命令管理了</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span></span></span>
<span class="line"><span>sudo wg-quick up wg0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo wg-quick down wg0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>phantun udp2tcp</p><p>https://icloudnative.io/posts/wireguard-over-tcp-using-phantun/</p><p>似乎没有windows版</p><p>从目前的需求来说 ruskdesk应该还是最满足需求的</p><p>正点原子Lora 不适合用来传RTK的消息</p>`,59)]))}const r=n(l,[["render",p],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/linux_base/network/nnr7rvii/","title":"wireguard","lang":"zh-CN","frontmatter":{"title":"wireguard","createTime":"2024/09/09 13:10:25","permalink":"/linux_base/network/nnr7rvii/","description":"注意 wireguard使用UDP进行通讯，国内运营商会对udp进行限流，导致带宽上不去，一种解决方案是将udp包装成tcp，但是需要服务器和客户端同时安装，比较麻烦。 vpn 虚拟局域网工具，其连接需要server 与 client 交换公钥。 没有办法 Traversing the NAT ， 似乎需要更多的配置 ubuntu下的安装 配置 生成公...","head":[["meta",{"property":"og:url","content":"https://hyaline.qyswarm.top/linux_base/network/nnr7rvii/"}],["meta",{"property":"og:site_name","content":"Reflections of Hyaline"}],["meta",{"property":"og:title","content":"wireguard"}],["meta",{"property":"og:description","content":"注意 wireguard使用UDP进行通讯，国内运营商会对udp进行限流，导致带宽上不去，一种解决方案是将udp包装成tcp，但是需要服务器和客户端同时安装，比较麻烦。 vpn 虚拟局域网工具，其连接需要server 与 client 交换公钥。 没有办法 Traversing the NAT ， 似乎需要更多的配置 ubuntu下的安装 配置 生成公..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T14:14:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-20T14:14:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"wireguard\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-20T14:14:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"配置","slug":"配置","link":"#配置","children":[]},{"level":2,"title":"1.wireguard配置","slug":"_1-wireguard配置","link":"#_1-wireguard配置","children":[]},{"level":2,"title":"ipv4 forward enable","slug":"ipv4-forward-enable","link":"#ipv4-forward-enable","children":[]},{"level":2,"title":"安装 wireguard","slug":"安装-wireguard","link":"#安装-wireguard","children":[]},{"level":2,"title":"server 配置","slug":"server-配置","link":"#server-配置","children":[]},{"level":2,"title":"server 热重载","slug":"server-热重载","link":"#server-热重载","children":[]},{"level":2,"title":"测试结果","slug":"测试结果","link":"#测试结果","children":[]},{"level":2,"title":"防火墙设置","slug":"防火墙设置","link":"#防火墙设置","children":[]},{"level":2,"title":"开机自启","slug":"开机自启","link":"#开机自启","children":[]},{"level":2,"title":"2.如何添加一个设备(用户侧)","slug":"_2-如何添加一个设备-用户侧","link":"#_2-如何添加一个设备-用户侧","children":[]}],"readingTime":{"minutes":3.9,"words":1171},"git":{"createdTime":1725899925000,"updatedTime":1729433657000,"contributors":[{"name":"hyaline-wang","email":"hyaline-wang","commits":1}]},"autoDesc":true,"filePathRelative":"notes/linux_base/网络相关/wireguard.md"}');export{r as comp,c as data};
