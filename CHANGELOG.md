# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.1.0](https://github.com/mpetrunic/fastify-sse-v2/compare/v4.0.0...v4.1.0) (2024-09-16)


### Features

* add disable retryDelay ([#86](https://github.com/mpetrunic/fastify-sse-v2/issues/86)) ([760fd6a](https://github.com/mpetrunic/fastify-sse-v2/commit/760fd6a72f3e6ba46752a8e5432815f4e5e8d4f7))


### Miscellaneous

* bump braces from 3.0.2 to 3.0.3 ([#82](https://github.com/mpetrunic/fastify-sse-v2/issues/82)) ([6bdaa62](https://github.com/mpetrunic/fastify-sse-v2/commit/6bdaa62c90c9e0b02588d2228cfc54e77391a25c))
* bump micromatch from 4.0.5 to 4.0.8 ([#87](https://github.com/mpetrunic/fastify-sse-v2/issues/87)) ([866547c](https://github.com/mpetrunic/fastify-sse-v2/commit/866547c5a49b4fb2faf4f7754b5ea0a3d8ea0224))
* bump path-to-regexp from 1.8.0 to 1.9.0 ([#88](https://github.com/mpetrunic/fastify-sse-v2/issues/88)) ([6e0f9c2](https://github.com/mpetrunic/fastify-sse-v2/commit/6e0f9c2b16b70f17d0900607e33e49c8c25a77bd))

## [4.0.0](https://github.com/mpetrunic/fastify-sse-v2/compare/v3.1.2...v4.0.0) (2024-03-20)


### ⚠ BREAKING CHANGES

* there is no "end" event when stream is closing in case you depended on it

### Bug Fixes

* remove default stream close event ([#81](https://github.com/mpetrunic/fastify-sse-v2/issues/81)) ([311c920](https://github.com/mpetrunic/fastify-sse-v2/commit/311c920e0325f355afe824b685ca680d93c71c36))


### Miscellaneous

* bump get-func-name from 2.0.0 to 2.0.2 ([#78](https://github.com/mpetrunic/fastify-sse-v2/issues/78)) ([3495dbc](https://github.com/mpetrunic/fastify-sse-v2/commit/3495dbc96222a9fb991ef0b57183676e8426d752))

## [3.1.2](https://github.com/mpetrunic/fastify-sse-v2/compare/v3.1.1...v3.1.2) (2023-07-25)


### Bug Fixes

* edge case when user (or server) sends headers before first event is sent ([#73](https://github.com/mpetrunic/fastify-sse-v2/issues/73)) ([77d1b51](https://github.com/mpetrunic/fastify-sse-v2/commit/77d1b51fea9303ff61f9975a971a5b8df3c6a60e))


### Miscellaneous

* bump word-wrap from 1.2.3 to 1.2.4 ([#71](https://github.com/mpetrunic/fastify-sse-v2/issues/71)) ([470b474](https://github.com/mpetrunic/fastify-sse-v2/commit/470b474e064929deecb9cc74f843741d5306b4f2))
* cleanup ([#74](https://github.com/mpetrunic/fastify-sse-v2/issues/74)) ([b77aa24](https://github.com/mpetrunic/fastify-sse-v2/commit/b77aa24bf1e963fc455e09d38da407b3ea154e6b))

## [3.1.1](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v3.1.0...v3.1.1) (2023-07-03)


### Bug Fixes

* add utf-8 charset to content-type ([#68](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/68)) ([4fb15be](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/4fb15be2587da286436c54ecf003178ebe39ee53))


### Miscellaneous

* bump semver from 7.3.8 to 7.5.3 ([#69](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/69)) ([34a0870](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/34a08709197549b07f49eb421228ac11a2c80c6f))
* update mocha ([#64](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/64)) ([066a775](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/066a775a2def4ca09178888517f46c0f9cadbe85))

## [3.1.0](https://github.com/NodeFactoryIo/fastify-sse-v2/compare/v3.0.0...v3.1.0) (2023-04-03)

### Features

* Added option to send comment in Event ([#60](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/60)) ([a11044a](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/a11044a618c71cd60658915e36ab9f50661cf5e4))


### Bug Fixes

* add fastify@v4 support ([#47](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/47)) ([c9cf800](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/c9cf800eb95e47f2122b2a0a667fb993408818ec))
* missing closing bracket in readme ([#50](https://github.com/NodeFactoryIo/fastify-sse-v2/issues/50)) ([b3496f2](https://github.com/NodeFactoryIo/fastify-sse-v2/commit/b3496f23fcf03d8224843ce78e0fd05d39dcff83))


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
