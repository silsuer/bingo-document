---
banner:
  name: 'Bingo Framework'
  desc: '一个简易开源的 GO WEB 框架'
  btns: 
    - { name: '开 始', href: './documents/index.html', primary: true }
    - { name: 'Github >', href: 'https://github.com/silsuer/bingo' }
  caption: '当前版本: v0.0.1'
features: 
  - { name: '优雅', desc: '受到Laravel启发，提供了一个初始化的结构目录来规范开发流程，整体模块化，随用随插，绝不冗余一丝一毫' }
  - { name: '灵活', desc: '可以直接使用bingo子模块或者各种第三方开发包，无需配置，开箱即用' }
  - { name: '简洁', desc: '提供开发脚手架，快速构建Restful API应用，初始化后的项目仅仅依赖两个模块，我希望做到大而全，又不想失去小而美' }
  - { name: '开源', desc: '我致力于让它有着golang的速度和Laravel的优雅，所有代码都已经开源在Github，智者借力而行，欢迎所有人共同创造这个优雅的框架' }

footer:
  copyRight:
    name: 'silsuer'
    href: 'https://silsuer.github.io/'
  links:
    作者相关:
      - { name: 'Github', href: 'https://github.com/silsuer/' }
      - { name: 'Blog', href: 'https://silsuer.github.io/' }
    Git仓库:
      - { name: 'Github', href: 'https://github.com/silsuer/bingo' }
---

<Homepage banner={banner} features={features} />
<Footer distPath={props.page.distPath} copyRight={props.footer.copyRight} links={props.footer.links} />
