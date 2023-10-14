#!/usr/bin/env node
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const commander_1=require("commander"),commands_1=require("./commands");commander_1.program.version("1.0.0"),commander_1.program.command("find-unused").description("Find unused React components in a project").action(commands_1.Commands.findUnusedComponents),commander_1.program.command("create-component <name>").description("Create a new React component").action(commands_1.Commands.createComponent),commander_1.program.parse(process.argv);