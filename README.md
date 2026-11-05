# AUREL Brand Presentation / AUREL 品牌展示

A standalone lifestyle brand website template built with React, TypeScript and Vite. Each branch contains one template; this branch is `templates/brand`.
使用 React、TypeScript 和 Vite 构建的独立生活方式品牌展示模板；每个分支一个模板，本分支为 `templates/brand`。

## Commands / 命令


```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```


Runtime and dependency versions are defined in package.json and pnpm-lock.yaml. Deploy only dist; relative links support both domain-root and subpath hosting.
运行时和依赖版本以 package.json 与 pnpm-lock.yaml 为准；只部署 dist，相对链接支持根目录与子路径托管。

## Structure / 工程结构


```text
src/
  content/locales/      Localized content / 多语言内容
  content/config.json  Language configuration / 语言配置
  content/index.ts     Content and page context / 内容与页面上下文
  content/routes.js    URL rules / 地址规则
  pages/               Page components / 页面组件
  components/          Shared components / 共用组件
  sections/            Content sections / 内容区块
  styles/tokens.css    Design variables / 设计变量
  styles/global.css    Base styles / 基础样式
  styles/site.css      Layout and responsiveness / 布局与响应式样式
  render.tsx           Build-time rendering / 构建时渲染
  main.tsx             Browser hydration / 浏览器交互接管
scripts/               Static page generation / 静态页面生成
public/                Local assets / 本地素材
tests/                 Content and page checks / 内容与页面检查
template.json          Template metadata / 模板元数据
DESIGN.md              Design guidelines / 设计约定
AGENTS.md              Authoring constraints / 工程编写约束
ASSET-CREDITS.json     Asset provenance / 素材来源
```


Start with src/content/locales/*.json, then adjust components. Keep localized meta titles/descriptions and public/favicon.svg aligned with the brand.
先修改 src/content/locales/*.json，再按需调整组件；同步各语言 meta 标题与描述以及 public/favicon.svg。

business.email in src/content/business.json defaults to null. A real email enables the mail link; there is no simulated form, payment or successful submission. Photographs illustrate visual directions, not real AUREL products or workshop records; demo collections are labeled.
src/content/business.json 中的 business.email 默认为 null，配置真实邮箱后启用邮件链接；没有模拟表单、支付或提交成功。照片用于表达视觉方向，不代表真实 AUREL 商品或工坊记录；演示系列已标记。

Code uses MIT; images have separate licenses recorded in ASSET-CREDITS.json. See DESIGN.md for design references.
代码采用 MIT；图片许可单独记录在 ASSET-CREDITS.json，设计参考见 DESIGN.md。

## Languages and pages / 语言与页面


src/content/config.json defines the default language and other language prefixes. English uses the root by default, Chinese uses /zh/, and Korean uses /ko/. No duplicate prefix is generated for the default language. Paths determine language, not query parameters or browser preferences.
src/content/config.json 定义默认语言和其他语言前缀；默认英文使用根路径，中文使用 /zh/，韩文使用 /ko/，不为默认语言生成重复前缀。语言由路径确定，不使用查询参数或浏览器偏好。

Rebuild after changing the default language. To add a language, complete its dictionary and add it to config; dictionaries are discovered automatically.
修改默认语言后重新构建；新增语言需补齐字典并加入 config，字典文件会自动发现。

React generates complete HTML at build time and hydrates menus and filters in the browser. Output is static: no runtime SSR or SPA fallback is needed. Hosting must serve index.html for directory URLs.
React 在构建时生成完整 HTML，在浏览器中接管菜单和筛选交互。产物纯静态，无需运行时 SSR 或 SPA 回退；托管设施须支持目录 URL 对应 index.html。

```text
/                         English home / 英文首页
/collections/                English collection / 英文集合页
/collections/quiet-forms/          English content / 英文内容页
/zh/                      Chinese home / 中文首页
/zh/collections/             Chinese collection / 中文集合页
/zh/collections/quiet-forms/       Chinese content / 中文内容页
```


Language switching retains the page and valid section anchor. Local pnpm dev builds before serving a static preview; it has no hot reload. Rebuild and refresh after editing.
语言切换保留当前页面与有效区块锚点；本地 pnpm dev 先构建再启动静态预览，不提供热更新，修改后重新构建并刷新。

The build runs page-link and anchor validation automatically. .ssg is intermediate output: do not commit or deploy it.
构建自动检查页面链接和锚点；.ssg 是中间产物，不提交、不部署。

## Editing map / 修改入口

| Task / 任务 | Files / 文件 | Keep in sync / 同步事项 |
| --- | --- | --- |
| Copy or branding / 文案与品牌 | src/content/locales/*.json | All enabled languages, meta, favicon / 所有启用语言、元信息、favicon |
| Contact email / 联系邮箱 | src/content/business.json | Shared across languages / 所有语言共用 |
| Colors and layout / 配色与布局 | src/styles, src/sections | Desktop and mobile / 桌面与移动端 |
| Add a collection / 新增系列 | collections.items in locale dictionaries / 字典中的 collections.items | Same stable id in each language; image credits / 各语言使用相同稳定 id，维护素材来源 |
| Add a language / 新增语言 | content/config.json, content/locales | Match SiteContent in content/types.ts / 遵循 content/types.ts 中的 SiteContent |
| Add a page / 新增页面 | pages/registry.json, pages/components.ts, new component / 新组件 | Metadata, navigation, translations / 元信息、导航、翻译 |

### Adding a page / 新增页面

Create a component under src/pages and export it through pages/components.ts. Add a registry entry with a unique id, a relative directory path ending in /, the component name and a title field path. Add translated content fields to SiteContent and every enabled dictionary when necessary.
在 src/pages 新建组件并通过 pages/components.ts 注册；在注册表中添加唯一 id、以 / 结尾的相对目录 path、组件名和 title 字段路径。新增翻译字段时同步 SiteContent 与所有启用语言字典。

For example, an about page can use id "about", path "about/", component "AboutPage" and title "story.title". Link to it with pageUrl('about'). App dispatch, language prefixes and static generation read the registry; they do not need separate page branches.
例如关于页可使用 id "about"、path "about/"、component "AboutPage"、title "story.title"，通过 pageUrl('about') 链接。页面分发、语言前缀与静态生成读取注册表，无需分别添加分支。

For a collection detail page, use collection to reference a content array and {id} in path. Each record needs a stable id and the title/description fields declared by the entry. Use pageUrl(pageId, { id }) for links. Update template.json when the advertised template features change.
集合内容页使用 collection 指向内容数组，并在 path 中使用 {id}；每条记录提供稳定 id 和注册项声明的 title/description 字段。链接使用 pageUrl(pageId, { id })；模板对外声明的能力变化时同步 template.json。

Run pnpm format, pnpm test, pnpm typecheck and pnpm build. The build checks generated pages, links and anchors. Test actual browser interactions separately; successful static checks do not prove hydration or responsive behavior.
运行 pnpm format、pnpm test、pnpm typecheck 和 pnpm build，构建会检查生成页面、链接和锚点。浏览器交互需单独验收，静态检查成功不代表交互接管或响应式表现通过。

Use pnpm test:edits after changing template extension mechanisms. It creates an isolated temporary copy, removes non-default translations, configures an email, changes brand/navigation, adds a collection and registers a page, then runs tests and a full build. It cleans up its temporary copy and does not modify the working template.
修改模板扩展机制后运行 pnpm test:edits。它在隔离临时副本中移除非默认语言、配置邮箱、修改品牌与导航、新增系列并注册页面，再执行测试与完整构建；结束后清理临时副本，不修改当前模板。

## Brand-specific editing / 品牌内容修改

Edit brand identity, hero and manifesto copy, collection narratives, story paragraphs and principles in each enabled dictionary. Shared contact email remains in business.json. The story page lives at /story/, /zh/story/ and /ko/story/; collection detail routes come from stable collection ids.
在各启用语言字典中修改品牌标识、首屏与品牌主张、系列叙事、故事段落和理念；共享联系邮箱仍在 business.json。品牌故事页位于 /story/、/zh/story/ 和 /ko/story/，系列详情路径来自稳定的系列 id。

The template is a presentation site, not an active shop. Do not add prices, checkout, delivery promises or sales claims unless the actual business has supplied and connected those capabilities. Credit the reference photography and replace it with authorized brand assets for a real launch.
本模板用于品牌展示，并非正在营业的商店。实际业务未提供并接入相关能力前，不添加价格、结算、配送承诺或销售声明；保留参考摄影来源，正式上线时替换为已授权的品牌素材。
