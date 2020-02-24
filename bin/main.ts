#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { Repository as EcrRepository } from "@aws-cdk/aws-ecr";
import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
import {
  ConsumerProjectStack,
  ConsumerAccountStack
} from "@carnivalofthecosmos/core";
import { AppNodePipeline } from "@carnivalofthecosmos/pipeline";
import { EnvStack } from "../lib/env";

const app = new App();

const project = new ConsumerProjectStack(app, "TemplateApp");

const ecrRepo = new EcrRepository(project, "EcrRepo", {
  repositoryName: `app-${project.Project}/demo`.toLowerCase()
});

const codeRepo = new CodeRepository(project, "CodeRepo", {
  repositoryName: `app-${project.Project}-main-repo`.toLocaleLowerCase()
});

const codePipeline = new AppNodePipeline(project, "CodePipeline", {
  name: `App-${project.Project}-Main-Pipeline`,
  codeRepo,
  buildCommands: ["npm run build"]
});

const account = new ConsumerAccountStack(project, "Mgt");

const dev = new EnvStack(account, "Dev", {
  ecrRepo
});
codePipeline.addDeployEnvStage(dev, {
  isManualApprovalRequired: false
});

const tst = new EnvStack(account, "Tst", {
  ecrRepo
});
codePipeline.addDeployEnvStage(tst);
