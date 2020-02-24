#!/usr/bin/env node
import "source-map-support/register";
import { StackProps } from "@aws-cdk/core";
import { ConsumerEcsAppEnvStack } from "@carnivalofthecosmos/core";
import { ContainerImage } from "@aws-cdk/aws-ecs";
import { EcsService } from "@carnivalofthecosmos/service";
import { AppAccountStack } from ".";

export interface AppEnvStackProps extends StackProps {
  tag?: string;
}

export class AppEnvStack extends ConsumerEcsAppEnvStack {
  readonly Account: AppAccountStack;

  constructor(
    account: AppAccountStack,
    name: string,
    props?: AppEnvStackProps
  ) {
    super(account, name, props);

    const { tag = "latest" } = props || {};
    const { DockerRepo } = this.Account.Project;

    new EcsService(this, "Frontend", {
      container: {
        image: ContainerImage.fromEcrRepository(DockerRepo, tag)
      },
      service: {},
      routing: {
        pathPattern: "/test",
        priority: 1
      }
    });
  }
}
