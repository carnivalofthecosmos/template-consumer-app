#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import {
  AppProjectStack,
  AppAccountStack,
  AppEnvStack,
  AppCiCdStack
} from "../lib";

const app = new App();

// Project Level Infra
const project = new AppProjectStack(app, "TemplateApp");

// Account Level Infra
const mgtAccount = new AppAccountStack(project, "Mgt");

// CiCd Level Infra
const ciCd = new AppCiCdStack(mgtAccount);

// Dev Env Infra
const dev = new AppEnvStack(mgtAccount, "Dev");
ciCd.addCdkDeployEnvStageToPipeline({
  appEnv: dev,
  isManualApprovalRequired: false
});

// Tst Env Infra
const tst = new AppEnvStack(mgtAccount, "Tst");
ciCd.addCdkDeployEnvStageToPipeline({ appEnv: tst });
