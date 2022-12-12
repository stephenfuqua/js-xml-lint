# js-xml-lint

Command line XML Linter, in JavaScript (via TypeScript).

## Use Case

As a developer, I want to validate XML files for internal consistency and
adherence to a defined schema, so that I can be confident that my XML files are
logically correct and should work "as advertised" (by the schema) in downstream
systems.

Conditions of satisfaction:

1. Command line tool that can run on Windows, Linux, or Mac.
2. Readable / actionable console output.
3. SARIF file reporting for use with continuous integration (CI) environments.
4. GitHub Action job.

## Development Goals

With status as of version 0.0.1:

1. Command line utility with help. :heavy_check_mark:
2. Validate a single file. :heavy_check_mark:
3. ... or, an entire directory. :x:
4. Auto-detect XSD from XML file's declaration. :x:
5. Readable console output. :wavy_dash:
6. Output in SARIF format. :x:
7. ... and possibly in junit XML. :x:
8. GitHub Actions automation. :x:
9. Publish to npmjs. :x:

## Usage

```bash
yarn start --help
```

## License

Copyright (c) 2022, Stephen A. Fuqua. Freely available under terms of the [MIT
License](LICENSE).
