#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  ConsumerProjectStack,
  ConsumerAccountStack
} from "@carnivalofthecosmos/core";
import { Repository } from "@aws-cdk/aws-ecr";
import { EnvStack } from "./env";

const app = new App();

const project = new ConsumerProjectStack(app, "TemplateApp");

const ecrRepo = new Repository(project, "EcrRepo", {
  repositoryName: `app-${project.Project}/demo`.toLowerCase()
});
// const codeRepo = new CodeRepo(project, "CodeRepo");
// const codePipeline = new NodePipeline(project, "CodePipeline");

const account = new ConsumerAccountStack(project, "Mgt");

const dev = new EnvStack(account, "Dev", {
  ecrRepo
});

// const tst = new EnvStack(account, "Tst", {
//   ecrRepo
// });
