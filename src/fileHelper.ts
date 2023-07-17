import { Tree } from '@Interfaces';
import fs from 'fs';
import path from 'path';

export function writeToFile(fileNamePrefix: string, data: Tree[]): string | null {
    const now = new Date();
    const filename = `${fileNamePrefix}_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.json`;

    const outputDir = path.join(__dirname, '../output');
    const outputPath = path.join(outputDir, filename);

    //If the directory does not exist create it
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        //Generating json file with with white space (2 spaces of indentation)
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error while writing file: ${error}`);
        return null;
    }

    return filename;
}