import{_ as e,c as l,o as i,ag as n,j as a,t}from"./chunks/framework.KcKrU9KS.js";const m=JSON.parse('{"title":"vitepress从0到1","description":"","frontmatter":{"title":"vitepress从0到1","date":"2024-02-10T00:00:00.000Z","tags":["博客","vitepress"],"categories":["vitepress"],"sticky":3},"headers":[],"relativePath":"vitepress/部署/vitepress从0到1.md","filePath":"vitepress/部署/vitepress从0到1.md","lastUpdated":1772441968000}'),c={name:"vitepress/部署/vitepress从0到1.md"};function o(p,s,r,d,u,h){return i(),l("div",null,[s[0]||(s[0]=n(`<h1 id="vitepress从0到1-让每个前后端小伙伴都拥有一个属于自己的博客" tabindex="-1">vitepress从0到1，让每个前后端小伙伴都拥有一个属于自己的博客 <a class="header-anchor" href="#vitepress从0到1-让每个前后端小伙伴都拥有一个属于自己的博客" aria-label="Permalink to &quot;vitepress从0到1，让每个前后端小伙伴都拥有一个属于自己的博客&quot;">​</a></h1><p>难度：★★★☆☆</p><p>vitepress从0到1，让每个前后端小伙伴都拥有一个属于自己的博客 📸前言 之前周一的个人博客是用vuepress来搭建，但随着文章的数量越来越多，导致每回在启动的时候构建都特别慢，于是周一有了改构建工具的想法。这不，vitepress工具自发布后，在技术圈内一直有些火热，于是周一就想着把博客的整体升级为vitepress。在搜罗了官方文档等各大网站的资料后，总结出了以下这篇教程。希望能帮助到正想要搭建博客的小伙伴们~</p><p>在下面的文章中，将带你从0到1用vitepress搭建一个个人博客，从初始化到项目部署。一起来看看~🕵️</p><p>一、📡项目启航 学完这篇文章，你将会收获以下内容：</p><p>1.1 将会收获 自定义首页样式 拥有一个可自定义的侧导 高度自定义化一个专属个人的博客 1.2 快速搭建 首先创建并进入一个新目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>mkdir vitepress-demo-mondaylab &amp;&amp; cd vitepress-demo-mondaylab</span></span></code></pre></div><p>接着，使用你喜欢的包管理器进行初始化。这里我用<code>pnpm</code>，如下代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 如果没有安装过pnpm，可以全局安装下</span></span>
<span class="line"><span>sudo npm install -g pnpm</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 用pnpm初始化</span></span>
<span class="line"><span>pnpm init</span></span></code></pre></div><p>项目初始化完成以后，使用<code>pnpm</code>将<code>vitepress</code>安装为本地依赖。如下代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 安装命令</span></span>
<span class="line"><span>pnpm add vitepress -D</span></span></code></pre></div><p>在vitepress官方文档中提到，vitepress附带了一个命令行向导，来帮助我们构建一个基本的项目。通过以下命令来执行该操作：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>pnpm exec vitepress init</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>T  Welcome to VitePress!</span></span>
<span class="line"><span>|</span></span>
<span class="line"><span>o  Where should VitePress initialize the config?</span></span>
<span class="line"><span>|  ./docs                                              //docs自动生成</span></span>
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
<span class="line"><span>- Since you&#39;ve chosen to customize the theme, you should also explicitly install vue as a dev dependency.</span></span></code></pre></div><p>此时文件的目录结构是这样的，如下树状代码所示：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>├─ docs</span></span>
<span class="line"><span>│  ├─ .vitepress</span></span>
<span class="line"><span>│  │  └─ config.js</span></span>
<span class="line"><span>│  ├─ api-examples.md</span></span>
<span class="line"><span>│  ├─ markdown-examples.md</span></span>
<span class="line"><span>│  └─ index.md 入口文件</span></span>
<span class="line"><span>└─ package.json</span></span></code></pre></div><p>到这里，我们就基本完成了<code>vitepress</code>项目的初始化。最后，我们运行 <code>pnpm run docs:dev</code> 来打开项目。效果如下:</p><p>二、📹美化个人博客 基础框架我们已经搭建完成，但看着博客的整体内容还比较少。接下来我们需要对博客进行进一步美化。</p><p>2.1 整体布局 首先，我们需要了解下博客的整体布局，才能更好的做美化。</p><p>1、首页 对于vitepress来说，刚进去的那一刻，映入眼帘的就是首页，也就是docs/index.md这个文件。首页主要由以下五个部分组成： <img src="https://i-blog.csdnimg.cn/blog_migrate/bca4ae295b2164fe4fa386bf5b8b47eb.png#pic_center" alt="在这里插入图片描述"></p><p>对于首页来说，我们一般会比较少去放侧边栏，更多地是放一些个人博客的概述。下面我们先来继续了解下普通文章页面的布局，配置修改放后面。</p><h5 id="_2、普通文章" tabindex="-1">2、普通文章 <a class="header-anchor" href="#_2、普通文章" aria-label="Permalink to &quot;2、普通文章&quot;">​</a></h5><p>对于普通文章页面来说，我们一般会在左侧放专栏的文章，中间放当前文章的内容，右边放文章的<strong>锚点导航</strong>。具体如下：</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/78d2982d157ba595699703370edaf25c.png#pic_center" alt="在这里插入图片描述"></p><p>2.2 内容完善 上面，我们了解了整体布局。接下来，依据这个布局，我们来说一步步的修改。</p><p>1、导航条美化navbar 在上面的两张图当中，会发现到，它们共同的部分都是序号①，也就是navbar。因此，我们先来对这部分进行美化。</p><p>（1）左上角-logo和名称自定义 图标，可以去<a href="https://www.iconfont.cn/" target="_blank" rel="noreferrer">https://www.iconfont.cn/</a> 里头扒拉一个。</p><p>修改docs/.vitepress/config.ts文件下的配置，具体代码为： ————————————————</p><pre><code>export default defineConfig({
  title: &quot;JacksonWangBlog&quot;,
  description: &quot;A VitePress Site&quot;,
  themeConfig: {
    logo: &#39;/avatar.png&#39;, // 表示docs/public/avartar.png
    }
})
</code></pre><h6 id="_2-右上角-导航内容自定义" tabindex="-1"><strong>（2）右上角-导航内容自定义</strong> <a class="header-anchor" href="#_2-右上角-导航内容自定义" aria-label="Permalink to &quot;**（2）右上角-导航内容自定义**&quot;">​</a></h6><p>接下来美化右上角部分，首先先确定nav在<code>docs/.vitepress/config.ts</code>文件的位置，具体如下👇🏻：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { DefaultTheme } from &#39;vitepress&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const nav: DefaultTheme.NavItem[] = [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;首页&#39;,</span></span>
<span class="line"><span>    link: &#39;/&#39;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//===================TestDemo======================</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;前端开发&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;数据结构与算法&#39;,</span></span>
<span class="line"><span>        link: &#39;/column/Algorithm/&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //===================CPlusPlus======================</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;C++&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;C++并发编程实战&#39;,</span></span>
<span class="line"><span>        link: &#39;/column/CPlusPlus/C++并发编程实战&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;C++Linux编程&#39;,</span></span>
<span class="line"><span>        link: &#39;/column/CPlusPlus/C++Linux编程&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;C++基础不牢地动山摇&#39;,</span></span>
<span class="line"><span>        link: &#39;/column/CPlusPlus/C++基础不牢地动山摇&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;OpenCV学习笔记&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/OpenCV学习笔记&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;UNIX环境高级编程&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/UNIX环境高级编程&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;VC++深入详解&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/VC++深入详解&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;Win32开发笔记&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/Win32开发笔记&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;Window内核编程&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/Window内核编程&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;第三方库整合笔记&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/第三方库整合笔记&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;嵌入式开发笔记&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/嵌入式开发笔记&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;深入浅出OpenGL&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/深入浅出OpenGL&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;深入浅出QT程序设计&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/深入浅出QT程序设计&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;深入浅出WINDOWS程序设计&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/深入浅出WINDOWS程序设计&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text:&#39;深入浅出WINDOW驱动程序开发&#39;,</span></span>
<span class="line"><span>        link:&#39;column/CPlusPlus/深入浅出WINDOW驱动程序开发&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  //===================CPlusPlus======================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //===================CSharp=========================</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;CSharp&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;CSharp程序设计基础入门教程&#39;,</span></span>
<span class="line"><span>        link: &#39;column/CSharp/CSharp程序设计基础入门教程&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;CSharp基础不牢地动山摇&#39;,</span></span>
<span class="line"><span>        link: &#39;column/CSharp/CSharp基础不牢地动山摇&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>   //===================CSharp=========================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   //===================JavaScript======================</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: &#39;JavaScript&#39;,</span></span>
<span class="line"><span>      items: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;吃螃蟹咯HarmonyOs真香&#39;,</span></span>
<span class="line"><span>          link: &#39;column/CPlusPlus/吃螃蟹咯HarmonyOs真香&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;开源项目学习&#39;,</span></span>
<span class="line"><span>          link: &#39;column/CPlusPlus/开源项目学习&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;小兔鲜电商项目实战&#39;,</span></span>
<span class="line"><span>          link: &#39;column/CPlusPlus/小兔鲜电商项目实战&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>   //===================JavaScript======================</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>   //===================Java======================</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>    text: &#39;Java&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Java基础不牢地动山摇！&#39;,</span></span>
<span class="line"><span>        link: &#39;column/Java/Java基础不牢地动山摇！&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Java开源项目学习&#39;,</span></span>
<span class="line"><span>        link: &#39;column/Java/Java开源项目学习&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;SpringBoot整合第三方库&#39;,</span></span>
<span class="line"><span>        link: &#39;column/Java/SpringBoot整合第三方库&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>   },</span></span>
<span class="line"><span>   //===================Java======================</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //===================Python======================</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;Python&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Python玩OpenCV也是有一手的！&#39;,</span></span>
<span class="line"><span>        link: &#39;column/Python/Python玩OpenCV也是有一手的！&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;你对象不会也在学测试吧&#39;,</span></span>
<span class="line"><span>        link: &#39;column/Python/你对象不会也在学测试吧&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  //===================Python======================</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;设计模式&#39;,</span></span>
<span class="line"><span>    link: &#39;column/设计模式&#39;</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;算法&#39;,</span></span>
<span class="line"><span>    link: &#39;column/算法&#39;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  //===================Link======================</span></span>
<span class="line"><span>   {</span></span>
<span class="line"><span>    text: &#39;关于我&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      { text: &#39;Github&#39;, link: &#39;https://github.com/Jacqueline712&#39; },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;掘金&#39;,</span></span>
<span class="line"><span>        link: &#39;https://juejin.cn/user/3131845139247960/posts&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;飞书社区&#39;,</span></span>
<span class="line"><span>        link: &#39;https://pzfqk98jn1.feishu.cn/wiki/space/7193915595975491587?ccm_open_type=lark_wiki_spaceLink&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;知乎&#39;,</span></span>
<span class="line"><span>        link: &#39;https://www.zhihu.com/people/zheng-zi-ji-67-89/posts&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>  //===================Link======================</span></span>
<span class="line"><span>];</span></span></code></pre></div><h5 id="_2、首页美化home" tabindex="-1">2、首页美化home <a class="header-anchor" href="#_2、首页美化home" aria-label="Permalink to &quot;2、首页美化home&quot;">​</a></h5><h6 id="_1-layout选择" tabindex="-1">（1）layout选择 <a class="header-anchor" href="#_1-layout选择" aria-label="Permalink to &quot;（1）layout选择&quot;">​</a></h6><p>首页部分的配置在<code>docs/index.md</code>文件，具体来看下面这些配置项.我们可以配置背景图和显示文字哦</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>---</span></span>
<span class="line"><span># 提供三种布局，doc、page和home https://vitepress.dev/reference/default-theme-layout</span></span>
<span class="line"><span>layout: home</span></span>
<span class="line"><span>home: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># https://vitepress.dev/reference/default-theme-home-page</span></span>
<span class="line"><span>title: 嘿，小爱同学</span></span>
<span class="line"><span>titleTemplate: Hi，终于等到你</span></span>
<span class="line"><span>editLink: true</span></span>
<span class="line"><span>lastUpdated: true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>hero:</span></span>
<span class="line"><span>    name: 好记性不如烂笔头</span></span>
<span class="line"><span>    text: Stay foolish, Stay hungry.</span></span>
<span class="line"><span>    tagline: /斜杠青年/人间清醒/工具控/</span></span>
<span class="line"><span>    image:</span></span>
<span class="line"><span>        src: /background.png</span></span>
<span class="line"><span>        alt: 背景图</span></span>
<span class="line"><span>    actions:</span></span>
<span class="line"><span>    - theme: brand</span></span>
<span class="line"><span>      text: 进入主页</span></span>
<span class="line"><span>      link: /column/views/guide</span></span>
<span class="line"><span>    - theme: alt</span></span>
<span class="line"><span>      text: 个人成长</span></span>
<span class="line"><span>      link: /column/Growing/</span></span>
<span class="line"><span>features:</span></span>
<span class="line"><span>  - icon: 🤹‍♀️</span></span>
<span class="line"><span>    title: Web后端</span></span>
<span class="line"><span>    details: 某厂程序猿，国内某互联网厂搬砖。</span></span>
<span class="line"><span>    link: /column/views/guide</span></span>
<span class="line"><span>  - icon: 👩‍🎨‍</span></span>
<span class="line"><span>    title: 喜欢美学</span></span>
<span class="line"><span>    details: 热爱一切美学，喜欢用各种设计工具造图。</span></span>
<span class="line"><span>  - icon: 🧩</span></span>
<span class="line"><span>    title: 斜杆青年</span></span>
<span class="line"><span>    details: 是个平平无奇但是又很热爱学习的斜杆青年。</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 自定义组件 --&gt;</span></span>
<span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>import home from &#39;./components/home.vue&#39;;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;home /&gt;</span></span></code></pre></div><p>到这里，我们就完成了<code>navbar</code> 和首页<code>home</code>的美化。具体来看下效果：</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/6ed86559e1017f86b01a0e4af94670e9.png#pic_center" alt="在这里插入图片描述"></p><p>到此，一个像模像样的首页就有了。但有些同学会觉得，自定义力度还不够，比如说想在页面的下方再加点图片或者图标之类的，那下面我们就来说说，在vitepress中如何自定义组件。</p><p>（2）自定义组件 首先，我们在docs/.vitepress/components文件夹下定义一个文件，名为home.vue。然后在里面写些想要展示的内容所对应的代码，比如： ————————————————</p>`,40)),a("pre",null,[a("code",null,`<template>
  <div class="home-wrapper">
    <div v-for="item in list" :key="item" class="home-item">`+t(p.item)+`</div>
  </div>
</template>

<script lang="ts" setup>
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
<\/script>

<style scoped>
.home-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.home-item {
  vertical-align: middle;
  margin: 4px 4px 10px;
  padding: 4px 8px;
  font-weight: bolder;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
  line-height: 13px;
  font-size: 13px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}
</style>
`,1)]),s[1]||(s[1]=n(`<p>接着，在<code>docs/index.md</code>中引入，具体如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>---</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!-- 自定义组件 --&gt;</span></span>
<span class="line"><span>&lt;script setup&gt;</span></span>
<span class="line"><span>import home from &#39;./components/home.vue&#39;;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;home /&gt;</span></span></code></pre></div><p>下面来看实现后的效果：</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/b2acc504d7fe295340726ee6c4e869e1.png#pic_center" alt="在这里插入图片描述"></p><p>这样，我们就实现了相应的自定义内容。按照这个思路，我们也可以在组件里面写各种自己想要添加的东西，达到页面自定义的效果。</p><p>到这里，navbar和主页都完成了，下面就要去写文章了。那这里有的小伙伴就会开始疑问：</p><p>①文章的目录怎么存放？</p><p>②不同的专栏怎么独立分类？</p><p>③侧边栏怎么展示？</p><p>④h1~h6的标题怎么对齐锚点？</p><p>不着急，下面我们一个个来逐一突破。</p><p>3、侧边栏美化Sidebar 看2.1中的第2点我们可以知道，文章页面包括序号②③④三个部分。那我们先来看看，怎么定义侧边栏。</p><p>（1）定义入口 假设说我们现在有一个专栏，叫数据结构与算法。那么我们会先去navbar定义入口。入口代码在docs/relaConf/navbar.ts，定义内容如下： ————————————————</p><pre><code>export const nav: DefaultTheme.NavItem[] = [
    {
    text: &#39;前端开发&#39;,
    items: [
      {
        text: &#39;数据结构与算法&#39;,
        link: &#39;/column/Algorithm/&#39; // 对应docs/column/Algorithm下的idnex.md文件
      }
    ]
  }
]
</code></pre><p>定义完成之后，来看下现在的效果：</p><p>此时大家会发现，左边的侧边栏莫名奇妙的。其实这是因为，在我们刚开始初始化项目的时候，脚手架给我们预置的侧边栏内容，对应 <code>docs/.vitepress/config.ts</code>中的<code>themeConfig.sidebar</code>。下面，我们来改造这个位置的内容。</p><p>（2）侧边栏规范化 我们当前只是定义了“数据结构与算法”专栏的入口文件，那在这个页面中的侧边栏，我们要展示的是「数据结构与算法」这个专栏所要填充的文章。比如：栈、队列、字典和集合等等。</p><p>那接下来，我们先去专栏下面建立相关文章的md文件。在docs/column/Algorithm文件下定义以下几个文件： ————————————————</p><pre><code>|——— docs
  |——— column
    |——— Algorithm
      |——— 001_stack.md // 里面可以先随意填充些可辨识的内容
      |——— 002_queue.md
      |——— 003_dictionary.md
      |——— 004_truee.md
      |——— index.md
</code></pre><p>想要生成侧边栏的内容有了，下面我们去给侧边栏做相应的配置。同样，考虑到以后会生成很多侧边栏，我们同样把<code>sidebar</code>单独抽离成文件。<strong>具体代码如下：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// docs/.vitepress/relaConf/index.ts 配置内容较多，单独起个文件</span></span>
<span class="line"><span>export * from &#39;./sidebar&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// docs/.vitepress/relaConf/navbar.ts</span></span>
<span class="line"><span>import { DefaultTheme } from &#39;vitepress&#39;;</span></span>
<span class="line"><span>export const sidebar: DefaultTheme.Sidebar = {</span></span>
<span class="line"><span>  // /column/Algothm/表示对这个文件夹下的所有md文件做侧边栏配置</span></span>
<span class="line"><span>  &#39;/column/Algorithm/&#39;: [</span></span>
<span class="line"><span>     // 第一部分</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: &#39;栈和队列&#39;,</span></span>
<span class="line"><span>      items: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;栈-深拷贝和浅拷贝&#39;,</span></span>
<span class="line"><span>          link: &#39;/column/Algorithm/001_Stack&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;队列-事件循环&#39;,</span></span>
<span class="line"><span>          link: &#39;/column/Algorithm/002_Queue&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    // 第二部分</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>      text: &#39;字典和树&#39;,</span></span>
<span class="line"><span>      items: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;字典和集合-Set和Map&#39;,</span></span>
<span class="line"><span>          link: &#39;/column/Algorithm/003_Dictionary&#39;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>          text: &#39;树-深/广度优先遍历&#39;,</span></span>
<span class="line"><span>          link: &#39;/column/Algorithm/004_Tree&#39;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在config.ts中引用</span></span>
<span class="line"><span>import { defineConfig } from &#39;vitepress&#39;;</span></span>
<span class="line"><span>import { nav } from &#39;./relaConf&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>    themeConfig: {</span></span>
<span class="line"><span>        sidebar: sidebar, // 把定义的sidebar给替换进来</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>最终，我们来看下实现的效果。<strong>具体如下图所示：</strong></p><h5 id="_4、正文排版markdown" tabindex="-1">4、正文排版Markdown <a class="header-anchor" href="#_4、正文排版markdown" aria-label="Permalink to &quot;4、正文排版Markdown&quot;">​</a></h5><p>侧边导航栏介绍完毕，下面我们来了解下正文的排版。有一小部分小伙伴可能不知道markdown语法，所以在对文章排版的时候，会自上而下地用黑体字来处理。</p><p>这里，我们来讲讲平常经常会排版的方式，就是markdown语法。vitepress官网也对markdown做了很好的支持，具体可以戳此链接。</p><p>（1）md基础语法 ————————————————</p><pre><code># 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

『- 空格』 无需列表
『1. 空格』有序列表

*** 分割线
--- 分割线

$$文字$$  方程式latex

『**文字**』 加粗字体
『*文字*』 斜体

『\`\`\`代码语言 空格』  代码块

『&gt; 空格』 引用
</code></pre><p>原文链接：<a href="https://blog.csdn.net/WNX10086/article/details/137160521" target="_blank" rel="noreferrer">https://blog.csdn.net/WNX10086/article/details/137160521</a></p><h6 id="_2-vitepress对md的支持" tabindex="-1">（2）vitepress对md的支持 <a class="header-anchor" href="#_2-vitepress对md的支持" aria-label="Permalink to &quot;（2）vitepress对md的支持&quot;">​</a></h6><p>上面我们介绍了最简单的<code>markdown</code>语法，还有另一个要提到的问题是，vitepress官方对markdown的扩展支持。</p><p><strong>包括但不限于emoji：</strong></p><p><strong>或者高亮信息：</strong></p><p>还有其他很多种类型的扩展支持，这里不再赘述。</p><h6 id="_3-最后更新时间" tabindex="-1">（3）最后更新时间 <a class="header-anchor" href="#_3-最后更新时间" aria-label="Permalink to &quot;（3）最后更新时间&quot;">​</a></h6><p>到这里，我们已经了解了<code>md</code>的大部分内容。配置到一半的时候，细心的小伙伴可能已经发现，在正文的最后，有个<strong>最后更新时间LastUpdated</strong>的样式。这其实是因为我们在<code>docs/index.md</code>文件里配置了这个文件，所以展示了这个样式。<strong>代码如下</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>---</span></span>
<span class="line"><span>lastUpdated: true</span></span>
<span class="line"><span>---</span></span></code></pre></div><p>5、锚点导航Anchor 现在，我们来到锚点导航。锚点导航对应的是，2.1 第 2 点中的④区域。也就是说，点击其对应的导航，就能够跳转到文章对应地页面位置上。类似于掘金右边导航的这种效果~</p><p>回到正题，怎么配置呢？回答.vitepress/config.ts文件，在themeConfig中配置outline。具体如下代码所示： ————————————————</p><pre><code>themeConfig: {
    outline: {
      level: [2, 6],
      label: &#39;目录&#39;
    }
  }
</code></pre><p><strong>具体展示效果如下：</strong></p><p>值得注意的是📢，目前锚点导航只能配置<strong>h2-h6级</strong>的标题，<strong>h1标题</strong>暂时不能配置。看了下<code>github</code>，发现有小伙伴提了<code>issue</code>，但似乎目前还没解决。静等官方解决……</p><h5 id="_6、页脚配置" tabindex="-1">6、页脚配置 <a class="header-anchor" href="#_6、页脚配置" aria-label="Permalink to &quot;6、页脚配置&quot;">​</a></h5><p>忘记了还有个页脚：</p><p>这个是直接配置footer，在<code>config.mjs defineConfig themeConfig</code>下面配置就可以了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> export default defineConfig({ </span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>  footer:{</span></span>
<span class="line"><span>      copyright:&#39;Copyright@ 2023 Jackson Wang&#39;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    });</span></span></code></pre></div><h5 id="_7、美化地址栏icon" tabindex="-1">7、美化地址栏icon <a class="header-anchor" href="#_7、美化地址栏icon" aria-label="Permalink to &quot;7、美化地址栏icon&quot;">​</a></h5><p>在<code>config.mjs defineConfig</code>下面直接配置即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default defineConfig({ </span></span>
<span class="line"><span>head: [[&quot;link&quot;, { rel: &quot;icon&quot;, href: &quot;/avatar.png&quot; }]],</span></span>
<span class="line"><span>    });</span></span></code></pre></div><p>2.3 配色相关 1、修改主题色 上面描述了内容主体的整体布局，接下来谈谈整体配色。也就是，整体的绿色如何更换成其他颜色呢？</p><p>首先，我们需要确定想要更换的颜色色调，需要稍微统一一下。这里推荐个网站：<a href="https://coolors.co/palettes%E3%80%82" target="_blank" rel="noreferrer">https://coolors.co/palettes。</a></p><p>可以先在上面这个网站找一套自己喜欢的颜色，比如紫色： 之后呢，要做的就是，把<code>vitepress</code>项目中对应的全局变量的颜色给替换掉。<strong>具体操作如下：</strong></p><pre><code>/* color vars: https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css */
/* purple brand color: https://coolors.co/palette/dec9e9-dac3e8-d2b7e5-c19ee0-b185db-a06cd5-9163cb-815ac0-7251b5-6247aa */

/* Color Base */
:root {
  --vp-c-purple: #b185db;
  --vp-c-purple-light: #c19ee0;
  --vp-c-purple-lighter: #d2b7e5;
  --vp-c-purple-dark: #a06cd5;
  --vp-c-purple-darker: #9163cb;
  /* 设置字体颜色 */
  /* --vp-home-hero-name-color: transparent; */
  /* --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff); */
  /* 设置右图像渐变 */
  --vp-home-hero-image-background-image: linear-gradient( -45deg, #8e99ee 50%, #ffffff 50% );
  --vp-home-hero-image-filter: blur(150px);

}

/* Color Theme */
:root {
  --vp-c-brand: var(--vp-c-purple);
  --vp-c-brand-light: var(--vp-c-purple-light);
  --vp-c-brand-lighter: var(--vp-c-purple-lighter);
  --vp-c-brand-dark: var(--vp-c-purple-dark);
  --vp-c-brand-darker: var(--vp-c-purple-darker);
}
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import DefaultTheme from &#39;vitepress/theme&#39;;</span></span>
<span class="line"><span>import &#39;./custom.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default {</span></span>
<span class="line"><span>  ...DefaultTheme,</span></span>
<span class="line"><span>  enhanceApp({ app }) {</span></span>
<span class="line"><span>    // register global components</span></span>
<span class="line"><span>    app.component(&#39;MyGlobalComponent&#39; /* ... */);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>};</span></span></code></pre></div><p>这样，我们就完成整体主题色的替换：</p><p>大家可以看到，整体变成了以紫色调为主，右图像的渐变也有了。如果还想要修改其他跟主题色相关的颜色，可以看下官方github上的变量说明，进行相应的修改。</p><p>这里附上官方网站的详细说明：<a href="https://vitepress.dev/guide/extending-default-theme#customizing-css" target="_blank" rel="noreferrer">https://vitepress.dev/guide/extending-default-theme#customizing-css</a> ；</p><p>以及github的变量地址：<a href="https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css" target="_blank" rel="noreferrer">https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css</a></p><p>2、更换主题 当我搭建到这一步的时候，就开始想着vitepress有没有像vuepress-theme-reco类似的主题。很遗憾的是，暂时还没看到。</p><p>不过在掘金社区里搜到一些博主自己搭建了一些主题，这里不做详细介绍，感兴趣的同学可以前往查看。戳链接：</p><p>@sugarat/theme - <a href="https://theme.sugarat.top/" target="_blank" rel="noreferrer">https://theme.sugarat.top/</a> 一个简约风的VitePress博客主题 三、🎥其他周边 3.1 搜索功能 谈到搜索，vitepress支持两种搜索模式：本地搜索和algolia。对于algolia来说，相当于把网站的数据丢给algolia，然后当你在网站上进行搜索时，会向algolia发送一个请求，然后呢，algolia在你上传的数据中进行搜索，之后把结果返回给你，就可以在网站上进行展示。这种方式相对比较繁琐些，这里不详细介绍，有需要可以查看这篇文章：vitepress 如何开启 algolia 全文搜索。</p><p>另一种方式是：本地搜索。本地搜索只需要这样处理即可： ————————————————</p><pre><code> // .vitepress/config.ts

import { defineConfig } from &#39;vitepress&#39;

export default defineConfig({
  themeConfig: {
           // 设置搜索框的样式
       search: {
        provider: &quot;local&quot;,
        options: {
          translations: {
            button: {
              buttonText: &quot;搜索文档&quot;,
              buttonAriaLabel: &quot;搜索文档&quot;,
            },
            modal: {
              noResultsText: &quot;无法找到相关结果&quot;,
              resetButtonTitle: &quot;清除查询条件&quot;,
              footer: {
                selectText: &quot;选择&quot;,
                navigateText: &quot;切换&quot;,
              },
            },
          },
        },
      },
  }
})
</code></pre><h4 id="_3-2-国际化i18n" tabindex="-1">3.2 国际化i18n <a class="header-anchor" href="#_3-2-国际化i18n" aria-label="Permalink to &quot;3.2 国际化i18n&quot;">​</a></h4><p>对于个人博客来说，一般只用到中文。不过有的小伙伴可能会想要兼容下中英文，那么可以使用<strong>国际化i18n</strong>来解决。<code>vitepress</code>提供了这个解决方案：</p><pre><code>// .vitepress/config.ts
themeConfig: {
    i18nRouting: true
}
</code></pre><p>四、📽Github Page部署 到这里，我们基本完成了一个博客的搭建。那搭建完成以后，就是发布上线啦~</p><p>这里采用的是Github Page来进行部署，值得注意的是，如果要用Github Page来部署，那么需要在git上的仓库需要是public状态哦~</p><p>部署步骤 Github Pages专门用来托管静态内容，由于不需要服务器且基于git，支持CI/CD，成为很多静态网站比如博客、文档网站的很好的选择。下面介绍流程</p><p>1、在github上创建仓库，如果没有Github账号，需要先注册一个。 需要在config.mjs里面配置base，名称为github仓库名称，注意不要忘记改之前的icon</p><pre><code>  base: &#39;/docs-demo/&#39;,
</code></pre><ul><li>2、 在你没有git 托管的本地给工程中创建 gitignore文件，并添加如下内容。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node_modules</span></span>
<span class="line"><span>.DS_Store</span></span>
<span class="line"><span>dist</span></span>
<span class="line"><span>dist-ssr</span></span>
<span class="line"><span>cache</span></span>
<span class="line"><span>.cache</span></span>
<span class="line"><span>.temp</span></span>
<span class="line"><span>*.local</span></span></code></pre></div><ul><li>3、初始化git仓库</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git init</span></span></code></pre></div><ul><li>4、添加本地所有文件到git仓库</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git add .</span></span></code></pre></div><ul><li>5、创建第一次提交</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git commit -m &quot;first commit&quot;</span></span></code></pre></div><ul><li>6、添加远程仓库地址到本地</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git remote add origin https://github.com/wangnaixinggithub/docs-demo.git</span></span></code></pre></div><ul><li>7、推送项目到github</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>git push -u origin master</span></span></code></pre></div><ul><li>8、选择github actions</li></ul><p><img src="https://i-blog.csdnimg.cn/blog_migrate/870e5c513268f6ffca299fbda497f1e3.png#pic_center" alt="在这里插入图片描述"></p><p>9、设置工作流</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/2c0147b7caf12af2eda97c632917af99.png#pic_center" alt="img"></p><ul><li>10、重命名并设置deploy脚本</li></ul><p>脚本文件：参考的vitepress官方文档：<a href="https://vitepress.dev/guide/deploy#github-pages" target="_blank" rel="noreferrer">https://vitepress.dev/guide/deploy#github-pages</a></p><p>❗node版本和pnpm版本需要一致</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/f44a3ab7833e6a7e63a9773894e1c9e5.png#pic_center" alt="在这里插入图片描述"></p><p>❗需要注意项目的根目录（.vitepress所在的目录）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>name: Deploy VitePress site to Pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches: [master]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置tokenn访问权限</span></span>
<span class="line"><span>permissions:</span></span>
<span class="line"><span>  contents: read</span></span>
<span class="line"><span>  pages: write</span></span>
<span class="line"><span>  id-token: write</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列</span></span>
<span class="line"><span># 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成</span></span>
<span class="line"><span>concurrency:</span></span>
<span class="line"><span>  group: pages</span></span>
<span class="line"><span>  cancel-in-progress: false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  # 构建工作</span></span>
<span class="line"><span>  build:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - name: Checkout</span></span>
<span class="line"><span>        uses: actions/checkout@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要</span></span>
<span class="line"><span>      - name: Setup pnpm</span></span>
<span class="line"><span>        uses: pnpm/action-setup@v2 # 安装pnpm并添加到环境变量</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          version: 8.15.5 # 指定需要的 pnpm 版本</span></span>
<span class="line"><span>      - name: Setup Node</span></span>
<span class="line"><span>        uses: actions/setup-node@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: 20</span></span>
<span class="line"><span>          cache: pnpm # 设置缓存</span></span>
<span class="line"><span>      - name: Setup Pages</span></span>
<span class="line"><span>        uses: actions/configure-pages@v3  # 在工作流程自动配置GithubPages</span></span>
<span class="line"><span>      - name: Install dependencies</span></span>
<span class="line"><span>        run: pnpm install # 安装依赖</span></span>
<span class="line"><span>      - name: Build with VitePress</span></span>
<span class="line"><span>        run: |</span></span>
<span class="line"><span>          pnpm run docs:build # 启动项目</span></span>
<span class="line"><span>          touch .nojekyll  # 通知githubpages不要使用Jekyll处理这个站点，不知道为啥不生效，就手动搞了</span></span>
<span class="line"><span>      - name: Upload artifact</span></span>
<span class="line"><span>        uses: actions/upload-pages-artifact@v2  # 上传构建产物</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          path: docs/.vitepress/dist # 指定上传的路径，当前是根目录，如果是docs需要加docs/的前缀</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 部署工作</span></span>
<span class="line"><span>  deploy:</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      name: github-pages</span></span>
<span class="line"><span>      url: \${{ steps.deployment.outputs.page_url }} # 从后续的输出中获取部署后的页面URL</span></span>
<span class="line"><span>    needs: build    # 在build后面完成</span></span>
<span class="line"><span>    runs-on: ubuntu-latest  # 运行在最新版本的ubuntu系统上</span></span>
<span class="line"><span>    name: Deploy</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - name: Deploy to GitHub Pages</span></span>
<span class="line"><span>        id: deployment  # 指定id</span></span>
<span class="line"><span>        uses: actions/deploy-pages@v2 # 将之前的构建产物部署到github pages中</span></span></code></pre></div><p>这样配置之后，工作流就会跑了。构建成功，我们的文档网站就做好了。</p><p><img src="https://i-blog.csdnimg.cn/blog_migrate/2deca29d1fda0b2b8a305f9d4cf1a457.png#pic_center" alt="在这里插入图片描述"></p>`,94))])}const v=e(c,[["render",o]]);export{m as __pageData,v as default};
