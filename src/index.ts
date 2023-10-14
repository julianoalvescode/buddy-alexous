#!/usr/bin/env node

import { program } from "commander";

import { Commands } from "./commands";

program.version("1.0.2");
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
  .command("list-components")
  .description("List all React components in a project")
  .action(Commands.listComponents);

program.parse(process.argv);
