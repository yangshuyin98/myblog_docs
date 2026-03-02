import{_ as a,c as n,o as p,ag as e}from"./chunks/framework.oP1PDRBo.js";const g=JSON.parse('{"title":"VitePress + Github Pages","description":"","frontmatter":{"title":"VitePress + Github Pages","date":"2024-02-10T00:00:00.000Z","tags":["VitePress","Github Pages"],"categories":["健康生活健康生活"],"sticky":3},"headers":[],"relativePath":"vitepress/部署/VitePress+Github Pages详细v1.6.3.md","filePath":"vitepress/部署/VitePress+Github Pages详细v1.6.3.md","lastUpdated":1772415502000}'),l={name:"vitepress/部署/VitePress+Github Pages详细v1.6.3.md"};function i(t,s,c,o,d,r){return p(),n("div",null,s[0]||(s[0]=[e(`<h1 id="vitepress-github-pages详细如何搭建个人博客" tabindex="-1">VitePress + Github Pages详细如何搭建个人博客 <a class="header-anchor" href="#vitepress-github-pages详细如何搭建个人博客" aria-label="Permalink to &quot;VitePress + Github Pages详细如何搭建个人博客&quot;">​</a></h1><p>难度：★★★☆☆</p><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2><p><strong>前言：</strong></p><p>这里将介绍作为一个国内开发者，采取的最推荐的vitepress（vue3推荐方式）的方式进行搭建，这也是当下最流行的方式哦！</p><h2 id="_1、认识和介绍vitepress" tabindex="-1">1、认识和介绍vitepress <a class="header-anchor" href="#_1、认识和介绍vitepress" aria-label="Permalink to &quot;1、认识和介绍vitepress&quot;">​</a></h2><p>VitePress 由 Vite 和 Vue 驱动的静态站点生成器 简单、强大、快速。就是你想要的现代 SSG 框架！</p><p>我们只需要写markdown文档就可以生成好看的博客文章，或者说，你直接写就成为了你的博客文章！</p><p>目前官网给我们推荐的方式有以下这几种：</p><p>这里我就直接采取了yarn的方式进行构建，下面是我的版本号：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node v22.14.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>经测试（Node 18.20.4 运行我们项目也完全没问题）</span></span></code></pre></div><h2 id="_2、vitepress搭建和运行" tabindex="-1">2、vitepress搭建和运行 <a class="header-anchor" href="#_2、vitepress搭建和运行" aria-label="Permalink to &quot;2、vitepress搭建和运行&quot;">​</a></h2><p><code>环境 Node 18 或者Node 20 推荐 </code>接下来就开始搭建咋们的个人博客</p><p>这里我们使用pnpm式，当然yarn，npm都是可以的,如果你没有安装pnpm可以全局安装</p><p><strong>先执行 <code>npm i pnpm -g</code> 安装一下</strong></p><p>开始构建我们的博客</p><h3 id="👉-新建一个blogs文件夹" tabindex="-1">👉 新建一个blogs文件夹 <a class="header-anchor" href="#👉-新建一个blogs文件夹" aria-label="Permalink to &quot;👉 新建一个blogs文件夹&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir  blogs</span></span></code></pre></div><p>进入目录名blogs</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>cd  blogs</span></span></code></pre></div><p>cmd打开blogs文件夹</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm init</span></span>
<span class="line"><span>yarn init  // 初始化</span></span></code></pre></div><p>安装需要的依赖,使用<code>pnpm</code>将<code>vitepress</code>安装为本地依赖。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm add -D vitepress</span></span>
<span class="line"><span>yarn add -D vitepress //添加vitepress</span></span></code></pre></div><ul><li><strong>pnpm add</strong>：用于添加新的依赖包，并将其记录在 <em>package.json</em> 文件中。</li><li><strong>pnpm install</strong>：用于安装项目中所有的依赖包，不会修改 <em>package.json</em> 文件。</li><li><em>-D</em> 或 <em>--save-dev</em>：将包添加到 <em>devDependencies</em> 中。</li><li><em>-g</em> 或 <em>--global</em>：全局安装包。</li><li><em>-O</em> 或 <em>--save-optional</em>：将包添加到 <em>optionalDependencies</em> 中</li><li><em>--dev</em> 或 <em>-D</em>：仅安装 <em>devDependencies</em> 中的包。</li><li><em>--force</em>：强制重新安装所有依赖。</li></ul><p>初始化Vitepress</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm vitepress init</span></span>
<span class="line"><span>yarn vitepress init // 用vitepress初始化项目 ，直接一直按</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>T  Welcome to VitePress!</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Where should VitePress initialize the config?</span></span>
<span class="line"><span>|  ./docs</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Site title:</span></span>
<span class="line"><span>|  My Awesome Project</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Site description:</span></span>
<span class="line"><span>|  A VitePress Site</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Theme:</span></span>
<span class="line"><span>|  Default Theme + Customization</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Use TypeScript for config and theme files?</span></span>
<span class="line"><span>|  No</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Add VitePress npm scripts to package.json?</span></span>
<span class="line"><span>|  Yes</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>—  Done! Now run pnpm run docs:dev and start writing.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Tips:</span></span>
<span class="line"><span>- Since you&#39;ve chosen to customize the theme, you should also explicitly install vue as a dev dependency.</span></span></code></pre></div><p>初始化成功后，使用vscode或webstorm打开文件夹，会看到这样一个目录。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─ docs</span></span>
<span class="line"><span>│  ├─ .vitepress</span></span>
<span class="line"><span>│  │  └─ config.js</span></span>
<span class="line"><span>│  ├─ api-examples.md</span></span>
<span class="line"><span>│  ├─ markdown-examples.md</span></span>
<span class="line"><span>│  └─ index.md 入口文件</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre></div><p>接下来简单介绍一下每个文件的含义</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.vitepress，最核心的目录，</span></span>
<span class="line"><span>theme目录。自定义主题配置，css样式等</span></span>
<span class="line"><span>config.mjs。最核心的文件，各种配置导航栏、侧边栏、标题什么的都是在这里</span></span>
<span class="line"><span>node_modules。安装的依赖</span></span>
<span class="line"><span>api-examples.md和markdown-examples.md。官方给的两个示例</span></span>
<span class="line"><span>index.md。主页相关</span></span>
<span class="line"><span>package.json和pnpm-lock.yml。包管理工具需要用的</span></span></code></pre></div><h3 id="👉-启动项目" tabindex="-1">👉 启动项目 <a class="header-anchor" href="#👉-启动项目" aria-label="Permalink to &quot;👉 启动项目&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm run docs:dev</span></span>
<span class="line"><span>yarn docs:dev //运行</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 打包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:build</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 预览</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:preview</span></span></code></pre></div><p>打开，看到这个，说明初始化成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  ➜  Local:   http://localhost:5173/</span></span>
<span class="line"><span>  ➜  Network: use --host to expose</span></span>
<span class="line"><span>  ➜  press h to show help</span></span></code></pre></div><p>这个时候直接浏览器访问就可以了！</p><p>ok，一个基础的博客已近搭建完了，试了试，前后不过三分钟</p><h2 id="_3、vitepress博客配置" tabindex="-1">3、vitepress博客配置 <a class="header-anchor" href="#_3、vitepress博客配置" aria-label="Permalink to &quot;3、vitepress博客配置&quot;">​</a></h2><p>看看我们的文档结构：</p><h3 id="👉配置路由" tabindex="-1">👉配置路由 <a class="header-anchor" href="#👉配置路由" aria-label="Permalink to &quot;👉配置路由&quot;">​</a></h3><p>配置好了以后，接下来就开始设置砸门自己的博客了</p><p>docs/.vitepress/config.mts 配置路由等基本信息</p><h3 id="👉设置浏览器标题和博客标题" tabindex="-1">👉设置浏览器标题和博客标题 <a class="header-anchor" href="#👉设置浏览器标题和博客标题" aria-label="Permalink to &quot;👉设置浏览器标题和博客标题&quot;">​</a></h3><p>我的是选择的ts版本的，位于.vitepress=&gt; config.mts 文件里面：</p><h3 id="👉设置网站logo" tabindex="-1">👉设置网站logo <a class="header-anchor" href="#👉设置网站logo" aria-label="Permalink to &quot;👉设置网站logo&quot;">​</a></h3><p>在根目录下面新建一个public=&gt; logo.svg config.mts之中修改<code>themeConfig</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>themeConfig: {                     // 配置logo位置，public目录</span></span>
<span class="line"><span>    title: &quot;modern的Vitepress文档&quot;,</span></span>
<span class="line"><span>    description: &quot;一个vitepress站点&quot;,</span></span>
<span class="line"><span>    logo: &#39;/logo.svg&#39;,  </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>vitepress原生支持国外的sociallink，如果是国内需要自行复制svg代码</p><h3 id="👉设置网站标题sitetitle" tabindex="-1">👉设置网站标题siteTitle <a class="header-anchor" href="#👉设置网站标题sitetitle" aria-label="Permalink to &quot;👉设置网站标题siteTitle&quot;">​</a></h3><ul><li>网站标题可以单独设置</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> themeConfig: {</span></span>
<span class="line"><span> 	siteTitle: &quot;modern的Vitepress文档&quot;,</span></span>
<span class="line"><span>    description: &quot;一个vitepress站点&quot;,    </span></span>
<span class="line"><span>    logo: &#39;/my-logo.svg&#39;,</span></span>
<span class="line"><span>    siteTitle:&#39;壮壮牛牛♥&#39;,</span></span>
<span class="line"><span> }</span></span></code></pre></div><ul><li>隐藏站点标题 <code>siteTitle</code>设置为false即可</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// .vitepress/config.js</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>    themeConfig: {</span></span>
<span class="line"><span>    title: &quot;modern的Vitepress文档&quot;,</span></span>
<span class="line"><span>    description: &quot;一个vitepress站点&quot;,    </span></span>
<span class="line"><span>    logo: &#39;/my-logo.svg&#39;,</span></span>
<span class="line"><span>    siteTitle: false</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="👉设置导航栏" tabindex="-1">👉设置导航栏 <a class="header-anchor" href="#👉设置导航栏" aria-label="Permalink to &quot;👉设置导航栏&quot;">​</a></h3><p>在<code>themeConfig.nav</code> 更改导航栏。</p><p>其中 <code>text</code> 是 nav 中显示文本，而 <code>link</code> 是单击文本时的链接。对于链接，将路径设置为不带 <code>.md</code> 后缀的实际文件，并且始终以 <code>/</code> 开头。</p><p>导航链接可以是下拉菜单。只需要替换 <code>link</code> 选项，设置 <code>items</code> 数组。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//config.mts</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>     /nav开始</span></span>
<span class="line"><span>    nav: [</span></span>
<span class="line"><span>      { text: &#39;Home&#39;, link: &#39;/&#39; },      </span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;VitePress&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;VitePress&#39;, link: &#39;/document/vitepress/zh/guide/what-is-vitepress&#39; },</span></span>
<span class="line"><span>          { text: &#39;参考&#39;, link: &#39;/document/vitepress/zh/reference/site-config&#39; },</span></span>
<span class="line"><span>          { text: &#39;Examples&#39;, link: &#39;/document/vitepress/markdown-examples&#39; },</span></span>
<span class="line"><span>          { text: &#39;api-examples&#39;, link: &#39;/document/vitepress/api-examples&#39; },]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;前端&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;vue&#39;, link: &#39;/item-1&#39; },</span></span>
<span class="line"><span>          { text: &#39;JavaScript&#39;, link: &#39;/item-2&#39; },</span></span>
<span class="line"><span>          { text: &#39;vue&#39;, link: &#39;/item-3&#39; },</span></span>
<span class="line"><span>          { text: &#39;else&#39;, link: &#39;/item-3&#39; },]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;后端&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;java&#39;, link: &#39;/item-1&#39; },</span></span>
<span class="line"><span>          { text: &#39;python&#39;, link: &#39;/item-2&#39; },</span></span>
<span class="line"><span>          { text: &#39;else&#39;, link: &#39;/item-3&#39; },]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    //nav结束</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="👉美化文章页" tabindex="-1">👉美化文章页 <a class="header-anchor" href="#👉美化文章页" aria-label="Permalink to &quot;👉美化文章页&quot;">​</a></h3><p>默认进来官方给的示例是三边栏的</p><p>左边是sidebar的配置，右边是显示的文章目录（默认显示一二级）。</p><h3 id="👉设置右侧链接" tabindex="-1">👉设置右侧链接 <a class="header-anchor" href="#👉设置右侧链接" aria-label="Permalink to &quot;👉设置右侧链接&quot;">​</a></h3><p>右侧导航栏默认索引的是md文件的一二级标题，可能需要定义索引的标题级别和<code>On this page</code>这个说明。这个时候需要在config.mjs中配置下面这两个选项，<code>outlineTitle</code>用于替代On this page。<code>outline</code>定义展示的标题级别，这里定义2-6级</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> themeConfig: {</span></span>
<span class="line"><span>  outlineTitle: &#39;文章目录&#39;,</span></span>
<span class="line"><span>  outline: [2,6],</span></span>
<span class="line"><span>  }</span></span></code></pre></div><p><code>vitepress/config.ts</code>文件，在<code>themeConfig</code>中配置<code>outline</code>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>themeConfig: {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    outline: {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      level: [2, 6],</span></span>
<span class="line"><span>      label: &#39;目录&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h3 id="👉自动生成侧边栏" tabindex="-1"><strong>👉自动生成侧边栏</strong> <a class="header-anchor" href="#👉自动生成侧边栏" aria-label="Permalink to &quot;**👉自动生成侧边栏**&quot;">​</a></h3><p>我们使用这种配置时常常是一个目录有很多md文件，这些md文件所在的目录对应导航栏的一个选项。侧边栏的配置需要自己手写一个个路由映射到相应的文件上，那么有没有一个自动生成侧边栏的工具呢？根据一个目录下面的所有md文件自动生成路由，可以使用下面这个脚本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import path from &quot;node:path&quot;;</span></span>
<span class="line"><span>import fs from &quot;node:fs&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 文件根目录</span></span>
<span class="line"><span>const DIR_PATH = path.resolve();</span></span>
<span class="line"><span>// 白名单,过滤不是文章的文件和文件夹</span></span>
<span class="line"><span>const WHITE_LIST = [</span></span>
<span class="line"><span>  &quot;index.md&quot;,</span></span>
<span class="line"><span>  &quot;.vitepress&quot;,</span></span>
<span class="line"><span>  &quot;node_modules&quot;,</span></span>
<span class="line"><span>  &quot;.idea&quot;,</span></span>
<span class="line"><span>  &quot;assets&quot;,</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 判断是否是文件夹</span></span>
<span class="line"><span>const isDirectory = (path) =&gt; fs.lstatSync(path).isDirectory();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 取差值</span></span>
<span class="line"><span>const intersections = (arr1, arr2) =&gt;</span></span>
<span class="line"><span>  Array.from(new Set(arr1.filter((item) =&gt; !new Set(arr2).has(item))));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 把方法导出直接使用</span></span>
<span class="line"><span>function getList(params, path1, pathname) {</span></span>
<span class="line"><span>  // 存放结果</span></span>
<span class="line"><span>  const res = [];</span></span>
<span class="line"><span>  // 开始遍历params</span></span>
<span class="line"><span>  for (let file in params) {</span></span>
<span class="line"><span>    // 拼接目录</span></span>
<span class="line"><span>    const dir = path.join(path1, params[file]);</span></span>
<span class="line"><span>    // 判断是否是文件夹</span></span>
<span class="line"><span>    const isDir = isDirectory(dir);</span></span>
<span class="line"><span>    if (isDir) {</span></span>
<span class="line"><span>      // 如果是文件夹,读取之后作为下一次递归参数</span></span>
<span class="line"><span>      const files = fs.readdirSync(dir);</span></span>
<span class="line"><span>      res.push({</span></span>
<span class="line"><span>        text: params[file],</span></span>
<span class="line"><span>        collapsible: true,</span></span>
<span class="line"><span>        items: getList(files, dir, \`\${pathname}/\${params[file]}\`),</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      // 获取名字</span></span>
<span class="line"><span>      const name = path.basename(params[file]);</span></span>
<span class="line"><span>      // 排除非 md 文件</span></span>
<span class="line"><span>      const suffix = path.extname(params[file]);</span></span>
<span class="line"><span>      if (suffix !== &quot;.md&quot;) {</span></span>
<span class="line"><span>        continue;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      res.push({</span></span>
<span class="line"><span>        text: name,</span></span>
<span class="line"><span>        link: \`\${pathname}/\${name}\`,</span></span>
<span class="line"><span>      });</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  // 对name做一下处理，把后缀删除</span></span>
<span class="line"><span>  res.map((item) =&gt; {</span></span>
<span class="line"><span>    item.text = item.text.replace(/\\.md$/, &quot;&quot;);</span></span>
<span class="line"><span>  });</span></span>
<span class="line"><span>  return res;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const set_sidebar = (pathname) =&gt; {</span></span>
<span class="line"><span>  // 获取pathname的路径</span></span>
<span class="line"><span>  const dirPath = path.join(DIR_PATH, pathname);</span></span>
<span class="line"><span>  // 读取pathname下的所有文件或者文件夹</span></span>
<span class="line"><span>  const files = fs.readdirSync(dirPath);</span></span>
<span class="line"><span>  // 过滤掉</span></span>
<span class="line"><span>  const items = intersections(files, WHITE_LIST);</span></span>
<span class="line"><span>  // getList 函数后面会讲到</span></span>
<span class="line"><span>  return getList(items, dirPath, pathname);</span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="👉设置sociallinks" tabindex="-1">👉设置socialLinks <a class="header-anchor" href="#👉设置sociallinks" aria-label="Permalink to &quot;👉设置socialLinks&quot;">​</a></h3><p>使用themeConfig.socialLinks可以配置我们的社交链接，目前支持的有</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>type SocialLinkIcon =</span></span>
<span class="line"><span>  | &#39;discord&#39;</span></span>
<span class="line"><span>  | &#39;facebook&#39;</span></span>
<span class="line"><span>  | &#39;github&#39;</span></span>
<span class="line"><span>  | &#39;instagram&#39;</span></span>
<span class="line"><span>  | &#39;linkedin&#39;</span></span>
<span class="line"><span>  | &#39;slack&#39;</span></span>
<span class="line"><span>  | &#39;twitter&#39;</span></span>
<span class="line"><span>  | &#39;youtube&#39;</span></span>
<span class="line"><span>  | { svg: string }</span></span></code></pre></div><p>设置themeConfig=&gt; socialLinks</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>socialLinks: [</span></span>
<span class="line"><span>  { icon: &#39;github&#39;, link: &#39;https://github.com/NexusLin&#39;}</span></span>
<span class="line"><span>  { icon: &quot;twitter&quot;, link: &quot;...&quot; },</span></span>
<span class="line"><span>   // You can also add custom icons by passing SVG as string:</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        icon: {</span></span>
<span class="line"><span>          svg: &#39;&lt;svg role=&quot;img&quot; viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;&lt;title&gt;Dribbble&lt;/title&gt;&lt;path d=&quot;M12...6.38z&quot;/&gt;&lt;/svg&gt;&#39;,</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        link: &quot;...&quot;,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>],</span></span></code></pre></div><h3 id="👉设置页脚" tabindex="-1">👉设置页脚 <a class="header-anchor" href="#👉设置页脚" aria-label="Permalink to &quot;👉设置页脚&quot;">​</a></h3><p>设置themeConfig=&gt; footer</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> footer: {</span></span>
<span class="line"><span>  message: &quot;Released under the MIT License.&quot;,</span></span>
<span class="line"><span>  copyright: &quot;Copyright ©2025 modern&quot;,</span></span>
<span class="line"><span>},</span></span></code></pre></div><h3 id="👉设置主页布局" tabindex="-1">👉设置主页布局 <a class="header-anchor" href="#👉设置主页布局" aria-label="Permalink to &quot;👉设置主页布局&quot;">​</a></h3><p>页就是进入我们博客会加载docs/index.md,所以我们需要对其进行一个美化，我们VitePress默认主题提供了一个主页布局</p><p>.vitepress目录之外的 Markdown 文件被视为源文件。</p><p>VitePress 使用基于文件的路由：每个.md文件将在相同的路径被编译成为.html文件。例如，index.md将会被编译成index.html，可以在生成的 VitePress 站点的根路径/进行访问。</p><p>接下来我们根目录下面的<code>index.md</code>文件里面</p><h5 id="🍎首页的部分设置也非常简单-按照着设置一一对应就可以" tabindex="-1">🍎首页的部分设置也非常简单，按照着设置一一对应就可以 <a class="header-anchor" href="#🍎首页的部分设置也非常简单-按照着设置一一对应就可以" aria-label="Permalink to &quot;🍎首页的部分设置也非常简单，按照着设置一一对应就可以&quot;">​</a></h5><p>分别是</p><p>name:标题的博客</p><p>text: 随便写点啥</p><p>tagline: 帅气又迷人的小月</p><p>image:这里有一个图形，具体不知道哪里来的，但是非常好</p><p>actions:下面的按钮，</p><p>features:以及再下面的描述部分</p><p><img src="https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9322b86dd7c748f88edac126f2c8540a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p6X5aSq55m9:q75.awebp?rk3s=f64ab15b&amp;x-expires=1742385314&amp;x-signature=3tsRlEGSbKhrZJtO4xFbrPiACP0%3D" alt="image.png"></p><h5 id="🍎-也可以添加链接和图片" tabindex="-1">🍎 也可以添加链接和图片 <a class="header-anchor" href="#🍎-也可以添加链接和图片" aria-label="Permalink to &quot;🍎 也可以添加链接和图片&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>features:</span></span>
<span class="line"><span>  - icon: 📝</span></span>
<span class="line"><span>    title: 专注内容</span></span>
<span class="line"><span>    details: 只需 Markdown 即可轻松创建美观的文档站点。</span></span>
<span class="line"><span>link: /api-examples</span></span></code></pre></div><h5 id="🍎-自己在主页再添加markdown文本" tabindex="-1">🍎 自己在主页再添加markdown文本 <a class="header-anchor" href="#🍎-自己在主页再添加markdown文本" aria-label="Permalink to &quot;🍎 自己在主页再添加markdown文本&quot;">​</a></h5><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Markdown Extension Examples</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This page demonstrates some of the built-in markdown extensions provided by VitePress.</span></span></code></pre></div><h3 id="👉配置一个新页面gapi-md" tabindex="-1">👉配置一个新页面Gapi.md <a class="header-anchor" href="#👉配置一个新页面gapi-md" aria-label="Permalink to &quot;👉配置一个新页面Gapi.md&quot;">​</a></h3><p>根目录docs下新建一个TGapi.md文档，然后再index.md之中配置一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>在主页index.md=&gt; hero=&gt; actions</span></span>
<span class="line"><span>  actions:</span></span>
<span class="line"><span>    - theme: alt</span></span>
<span class="line"><span>      text: API Examples</span></span>
<span class="line"><span>      link: /TGapi</span></span></code></pre></div><h3 id="👉左侧侧边栏配置" tabindex="-1">👉左侧侧边栏配置 <a class="header-anchor" href="#👉左侧侧边栏配置" aria-label="Permalink to &quot;👉左侧侧边栏配置&quot;">​</a></h3><p>sidebar可以是数组，也可以是对象。还是修改config.mjs</p><p>在config.mts之中themeConfig=&gt; sidebar 配置左侧的侧边栏部分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> sidebar: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;TGapi文档&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;TGapi登陆注册&#39;, link: &#39;/item-a&#39; },</span></span>
<span class="line"><span>          { text: &#39;Item B&#39;, link: &#39;/item-b&#39; },</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>       {</span></span>
<span class="line"><span>        text: &#39;Examples&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;Markdown Examples&#39;, link: &#39;/markdown-examples&#39; },</span></span>
<span class="line"><span>          { text: &#39;Runtime API Examples&#39;, link: &#39;/api-examples&#39; }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span></code></pre></div><p>也就是点击进去的这部分</p><p><img src="https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bfb9312876964bb8923fda87d760fcff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p6X5aSq55m9:q75.awebp?rk3s=f64ab15b&amp;x-expires=1742385314&amp;x-signature=IUY5HudXBE7I9iFd2JaQRZZ64Ng%3D" alt="image.png"></p><p>不过我们一般不会使用这种方式配置侧边栏，因为这样每个页面都会有侧边栏。我们需要做到仅某些页面才会出现侧边栏。所以我们可以这样配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sidebar: {</span></span>
<span class="line"><span>      &quot;/articles/&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &quot;组件库源码实现&quot;,</span></span>
<span class="line"><span>          items: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>              text: &quot;组件库环境搭建&quot;,</span></span>
<span class="line"><span>              link: &quot;/articles/组件库环境搭建&quot;,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            { text: &quot;gulp的使用&quot;, link: &quot;/articles/gulp的使用&quot; },</span></span>
<span class="line"><span>          ],</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &quot;vue教程&quot;,</span></span>
<span class="line"><span>          items: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>              text: &quot;pina和vuex&quot;,</span></span>
<span class="line"><span>              link: &quot;/articles/pina和vuex&quot;,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>          ],</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>    },</span></span></code></pre></div><p>sideBar值改成一个对象，对象的key是一个路径，只有包含这个路径的才会出现侧边栏。所以我们将nav的配置中的guild改成博客，同时路径指向我们的articles下的markdown文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nav: [</span></span>
<span class="line"><span>      { text: &quot;博客&quot;, link: &quot;/articles/组件库环境搭建&quot; },</span></span>
<span class="line"><span>     ]</span></span></code></pre></div><p>此时你会发现进入首页并不会出现sideBar，只有点击博客才会出现侧边栏</p><h3 id="👉左侧侧边栏折叠" tabindex="-1">👉左侧侧边栏折叠 <a class="header-anchor" href="#👉左侧侧边栏折叠" aria-label="Permalink to &quot;👉左侧侧边栏折叠&quot;">​</a></h3><p>配置可折叠侧边栏只需将<code>collapsible</code>设置为<code>true</code>即可,默认初始页面是全部展开页面，如果你需要关闭状态只需要将<code>collapsed</code>设置为<code>true</code></p><p>在config.mts之中themeConfig=&gt; sidebar 配置左侧的侧边栏部分=&gt; 设置collapsed:true, 就可以成功折叠展开</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> {</span></span>
<span class="line"><span>        collapsed: false,</span></span>
<span class="line"><span>        text: &#39;TGapi文档&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;TGapi登陆注册&#39;, link: &#39;/item-a&#39; },</span></span>
<span class="line"><span>          { text: &#39;Item B&#39;, link: &#39;/item-b&#39; },</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      },</span></span></code></pre></div><h3 id="👉右侧侧边栏其实就是我们文章的标题" tabindex="-1">👉右侧侧边栏其实就是我们文章的标题 <a class="header-anchor" href="#👉右侧侧边栏其实就是我们文章的标题" aria-label="Permalink to &quot;👉右侧侧边栏其实就是我们文章的标题&quot;">​</a></h3><p>On this page 右侧一直显示一个是官方默认给我们的，其他都是我们自己的</p><p><img src="https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1f50c8c426fb49f2ba85202151c59be3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p6X5aSq55m9:q75.awebp?rk3s=f64ab15b&amp;x-expires=1742385314&amp;x-signature=GAr1CvNcSTBx3g4KVeerurLdEak%3D" alt="image.png"></p><h2 id="_4、新建页面和自定义页面" tabindex="-1">4、新建页面和自定义页面 <a class="header-anchor" href="#_4、新建页面和自定义页面" aria-label="Permalink to &quot;4、新建页面和自定义页面&quot;">​</a></h2><h4 id="👉新建一个页面hello-vue-在根目录docs下面存一个hello-vue文件" tabindex="-1">👉新建一个页面Hello.vue,在根目录docs下面存一个Hello.vue文件 <a class="header-anchor" href="#👉新建一个页面hello-vue-在根目录docs下面存一个hello-vue文件" aria-label="Permalink to &quot;👉新建一个页面Hello.vue,在根目录docs下面存一个Hello.vue文件&quot;">​</a></h4><p>然后在主页之中直接引入连接</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>import Hello from &#39;./Hello.vue&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Docs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a .md using a custom component</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Hello /&gt;</span></span></code></pre></div><p>Hello.md内容如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>	&lt;div class=&quot;pagehello&quot;&gt;我是vue页面&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>	.pagehello{</span></span>
<span class="line"><span>		width: 400x;</span></span>
<span class="line"><span>		height: 400px;</span></span>
<span class="line"><span>		background: cadetblue;</span></span>
<span class="line"><span>		color: #fff;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><p>看到这个操作vue文件。岂不是意味着我们可以随便定义我们的网站吗</p><h2 id="_5、自定义主题" tabindex="-1">5、自定义主题 <a class="header-anchor" href="#_5、自定义主题" aria-label="Permalink to &quot;5、自定义主题&quot;">​</a></h2><h4 id="_1、修改主题色" tabindex="-1">1、修改主题色 <a class="header-anchor" href="#_1、修改主题色" aria-label="Permalink to &quot;1、修改主题色&quot;">​</a></h4><p>上面描述了内容主体的整体布局，接下来谈谈整体配色。也就是，整体的绿色如何更换成其他颜色呢？</p><p>首先，我们需要确定想要更换的颜色色调，需要稍微统一一下。这里推荐个网站：<a href="https://coolors.co/palettes%E3%80%82" target="_blank" rel="noreferrer">https://coolors.co/palettes。</a></p><p>可以先在上面这个网站找一套自己喜欢的颜色，比如紫色：</p><p>之后呢，要做的就是，把<code>vitepress</code>项目中对应的全局变量的颜色给替换掉。<strong>具体操作如下：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 在.vitepress/theme/index.ts文件</span></span>
<span class="line"><span>import DefaultTheme from &#39;vitepress/theme&#39;;</span></span>
<span class="line"><span>import &#39;./custom.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  ...DefaultTheme</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span>// 在.vitepress/theme/custom.css文件</span></span>
<span class="line"><span>/* color vars: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css */</span></span>
<span class="line"><span>/* purple brand color: https://coolors.co/palette/dec9e9-dac3e8-d2b7e5-c19ee0-b185db-a06cd5-9163cb-815ac0-7251b5-6247aa */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Color Base */</span></span>
<span class="line"><span>:root {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  --vp-c-purple: #b185db;</span></span>
<span class="line"><span>  --vp-c-purple-light: #c19ee0;</span></span>
<span class="line"><span>  --vp-c-purple-lighter: #d2b7e5;</span></span>
<span class="line"><span>  --vp-c-purple-dark: #a06cd5;</span></span>
<span class="line"><span>  --vp-c-purple-darker: #9163cb;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 设置字体颜色 */</span></span>
<span class="line"><span>  /* --vp-home-hero-name-color: transparent; */</span></span>
<span class="line"><span>  /* --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff); */</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 设置右图像渐变 */</span></span>
<span class="line"><span>  --vp-home-hero-image-background-image: linear-gradient( -45deg, #8e99ee 50%, #ffffff 50% );</span></span>
<span class="line"><span>  --vp-home-hero-image-filter: blur(150px);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* Color Theme */</span></span>
<span class="line"><span>:root {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  --vp-c-brand: var(--vp-c-purple);</span></span>
<span class="line"><span>  --vp-c-brand-light: var(--vp-c-purple-light);</span></span>
<span class="line"><span>  --vp-c-brand-lighter: var(--vp-c-purple-lighter);</span></span>
<span class="line"><span>  --vp-c-brand-dark: var(--vp-c-purple-dark);</span></span>
<span class="line"><span>  --vp-c-brand-darker: var(--vp-c-purple-darker);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>这样，我们就完成整体主题色的替换：</p><p>大家可以看到，整体变成了以<strong>紫色调</strong>为主，右图像的渐变也有了。如果还想要修改其他跟主题色相关的颜色，可以看下官方<code>github</code>上的变量说明，进行相应的修改。</p><p>这里附上官方网站的详细说明：<a href="https://vitepress.dev/guide/extending-default-theme#customizing-css" target="_blank" rel="noreferrer">https://vitepress.dev/guide/extending-default-theme#customizing-css</a> ；</p><p>以及<code>github</code>的变量地址：<a href="https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css</a></p><h4 id="_2、更换主题" tabindex="-1">2、更换主题 <a class="header-anchor" href="#_2、更换主题" aria-label="Permalink to &quot;2、更换主题&quot;">​</a></h4><p>当我搭建到这一步的时候，就开始想着<code>vitepress</code>有没有像<code>vuepress-theme-reco</code>类似的主题。很遗憾的是，暂时还没看到。</p><p>不过在掘金社区里搜到一些博主自己搭建了一些主题，这里不做详细介绍，感兴趣的同学可以前往查看。戳链接：</p><ul><li>@sugarat/theme - <a href="https://theme.sugarat.top/" target="_blank" rel="noreferrer">https://theme.sugarat.top/</a></li><li><a href="https://juejin.cn/post/7196517835380293693#heading-1" target="_blank" rel="noreferrer">一个简约风的VitePress博客主题</a></li></ul><p>vitepress也支持我们自定义自己的主题，接下来我们就自定义一下自己的主题然后看看</p><p>在.vitepress=&gt; theme =&gt; index.ts</p><p>在这个里面不仅可以放我们的样式，同时也可以引入我们的组件，vitepress也推荐这种方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import DefaultTheme from &#39;vitepress/theme&#39;</span></span>
<span class="line"><span>// import Foo from &#39;../../views/Echarts.vue&#39;</span></span>
<span class="line"><span>import &#39;./tg.css&#39;</span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  extends: DefaultTheme,</span></span>
<span class="line"><span>  enhanceApp({ app }) {</span></span>
<span class="line"><span>    // app.component(&#39;foo&#39;, Foo)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><code>theme/tg.css</code> (天工开源的缩写)进行样式代码编写</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/* 该文件配置网站的文字  图标 等等 一系列dom元素的样式文件 */</span></span>
<span class="line"><span>:root {</span></span>
<span class="line"><span>  /* 通过配置 自定义颜色 */</span></span>
<span class="line"><span>  --vp-home-hero-name-color: transparent;</span></span>
<span class="line"><span>  /* 主页标题文字的颜色  */</span></span>
<span class="line"><span>  --vp-home-hero-name-background: -webkit-linear-gradient(</span></span>
<span class="line"><span>  -45deg, </span></span>
<span class="line"><span>  #47caff  50%, </span></span>
<span class="line"><span>  #5468ff</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  /* 主页左侧背景添加渐变光圈 */</span></span>
<span class="line"><span>  --vp-home-hero-image-background-image: linear-gradient(</span></span>
<span class="line"><span>  135deg, </span></span>
<span class="line"><span>  #5468ff 10%, </span></span>
<span class="line"><span>  #47caff  50%</span></span>
<span class="line"><span>  );</span></span>
<span class="line"><span>  --vp-home-hero-image-filter: blur(100px);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* botton按钮 */</span></span>
<span class="line"><span>  /* --vp-button-brand-border: #81634b; */</span></span>
<span class="line"><span>  /* 按钮文本颜色 */</span></span>
<span class="line"><span>  --vp-button-brand-text: #ffffff;</span></span>
<span class="line"><span>  /* 按钮背景颜色 */</span></span>
<span class="line"><span>  --vp-button-brand-bg: #5468ff;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*#00FFEE*/</span></span>
<span class="line"><span>  /* 鼠标悬停的效果之后的样式 */</span></span>
<span class="line"><span>  --vp-button-brand-hover-border: #bd34fe;</span></span>
<span class="line"><span>  --vp-button-brand-hover-text: #fff;</span></span>
<span class="line"><span>  --vp-button-brand-hover-bg: #bd34fe;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  --vp-button-brand-active-border: #bd34fe;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  /* 主题基色 */</span></span>
<span class="line"><span>  --vp-c-brand: #bd34fe;</span></span>
<span class="line"><span>  /* 白色模式 主题基色 */</span></span>
<span class="line"><span>  --vp-c-brand-light: #bd34fe;</span></span>
<span class="line"><span>  /* 黑色模式 主题基色 */</span></span>
<span class="line"><span>  --vp-c-brand-dark: #bd34fe;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>然后看看我们自己自定义的颜色</p><p><img src="https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f130218e1bb3423a9e2eda68945b893b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p6X5aSq55m9:q75.awebp?rk3s=f64ab15b&amp;x-expires=1742385314&amp;x-signature=Z5cTci9a%2B4zRP%2BosQRR43W71RhI%3D" alt="image.png"></p><h2 id="_6、开启搜索项" tabindex="-1">6、开启搜索项 <a class="header-anchor" href="#_6、开启搜索项" aria-label="Permalink to &quot;6、开启搜索项&quot;">​</a></h2><p>谈到搜索，<code>vitepress</code>支持两种搜索模式：<strong>本地搜索</strong>和<strong>algolia</strong>。对于<code>algolia</code>来说，相当于把网站的数据丢给<code>algolia</code>，然后当你在网站上进行搜索时，会向<code>algolia</code>发送一个请求，然后呢，<code>algolia</code>在你上传的数据中进行搜索，之后把结果返回给你，就可以在网站上进行展示。这种方式相对比较繁琐些，这里不详细介绍，有需要可以查看这篇文章：<a href="https://fyzhu.github.io/2022/11/01/vitepress-%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0-algolia-%E6%90%9C%E7%B4%A2/" target="_blank" rel="noreferrer">vitepress 如何开启 algolia 全文搜索</a>。</p><p>另一种方式是：<strong>本地搜索</strong>。本地搜索只需要这样处理即可：</p><p>设置themeConfig=&gt; socialLinks</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>search: {</span></span>
<span class="line"><span>      provider: &quot;local&quot;,</span></span>
<span class="line"><span> },</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// .vitepress/config.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import {</span></span>
<span class="line"><span>    defineConfig } from &#39;vitepress&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    search: {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>      provider: &#39;local&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre></div><h2 id="_7、-国际化i18n" tabindex="-1">7、 国际化i18n <a class="header-anchor" href="#_7、-国际化i18n" aria-label="Permalink to &quot;7、 国际化i18n&quot;">​</a></h2><p>对于个人博客来说，一般只用到中文。不过有的小伙伴可能会想要兼容下中英文，那么可以使用<strong>国际化i18n</strong>来解决。<code>vitepress</code>提供了这个解决方案：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// .vitepress/config.ts</span></span>
<span class="line"><span>themeConfig: {</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    i18nRouting: true</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>具体路由配置见这里：<a href="https://vitepress.dev/reference/default-theme-config#i18nrouting" target="_blank" rel="noreferrer">https://vitepress.dev/reference/default-theme-config#i18nrouting</a></p>`,159)]))}const u=a(l,[["render",i]]);export{g as __pageData,u as default};
