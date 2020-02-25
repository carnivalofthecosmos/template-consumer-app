import {
  ConsumerCiCdStack,
  addCdkDeployEnvStageToPipeline,
  IConsumerAppEnv
} from "@carnivalofthecosmos/core";
import { AppAccountStack } from "../lib";
import { AppNodePipeline } from "@carnivalofthecosmos/pipeline";
import { Repository } from "@aws-cdk/aws-codecommit";

export class AppCiCdStack extends ConsumerCiCdStack {
  readonly Account: AppAccountStack;
  readonly CodePipeline: AppNodePipeline;

  constructor(account: AppAccountStack) {
    super(account);

    this.Account = account;

    const codeRepo = this.Account.Project.CodeRepo;

    this.CodePipeline = new AppNodePipeline(this, "CodePipeline", {
      name: `App-${this.Account.Project.Name}-Main-Pipeline`,
      codeRepo: Repository.fromRepositoryName(
        this,
        codeRepo.node.id,
        codeRepo.repositoryName
      ),
      buildCommands: ["npm run build"]
    });
  }

  addCdkDeployEnvStageToPipeline(props: {
    appEnv: IConsumerAppEnv;
    isManualApprovalRequired?: boolean;
  }) {
    addCdkDeployEnvStageToPipeline({
      ...props,
      pipeline: this.CodePipeline.Pipeline,
      deployProject: this.DeployProject
    });
  }
}
