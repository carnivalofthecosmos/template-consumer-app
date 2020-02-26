import { ConsumerAccountStack } from "@carnivalofthecosmos/core";
import { AppProjectStack } from "../lib";

export class AppAccountStack extends ConsumerAccountStack {
  readonly Project: AppProjectStack;

  constructor(project: AppProjectStack, id: string) {
    super(project, id);

    this.Project = project;
  }
}
