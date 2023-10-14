#!/usr/bin/env node

import { program } from "commander";

import { Commands } from "./commands";

program.version("1.0.0");

program
  .command("find-unused")
  .description("Find unused React components in a project")
  .action(Commands.findUnusedComponents);

program
  .command("create-component <name>")
  .description("Create a new React component")
  .action(Commands.createComponent);

program.parse(process.argv);