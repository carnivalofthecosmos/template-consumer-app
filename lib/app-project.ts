import { Construct } from "@aws-cdk/core";
import { Repository as EcrRepository } from "@aws-cdk/aws-ecr";
import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
import { ConsumerProjectStack } from "@carnivalofthecosmos/core";

export class AppProjectStack extends ConsumerProjectStack {
  readonly CodeRepo: CodeRepository;
  readonly EcrRepo: EcrRepository;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.CodeRepo = new CodeRepository(this, "CodeRepo", {
      repositoryName: `app-${this.Name}-main-repo`.toLocaleLowerCase()
    });

    this.EcrRepo = new EcrRepository(this, "EcrRepo", {
      repositoryName: `app-${this.Name}/demo`.toLowerCase()
    });
  }
}
