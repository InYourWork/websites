# Website templates / 网站模板

Each template branch is an independent static frontend project. Do not import source from neighboring repositories.
每个模板分支都是独立的静态前端工程，不引用相邻仓库源码。

Read `README.md`, `DESIGN.md` and `template.json` before editing.
修改前阅读 `README.md`、`DESIGN.md` 和 `template.json`。

- Use React, TypeScript and Vite. Treat package.json as the source of truth for commands and versions.
  使用 React、TypeScript 和 Vite；命令与版本以 package.json 为准。

- Keep content in src/content, pages in src/pages, sections in src/sections and design tokens in src/styles/tokens.css.
  内容放 src/content，页面放 src/pages，区块放 src/sections，设计变量放 src/styles/tokens.css。

- Use pnpm and keep its generated pnpm-lock.yaml. Never fabricate a lockfile.
  使用 pnpm，保留生成的 pnpm-lock.yaml，不手写 lockfile。

- Store assets locally in public and record their sources. Do not require visitor authorization to load assets.
  素材保存在 public 并记录来源，不使用需要访客授权才能加载的素材。

- Do not add credentials, .env files, invented client claims or simulated successful business operations.
  不添加凭据、.env、虚构客户信息或模拟成功的业务操作。

- Write documentation and explanatory comments in English followed by Chinese. Keep identifiers and machine directives unchanged.
  文档与解释性注释采用英文在前、中文在后的格式，标识符和机器指令保持原样。

- Run pnpm test, pnpm typecheck and pnpm build after changes. Verify interactive changes on desktop and mobile.
  修改后运行 pnpm test、pnpm typecheck 和 pnpm build；交互变更验收桌面与移动端。

- Do not commit node_modules, dist, .ssg, local environment files or temporary screenshots.
  不提交 node_modules、dist、.ssg、本地环境文件或临时截图。

- Do not commit, push or publish unless the user requests it.
  未经用户要求不提交、不推送、不发布。

## Template boundaries / 模板边界

Keep this repository independently installable, buildable and usable. Do not include platform submission, authorization, cloud scheduling or publishing procedures in template code or documentation.
保持本仓库可独立安装、构建和使用；模板代码与文档不包含平台提交、授权、云端调度或发布流程。

Keep authoring rules here, usage instructions in README and visual guidelines in DESIGN. Use code and machine-readable configuration as the source of truth; avoid duplicate instructions.
编写约束集中于本文，使用说明放 README，视觉规范放 DESIGN；以代码和机器可读配置为事实来源，避免重复说明。

## Implementation rules / 实现规则

Generate complete static HTML at build time and hydrate only browser interactions. Do not add runtime SSR or require a specific hosting platform. Preserve relative links and assets for subpath deployment.
在构建时生成完整静态 HTML，由浏览器接管交互；不添加运行时 SSR，不依赖特定托管平台，保留支持子路径部署的相对链接和资源路径。

Confirm the audience, content and languages before editing. Update all enabled dictionaries, their meta titles/descriptions and the favicon. Default language and prefixes come from configuration, not browser preferences or hard-coded test expectations.
编辑前确认受众、内容和语言；同步所有启用语言字典、meta 标题与描述及 favicon。默认语言和前缀来自配置，不依赖浏览器偏好或测试中的固定值。

Keep navigation consistent with actual pages and sections. When adding or removing pages, update the page registry and component registration together. Verify links, anchors and language counterparts against generated output rather than fixed page counts or sample names.
导航须对应实际页面和区块；增删页面时同步页面注册表与组件注册，依据生成产物检查链接、锚点和语言对应页面，不固定页数或示例名称。

Do not edit generated HTML directly. Keep data, page composition and reusable sections separate. Replace demonstration content before real use; leave unavailable contact or backend features clearly unconfigured.
不直接编辑生成的 HTML；分离数据、页面组合与复用区块。正式使用前替换演示内容，尚未配置的联系方式或后端功能须明确保留未配置状态。

Verify desktop and 390px layouts, navigation, filters, page transitions, language switching, FAQ, contact links and subpath deployment when relevant. Keep tests independent of a particular image provider or language pair.
按改动范围验收桌面与 390px 布局、导航、筛选、页面跳转、语言切换、FAQ、联系入口和子路径部署；测试不绑定特定图片供应商或语言组合。

Use src/content/types.ts for content contracts, not the inferred type of an example translation. Keep shared business configuration in business.json. Use pages/registry.json for page paths and generation; see the README editing map before extending the template.
内容合同使用 src/content/types.ts，不从示例翻译推断类型；共享业务配置放 business.json；页面路径和生成规则使用 pages/registry.json，扩展前查看 README 修改入口表。

Run pnpm format after code edits. Keep JSX and configuration readable across lines rather than compressing whole components onto one line.
修改代码后运行 pnpm format，保持 JSX 和配置分行可读，不将整个组件压成单行。
