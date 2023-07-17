import { Node, Tree } from '@Interfaces';
import nodes from '@Input/nodes.json';
import { createTree } from '@TreeBuilder';
import { writeToFile } from '@FileHelper';

//Create tree from nodes.json
const tree: Tree[] = createTree(nodes as Node[]);

const filename = writeToFile('generated-tree', tree);

if (filename === null) {
    console.error('Error occurred during file writing.');
    process.exit(1);
} else {
    // Print success message
    console.log(`Tree successfully created and written to file: ${filename}`);
}

