import{_ as t,c as a,a as n,o as s}from"./app-vo1rYq2c.js";const i={};function l(p,e){return s(),a("div",null,e[0]||(e[0]=[n(`<p>测试系统</p><ul><li>ubuntu 20.04</li></ul><h2 id="设置中文语言" tabindex="-1"><a class="header-anchor" href="#设置中文语言"><span>设置中文语言</span></a></h2><p>打开 系统设置——区域和语言——管理已安装的语言——在“语言”tab下——点击“添加或删除语言” <img src="https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-1.8106d423.jpg&amp;w=640&amp;q=75" alt=""> 弹出“已安装语言”窗口，勾选中文（简体），点击应用 <img src="https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-2.4afc85d1.jpg&amp;w=640&amp;q=75" alt=""></p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span>安装</span></a></h2><p><a href="https://shurufa.sogou.com/linux/guide" target="_blank" rel="noopener noreferrer">sogou</a></p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>mkdir -p install &amp;&amp; cd install </span></span>
<span class="line"><span>sudo apt-get install fcitx</span></span>
<span class="line"><span>sudo apt purge ibus</span></span>
<span class="line"><span>sudo apt install -y libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2</span></span>
<span class="line"><span>sudo apt install -y libgsettings-qt1s</span></span>
<span class="line"><span>wget http://10.42.0.1:8890/Software/sogoupinyin_4.2.1.145_amd64.deb</span></span>
<span class="line"><span>sudo dpkg -i sogoupinyin_4.2.1.145_amd64.deb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7)]))}const r=t(i,[["render",l],["__file","index.html.vue"]]),c=JSON.parse('{"path":"/linux_base/common_pkg_install/fh3pxjmn/","title":"中文输入法安装","lang":"zh-CN","frontmatter":{"title":"中文输入法安装","createTime":"2024/09/07 12:23:02","permalink":"/linux_base/common_pkg_install/fh3pxjmn/","description":"测试系统 ubuntu 20.04 设置中文语言 打开 系统设置——区域和语言——管理已安装的语言——在“语言”tab下——点击“添加或删除语言” 弹出“已安装语言”窗口，勾选中文（简体），点击应用 安装 sogou","head":[["meta",{"property":"og:url","content":"https://hyaline.qyswarm.top/linux_base/common_pkg_install/fh3pxjmn/"}],["meta",{"property":"og:site_name","content":"Reflections of Hyaline"}],["meta",{"property":"og:title","content":"中文输入法安装"}],["meta",{"property":"og:description","content":"测试系统 ubuntu 20.04 设置中文语言 打开 系统设置——区域和语言——管理已安装的语言——在“语言”tab下——点击“添加或删除语言” 弹出“已安装语言”窗口，勾选中文（简体），点击应用 安装 sogou"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-1.8106d423.jpg&w=640&q=75"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-20T14:14:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-20T14:14:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"中文输入法安装\\",\\"image\\":[\\"https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-1.8106d423.jpg&w=640&q=75\\",\\"https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-2.4afc85d1.jpg&w=640&q=75\\"],\\"dateModified\\":\\"2024-10-20T14:14:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"设置中文语言","slug":"设置中文语言","link":"#设置中文语言","children":[]},{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]}],"readingTime":{"minutes":0.51,"words":153},"git":{"createdTime":1725899925000,"updatedTime":1729433657000,"contributors":[{"name":"hyaline-wang","email":"hyaline-wang","commits":1}]},"autoDesc":true,"filePathRelative":"notes/linux_base/常用软件安装/sougou_install.md"}');export{r as comp,c as data};
