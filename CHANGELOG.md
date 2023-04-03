# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v3.0.0...v3.1.0) (2023-04-03)


### Features

* Added option to send comment in Event ([#60](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/60)) ([a11044a](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/a11044a618c71cd60658915e36ab9f50661cf5e4))


### Miscellaneous

* bump json5 from 1.0.1 to 1.0.2 ([#55](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/55)) ([9de4a61](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/9de4a61cc6d64944a648f1e3bbec89a2d7b04cc3))
* README.md typo ([#58](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/58)) ([49de69d](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/49de69dfc5d5f2f6d592f3498b7cf7f3ea7be9d7))
* update semantic PR check ([758b878](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/758b878a6a0f081a42ff3b04af15f09ab02b3b3b))

## [3.0.0](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v2.2.1...v3.0.0) (2022-11-22)


### ⚠ BREAKING CHANGES

* Drop support for Fastify v3

### Bug Fixes

* missing closing bracket in readme ([#50](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/50)) ([b3496f2](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/b3496f23fcf03d8224843ce78e0fd05d39dcff83))


### Miscellaneous

* update `fastify-plugin` ([#54](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/54)) ([d293fdb](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/d293fdb233258ecc73538b793dca708d8332bd2a))

## [2.2.1](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v2.2.0...v2.2.1) (2022-06-09)


### Bug Fixes

* add fastify@v4 support ([#47](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/47)) ([c9cf800](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/c9cf800eb95e47f2122b2a0a667fb993408818ec))

## [2.2.0](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v2.1.0...v2.2.0) (2022-06-06)


### Features

* enable fastify-sse style api ([#41](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/41)) ([538f67b](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/538f67beb80ab11180f62bf2cccf637e781605cf))


### Miscellaneous

* **master:** release 2.1.0 ([#44](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/44)) ([726fe84](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/726fe8494864d83b807ff16a7ca7b459e80bacc7))

## [2.1.0](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v2.0.6...v2.1.0) (2022-06-06)


### Features

* enable fastify-sse style api ([#41](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/41)) ([538f67b](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/538f67beb80ab11180f62bf2cccf637e781605cf))

## [Unreleased]
## [2.0.6]

## Fixed
- removed vulnerable and not needed dependencies
## [2.0.5]

## Fixed
- added export for EventMessage

## [2.0.4]

## Fixed
- headers from reply (other plugins like cors) not being set on stream
- vulnerable dependencies

## [2.0.3]

## Added
- default export

## [2.0.2]
## Fixes
- headers not being set

## [2.0.1]
## Bugfix
- add headers to prevent compression

## [2.0.0]
## Feature
- fastify v3 support

## [1.0.4]
## Fixed
- bug with too much new lines between messages

## [1.0.3]
### Fixed
- type definitions referencing itself

## [1.0.2]
### Fixed
- update npm links

## [1.0.1]
### Fixed
- update what files gets published on npm

[Unreleased]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v2.0.2...HEAD
[2.0.2]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v1.0.4...v2.0.0
[1.0.4]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/nodefactoryio/fastify-sse-v2/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/nodefactoryio/fastify-sse-v2/releases/tag/v1.0.0
