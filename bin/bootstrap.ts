#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { ConsumerBootstrapStack } from "@carnivalofthecosmos/bootstrap";

const app = new App();

new ConsumerBootstrapStack(app, "TemplateApp", {
  description: "Test Des"
});
