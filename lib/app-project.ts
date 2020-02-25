import { Construct } from "@aws-cdk/core";
import { Repository as EcrRepository } from "@aws-cdk/aws-ecr";
import { Repository as CodeRepository } from "@aws-cdk/aws-codecommit";
import { ConsumerProjectStack } from "@carnivalofthecosmos/core";

export class AppProjectStack extends ConsumerProjectStack {
  readonly CodeRepo: CodeRepository;
  readonly DockerRepo: EcrRepository;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.CodeRepo = new CodeRepository(this, "CodeRepo", {
      repositoryName: `app-${this.Name}-main-repo`.toLocaleLowerCase()
    });

    this.DockerRepo = new EcrRepository(this, "EcrRepo", {
      repositoryName: `app-${this.Name}/demo`.toLowerCase()
    });
  }
}

// interface IConsumerNaming {
//   scope: IConsumerProject | IConsumerAccount | IConsumerAppEnv;
//   name: string;
//   type: string;
//   delimiter?: string;
// }

// const consumerNaming = (props: IConsumerNaming) => {
//   const { scope, name, type, delimiter = "-" } = props;
//   let scopeName = "";
//   switch (scope.Type) {
//     case "ConsumerAppEnv":
//       scopeName += scope.Name + delimiter;
//       break;
//     case "ConsumerAccount":
//       scopeName += scope.Name + delimiter;
//   }
//   return `app-${this.Name}-main-repo`;
// };
