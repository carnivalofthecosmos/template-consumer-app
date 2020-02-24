#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { AppProjectStack, AppAccountStack, AppEnvStack } from "../lib";

const app = new App();

const project = new AppProjectStack(app, "TemplateApp");

const account = new AppAccountStack(project, "Mgt");

const dev = new AppEnvStack(account, "Dev");

const tst = new AppEnvStack(account, "Tst");

// Add  Deploy staged to code pipeline for each env
project.CodePipeline.addDeployEnvStage(dev, {
  isManualApprovalRequired: false
});
project.CodePipeline.addDeployEnvStage(tst);
