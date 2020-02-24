import { Construct } from "@aws-cdk/core";
import { ConsumerAccountStack } from "@carnivalofthecosmos/core";
import { AppProjectStack } from "../lib";

export class AppAccountStack extends ConsumerAccountStack {
  readonly Project: AppProjectStack;

  constructor(scope: AppProjectStack, id: string) {
    super(scope, id);
  }
}
