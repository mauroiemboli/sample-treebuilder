export interface Node {
    nodeId: string;
    name: string;
    parentId: string | null;
    previousSiblingId: string | null;
}

export interface Tree extends Node {
    children: Tree[];
}