- [ ] Webpack configuration
  - [ ] Set up configuration files that can be extended/overridden
    - dev config = base config + dev overrides
    - prod config = base config + prod overrides
    - stats config = prod config + stats overrides
  - [ ] Add necessary scripts to package.json (use npm-run-all where necessary)
    - How do we structure scripts?
    - Naming convention for scripts?
  - [ ] Webpack configuration files should be written in TypeScript
  - [ ] Set up entrypoints using object notation
    - Main bundle can be called "main"
  - [ ] Set up webpack output parameters
  - [ ] Bundle optimisation
    - How do we split the bundle in development?
    - How do we split the bundle in production?
  - [ ] Configure necessary webpack module rules
    - How do we process JavaScript/TypeScript files?
    - How do we process SVG files?
    - How do we process other image files?
    - Are there any differences as to how we process files in different environments?
  - [ ] Configure necessary webpack plugins
    - How can we clean the output directory before each build?
    - How do we add bundled output to HTML files?
    - What additional plugins do we want to use in development?
  - [ ] Configure Webpack development server

- [ ] TypeScript configuration
 - How do we process application-specific TypeScript files?
 - How do we process test TypeScript files?
 - How do we process Webpack TypeScript configuration files?

- [ ] Babel configuration
 - How do we make sure that our files are ES5-compliant?
 - How do we make sure that JSX is transpiled to valid JavaScript?
 - Additional plugins to consider: Babel for styled-components and React fast refresh

- [ ] Dockerfile
  - How do we utilise multi-stage builds to make the smallest possible image?
  - How do we pass "environment variables" to a built image?
  - How do we configure Nginx to serve all entrypoints?

- [ ] Docker Compose
  - Provide build path pointing to Dockerfile.
  - Provide all environment variables with default values.

- [ ] Development workflow
  - [ ] Lint and fix on save (ESLint and prettier)
  - [ ] Git hooks (pre-commit, commit-msg, pre-push, ...)
