import{_ as i,c as e,a,o as n}from"./app-vo1rYq2c.js";const t={};function l(d,s){return n(),e("div",null,s[0]||(s[0]=[a(`<h2 id="准备环境" tabindex="-1"><a class="header-anchor" href="#准备环境"><span>准备环境</span></a></h2><h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>windows</span></a></h3><p><mark>安装nodejs</mark></p><p><mark>安装pnpm</mark></p><h3 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu"><span>ubuntu</span></a></h3><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -fsSL</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://get.pnpm.io/install.sh</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> sh</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># nodejs</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">curl</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -o-</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> bash</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">nvm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> install</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 22</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">node</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -v</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> # should print \`v22.9.0\`</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建文档" tabindex="-1"><a class="header-anchor" href="#构建文档"><span>构建文档</span></a></h2><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">git</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> clone</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> https://github.com/hyaline-wang/Knowledge-Base.git</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> Knowledge-Base</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">pnpm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> intsall</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 运行本地服务</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">pnpm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> docs:dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>编写文档时请启动docs:dev服务，它会自动为md文件创建frontmatter</p></div>`,9)]))}const h=i(t,[["render",l],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/4n9ntwua/","title":"01vuepress_doc","lang":"zh-CN","frontmatter":{"title":"01vuepress_doc","createTime":"2024/10/13 14:45:03","permalink":"/article/4n9ntwua/","description":"准备环境 windows 安装nodejs 安装pnpm ubuntu 构建文档 相关信息 编写文档时请启动docs:dev服务，它会自动为md文件创建frontmatter","head":[["meta",{"property":"og:url","content":"https://hyaline.qyswarm.top/article/4n9ntwua/"}],["meta",{"property":"og:site_name","content":"Reflections of Hyaline"}],["meta",{"property":"og:title","content":"01vuepress_doc"}],["meta",{"property":"og:description","content":"准备环境 windows 安装nodejs 安装pnpm ubuntu 构建文档 相关信息 编写文档时请启动docs:dev服务，它会自动为md文件创建frontmatter"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-19T09:02:53.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-19T09:02:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"01vuepress_doc\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-19T09:02:53.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"准备环境","slug":"准备环境","link":"#准备环境","children":[{"level":3,"title":"windows","slug":"windows","link":"#windows","children":[]},{"level":3,"title":"ubuntu","slug":"ubuntu","link":"#ubuntu","children":[]}]},{"level":2,"title":"构建文档","slug":"构建文档","link":"#构建文档","children":[]}],"readingTime":{"minutes":0.3,"words":91},"git":{"createdTime":1728805878000,"updatedTime":1729328573000,"contributors":[{"name":"hyaline-wang","email":"hyaline-wang","commits":2}]},"autoDesc":true,"filePathRelative":"doc_build/01vuepress_doc.md","categoryList":[{"id":"a699cf","sort":10003,"name":"doc_build"}]}');export{h as comp,r as data};
