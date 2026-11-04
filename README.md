# InYourWork Website Templates / InYourWork 网站模板

Reusable website source templates for developers and coding agents. Each template is independently installable, editable and buildable into static files.
面向开发者和编码 Agent 的可复用网站源码模板，每套模板均可独立安装、修改并构建为静态文件。

## Branches / 分支

`main` contains only this repository guide. Each `templates/<name>` branch contains one complete template. Do not merge template source into main or combine unrelated templates in one branch.
`main` 仅保留本仓库说明；每个 `templates/<name>` 分支存放一套完整模板，不将模板源码合入 main，也不在同一分支混放无关模板。

| Branch / 分支 | Template / 模板 |
| --- | --- |
| [templates/company](https://github.com/InYourWork/websites/tree/templates/company) | Company website: home, project collection and detail pages / 企业官网：首页、项目集合页与内容页 |

To begin, check out a template branch and read its README and AGENTS.md. To create a related template, branch from an existing template and replace its identity, content, design and metadata deliberately. Keep main independent.
开始使用时切换到模板分支，阅读其 README 和 AGENTS.md；制作相关模板时可从已有模板创建新分支，再有针对性地调整标识、内容、设计与元数据，保持 main 独立。

```sh
git clone --branch templates/company https://github.com/InYourWork/websites.git
cd websites
pnpm install --frozen-lockfile
pnpm dev
```

## Basic structure / 基本结构

Use React and TypeScript with a static build. Versions, dependencies and commands belong in package.json and the generated pnpm-lock.yaml. Organize by responsibility; the example below describes the shared baseline, not an instruction to create empty files.
使用 React、TypeScript 与静态构建；版本、依赖和命令以 package.json 及自动生成的 pnpm-lock.yaml 为准。按职责组织工程；以下为公共基线，不要求创建没有用途的空文件。

```text
README.md                 Usage and editing map / 使用说明与修改入口
AGENTS.md                 Template authoring rules / 模板编写约束
DESIGN.md                 Visual guidelines / 视觉规范
template.json             Template identity and capabilities / 模板标识与能力
LICENSE                   Code license / 代码许可
ASSET-CREDITS.json         Asset sources and licenses / 素材来源与许可
package.json
pnpm-lock.yaml
src/
  content/                Typed content and configuration / 类型化内容与配置
    locales/              Translated dictionaries / 翻译字典
  pages/                  Pages and central registration / 页面与集中注册
  sections/               Reusable content sections / 可复用内容区块
  components/             Shared UI components / 共用 UI 组件
  styles/                 Design tokens and responsive styles / 设计变量与响应式样式
scripts/                  Static generation and validation / 静态生成与验证
public/                   Local assets / 本地素材
tests/                    Behavioral and output checks / 行为与产物检查
```

## Authoring requirements / 编写要求

- Keep templates independent of the host platform. Do not embed credentials, platform APIs, upload workflows, cloud scheduling or deployment procedures. Declare any required backend capability explicitly; never simulate successful business operations.
  保持模板独立于宿主平台，不嵌入凭据、平台 API、上传流程、云端调度或部署过程；需要后端的功能须明确声明，不模拟业务成功。

- Generate complete HTML for home, collection and content pages as appropriate to the template. Use React for browser interactions without requiring runtime SSR or SPA fallback. Support directory index.html and relative links/assets under a deployment subpath.
  按模板场景为首页、集合页和内容页生成完整 HTML，使用 React 实现浏览器交互，不要求运行时 SSR 或 SPA 回退；支持目录 index.html 和部署子路径下的相对链接、资源。

- Provide multilingual content by default. English is the initial default and uses root paths; other languages use configured prefixes, such as /zh/. Allow the default language to change through configuration. Preserve the current page when switching languages; do not duplicate default-language paths.
  默认提供多语言内容，初始默认语言为英文并使用根路径，其他语言使用配置前缀，如 /zh/；允许通过配置改变默认语言，切换语言保留当前页面，不重复生成默认语言路径。

- Define content types independently of example translations. Separate shared business configuration from localized copy. Centralize page registration so routes, generation and navigation remain consistent when pages change.
  内容类型独立于示例翻译，共享业务配置与多语言文案分离；集中页面注册，保证页面变化时路由、生成与导航一致。

- Keep page titles, descriptions, headings, links and image descriptions meaningful and localized. Document domain-dependent SEO configuration still required for a real deployment; do not invent a production domain.
  页面标题、描述、标题层级、链接与图片说明须有实际含义并完成翻译；说明正式部署仍需配置的域名相关 SEO 信息，不编造生产域名。

- Store assets locally and record their provenance and licenses. Label demonstration content; do not invent client endorsements, certifications, performance claims or working contact details.
  素材本地保存并记录来源与许可，标明演示内容，不编造客户背书、认证、业绩或有效联系方式。

- Use design tokens and responsive layouts. Preserve native controls' accessibility and visible focus. Provide clear states for menus, filters and unconfigured features.
  使用设计变量和响应式布局，保留原生控件的可访问性与可见焦点，为菜单、筛选和未配置功能提供清晰状态。

- Write documentation and explanatory comments in English followed by Chinese. Keep code identifiers, protocol fields and commands in English. Format code for readable, focused diffs.
  文档与解释性注释采用英文在前、中文在后的格式；代码标识符、协议字段与命令保持英文，格式化代码以便阅读和精确审查。

- Keep rules in AGENTS.md, usage and modification instructions in README, and visual guidance in DESIGN.md. Do not duplicate implementation facts across documents. Describe concrete editing entry points for content, languages, branding and new pages.
  约束集中于 AGENTS.md，使用和修改说明放 README，视觉规范放 DESIGN.md；不在多份文档中重复实现事实，明确内容、语言、品牌与新增页面的修改入口。

- Exclude node_modules, dist, intermediate build output, credentials, local environment files and temporary validation artifacts from source commits. Keep a real pnpm lockfile and a license for reusable code.
  源码提交排除 node_modules、dist、构建中间产物、凭据、本地环境文件与临时验证产物；保留真实生成的 pnpm lockfile 和可复用代码许可。

## Verification / 验证

Each template should expose formatting, tests, type checking and build commands. At minimum, run the following before delivering changes:
每套模板应提供格式检查、测试、类型检查和构建命令，交付修改前至少运行：

```sh
pnpm format:check
pnpm test
pnpm typecheck
pnpm build
```

Validate generated pages, assets, internal links, anchor targets and language counterparts. Derive checks from configuration and content rather than fixed page counts, sample brands or language pairs.
检查生成页面、资源、站内链接、锚点与语言对应页面；检查依据配置和内容，不固定页面数量、示例品牌或语言组合。

Exercise common editing scenarios: change the default language, retain a single language, configure contact information, replace branding, add collection items and register a page. The company template provides pnpm test:edits for isolated build verification of these changes.
验证常见修改场景：改变默认语言、只保留单语言、配置联系信息、替换品牌、新增集合内容和注册页面；企业官网模板提供 pnpm test:edits，在隔离副本中验证相关修改的构建。

Verify desktop and mobile layouts and actual browser interactions separately. Build or static-check success does not establish visual correctness or working hydration. Report any verification that could not be completed.
桌面、移动端布局与实际浏览器交互须单独验收，构建或静态检查通过不代表视觉正确或交互接管成功；明确说明未能完成的验证。
