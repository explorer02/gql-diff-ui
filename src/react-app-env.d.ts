/// <reference types="react-scripts" />

interface NodePaths {
  [key: string]: [string];
}

interface Node {
  [key: string]: NodePaths;
}

interface SchemaChange {
  oldValue: string;
  newValue: string;
}

interface ChangedNode {
  [key: string]: SchemaChange;
}

interface Changes {
  paths?: Node;
  changedValues?: ChangedNode;
  timeStamp?: string;
}

interface DisplayNodeProps {
  name: string;
  pathsTo: NodePaths; // or the appropriate type for pathsTo
  nodeChanges: ChangedNode; // replace `any` with the appropriate type if known
}

interface DisplayPathsProps {
  paths: [string];
}

interface DisplayPathProps {
  path: string;
}

interface DiffViewProps {
  oldText: string;
  newText: string;
}

enum ChoiceType {
  "Query" = "Query",
  "Mutation" = "Mutation",
}

interface Choice {
  name: string;
  type: ChoiceType;
  environment: string;
}

interface ShowSpaceSelectProps {
  choices: Choice[];
}

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

interface DisplayDifferenceProps {
  name: string;
  changes: Changes;
}
