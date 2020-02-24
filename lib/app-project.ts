import { Construct } from "@aws-cdk/core";
import { Repository as EcrRepository } from "@aws-cdk/aws-ecr";
import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
import { ConsumerProjectStack } from "@carnivalofthecosmos/core";
import { AppNodePipeline } from "@carnivalofthecosmos/pipeline";

export class AppProjectStack extends ConsumerProjectStack {
  readonly CodeRepo: CodeRepository;
  readonly CodePipeline: AppNodePipeline;
  readonly DockerRepo: EcrRepository;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.CodeRepo = new CodeRepository(this, "CodeRepo", {
      repositoryName: `app-${this.Name}-main-repo`.toLocaleLowerCase()
    });

    this.CodePipeline = new AppNodePipeline(this, "CodePipeline", {
      name: `App-${this.Name}-Main-Pipeline`,
      codeRepo: this.CodeRepo,
      buildCommands: ["npm run build"]
    });

    this.DockerRepo = new EcrRepository(this, "EcrRepo", {
      repositoryName: `app-${this.Name}/demo`.toLowerCase()
    });
  }
}
