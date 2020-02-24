#!/usr/bin/env node
import "source-map-support/register";
import { StackProps } from "@aws-cdk/core";
import {
  ConsumerAccountStack,
  ConsumerEcsAppEnvStack
} from "@carnivalofthecosmos/core";
import { IRepository } from "@aws-cdk/aws-ecr";
import { ContainerImage } from "@aws-cdk/aws-ecs";
import { EcsService } from "@carnivalofthecosmos/service";

export interface EnvStackProps extends StackProps {
  ecrRepo: IRepository;
  tag?: string;
}

export class EnvStack extends ConsumerEcsAppEnvStack {
  constructor(
    account: ConsumerAccountStack,
    appEnv: string,
    props: EnvStackProps
  ) {
    super(account, appEnv, props);

    const { ecrRepo, tag = "latest" } = props;


    new EcsService(this, "Frontend", {
      container: {
        image: ContainerImage.fromEcrRepository(ecrRepo, tag)
      },
      service: {},
      routing: {
        pathPattern: "/test",
        priority: 1
      }
    });
  }
}
