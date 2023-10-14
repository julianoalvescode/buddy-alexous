#!/usr/bin/env node

import { program } from "commander";

import { Commands } from "./commands";

program.version("1.0.4");
program.description("A CLI for React");

program
  .command("find-unused")
  .description("Find unused React components in a project")
  .action(Commands.findUnusedComponents);

program
  .command("create-component <name>")
  .description("Create a new React component")
  .action(Commands.createComponent);

program
  .command("list-component-dependencies <componentPath>")
  .description("List dependencies (imports) of a specific React component")
  .action(Commands.listComponentDependencies);

program
  .command("generate-doc <componentPath>")
  .description("Generate basic documentation for a specific React component")
  .action(Commands.generateComponentDocumentation);

program
  .command("list-components-sizes <directory>")
  .description("List all React components in a directory and their sizes")
  .action(Commands.listComponentsSizes);

program.parse(process.argv);
