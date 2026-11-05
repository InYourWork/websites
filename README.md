# SONO Product Showcase / SONO 产品展示

A standalone React, TypeScript and Vite template for a product catalog. This branch is `templates/product`.
独立的 React、TypeScript 与 Vite 产品目录模板，本分支为 `templates/product`。

## Run / 运行

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

Versions and commands live in package.json. `dev` builds and serves the static output; rebuild and refresh after editing. It does not provide hot reload. Deploy only `dist`; do not deploy `.ssg` or source files.
版本与命令以 package.json 为准。`dev` 构建后提供静态预览，修改后需重新构建并刷新，不提供热更新。仅部署 `dist`，不部署 `.ssg` 或源码。

## Pages and languages / 页面与语言

Home, searchable catalog, product detail pages and a listening guide are registered in `src/pages/registry.json`. English is the default language at `/`; Chinese is at `/zh/` and Korean at `/ko/`. Change the default and enabled languages in `src/content/config.json`, then rebuild.
首页、可搜索产品目录、产品详情和聆听指南由 `src/pages/registry.json` 注册。默认英文位于 `/`，中文位于 `/zh/`，韩文位于 `/ko/`。在 `src/content/config.json` 修改默认语言与启用语言后重新构建。

```text
/                              Home / 首页
/products/                     Product catalog / 产品目录
/products/everyday/             Product detail example / 产品详情示例
/guide/                        Listening guide / 聆听指南
/zh/                           Chinese home / 中文首页
/zh/products/                  Chinese catalog / 中文产品目录
/zh/products/everyday/          Chinese detail example / 中文产品详情示例
/zh/guide/                     Chinese guide / 中文聆听指南
```

All pages contain build-time rendered HTML and localized metadata. React hydrates filtering, search and menus. Language switching retains the current page. No runtime SSR or SPA fallback is required; hosting must serve directory URLs as index.html. Relative assets and links support subpath hosting.
所有页面包含构建时渲染的完整 HTML 与多语言元信息。React 接管筛选、搜索和菜单交互，切换语言保留当前页面。无需运行时 SSR 或 SPA 回退，托管设施需将目录 URL 映射到 index.html。相对资源与链接支持子路径托管。

## Editing map / 修改入口

| Task / 任务 | Source / 修改位置 |
| --- | --- |
| Product names, descriptions, categories / 产品名称、描述、分类 | `src/content/locales/*.json`, `src/content/types.ts` |
| Default and enabled languages / 默认与启用语言 | `src/content/config.json` |
| Quote enquiry email / 报价咨询邮箱 | `src/content/business.json` |
| Page composition / 页面组合 | `src/pages/`, `src/sections/` |
| Page paths and static generation / 页面路径与静态生成 | `src/pages/registry.json`, `src/pages/components.ts` |
| Search and business validation / 搜索与业务配置验证 | `src/content/catalog.js` |
| Appearance / 视觉样式 | `src/styles/`, `DESIGN.md` |
| Images and attribution / 图片与来源 | `public/images/`, `ASSET-CREDITS.json` |

Add products under `products.items` in every enabled dictionary, keeping ids and category ids aligned. Detail pages are generated from those records. Adding a category also requires its translated label under `products.categories`. Keep image paths, alt text and credits in sync.
在各启用语言字典的 `products.items` 中新增产品，保持产品 id 与分类 id 一致，详情页由这些记录生成。新增分类时同步 `products.categories` 中的翻译标签，保持图片路径、替代文本和素材来源一致。

Add a page by creating its component, registering it in `pages/components.ts` and adding its path and metadata field paths to `pages/registry.json`. Use `pageUrl(pageId, { id })` to build links. Shared rendering and locale helpers should not need page-specific branches.
新增页面时创建组件，在 `pages/components.ts` 注册，并在 `pages/registry.json` 配置路径与元信息字段路径。使用 `pageUrl(pageId, { id })` 构建链接，共用渲染与语言工具无需新增页面专属分支。

## Business configuration / 业务配置

This is a product showcase with quote enquiries. Product detail pages use “Request a quote”; there are no prices, carts or online purchase links.
这是面向咨询报价的商品展示模板。产品详情页使用“联系获取报价”，不展示价格，不提供购物车或在线购买链接。

Configure the shared email in `src/content/business.json`. The quote button opens an email with the current product name as its subject. When email is null, it links to the contact section. Set a real contact email before launch; the template does not collect or submit messages itself.
在 `src/content/business.json` 配置共用邮箱。报价按钮打开邮件，并以当前产品名称作为主题；邮箱为 null 时跳转至联系区域。正式使用前填写真实联系邮箱，模板本身不收集或提交消息。

`BusinessConfig` in `src/content/types.ts` defines the public contact configuration. Never put credentials in frontend configuration.
公开联系配置合同见 `src/content/types.ts` 中的 `BusinessConfig`，不在前端配置中放置凭据。

## Verification and boundaries / 验证与边界

Run `pnpm format`, `pnpm test`, `pnpm typecheck` and `pnpm build`. The build validates generated page links, anchors and language counterparts. Use `pnpm test:edits` after changing extension mechanisms; it verifies a single-language copy, an added product/page, product-specific email enquiries without modifying this template.
运行 `pnpm format`、`pnpm test`、`pnpm typecheck` 与 `pnpm build`。构建检查生成页面的链接、锚点与语言对应关系。修改扩展机制后运行 `pnpm test:edits`，它在隔离副本中验证单语言、新产品与页面、产品专属邮件咨询，不修改当前模板。

Verify desktop and mobile navigation, search, category filters, empty/reset states, language switching and product links in a browser. Static checks alone do not prove hydration or responsive behavior.
通过浏览器验收桌面与移动端导航、搜索、分类筛选、空状态与重置、语言切换及产品链接；静态检查不代表交互接管或响应式行为已通过。

SONO and product names are demonstration labels. Unsplash images may depict third-party products and do not establish manufacturer affiliation. Replace them with authorized product assets for a real catalog. Code uses MIT; image licenses and authors are recorded separately in ASSET-CREDITS.json. Authoring rules live in AGENTS.md.
SONO 与产品名称均为演示标签。Unsplash 图片可能展示第三方产品，不表示制造商关联。真实目录应替换为已授权的产品素材。代码采用 MIT，图片许可与作者单独记录于 ASSET-CREDITS.json，工程编写约束见 AGENTS.md。
