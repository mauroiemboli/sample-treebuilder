import { Tree, Node } from "@Interfaces";

//It validates the nodes structure from imput
function validateNodes(nodes: Node[]): void {
    if (!Array.isArray(nodes)) {
        throw new Error("The input should be an array of nodes");
    }

    nodes.forEach(node => {
        if (typeof node.nodeId !== 'string') {
            throw new Error("Each node should have a 'nodeId' property of type string");
        }

        if (typeof node.name !== 'string') {
            throw new Error("Each node should have a 'name' property of type string");
        }

        if (node.parentId !== null && typeof node.parentId !== 'string') {
            throw new Error("Each node should have a 'parentId' property of type string or null");
        }

        if (node.previousSiblingId !== null && typeof node.previousSiblingId !== 'string') {
            throw new Error("Each node should have a 'previousSiblingId' property of type string or null");
        }
    });
}

//Takes an array of Nodes and create a Map
function createNodeMap(nodes: Node[]): Map<string, Tree> {
    const nodeMap: Map<string, Tree> = new Map();

    nodes.forEach(node => {
        nodeMap.set(node.nodeId,
            {
                ...node,
                children: [],
            });
    });

    return nodeMap;
}



export function createTree(nodes: Node[]): Tree[] {

    validateNodes(nodes);

    const nodeMap = createNodeMap(nodes);

    const treeStructure: Tree[] = [];

    nodes.forEach(node => {
        const currentNode = nodeMap.get(node.nodeId);

        if (!currentNode) {
            throw new Error(`Node with id: ${node.nodeId} not found in Map.`);
        }

        if (node.parentId) {
            const nodeParent = nodeMap.get(node.parentId);
            if (!nodeParent) {
                throw new Error(`Parent node with id: ${node.parentId} not found in Map.`);
            }

            //If node has a previous sibling
            if (node.previousSiblingId) {
                //Find the previous sibling Index
                const previousSiblingIndex = nodeParent.children.findIndex(child => child.nodeId === node.previousSiblingId);
                //Insert the sibling after the previos sibling
                nodeParent.children.splice(previousSiblingIndex + 1, 0, currentNode);
            } else {
                // If node has no sibling it means that is the first child so I insert at the beginning of the children parent
                nodeParent.children.unshift(currentNode);
            }
        } else {
            //If node has no parent it is a root node
            treeStructure.push(currentNode);
        }
    });

    return treeStructure;
};