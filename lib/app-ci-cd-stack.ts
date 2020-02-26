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

    const { CodeRepo, EcrRepo } = this.Account.Project;

    this.CodePipeline = new AppNodePipeline(this, "CodePipeline", {
      name: `App-${this.Account.Project.Name}-Main-Pipeline`,
      codeRepo: Repository.fromRepositoryName(
        this,
        CodeRepo.node.id,
        CodeRepo.repositoryName
      ),
      buildCommands: ["npm run build"],
      buildEnvs: {
        ECR_URL: {
          value: EcrRepo.repositoryUri
        }
      }
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
