#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { AppProjectStack, AppAccountStack, AppEnvStack } from "../lib";

const app = new App();

// Project Level Infra
const project = new AppProjectStack(app, "TemplateApp");

// Account Level Infra
const account = new AppAccountStack(project, "Mgt");

// Dev Env Infra
const dev = new AppEnvStack(account, "Dev");
project.CodePipeline.addDeployEnvStage(dev, {
  isManualApprovalRequired: false
});

// Tst Env Infra
const tst = new AppEnvStack(account, "Tst");
project.CodePipeline.addDeployEnvStage(tst);
