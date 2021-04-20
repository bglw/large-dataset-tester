import fs from "fs";
import path from "path";

import {clouds} from "./data.js";

const clean = (dir) => {
    console.log(`Cleaning ${dir}`);
    fs.rmdirSync(dir, { recursive: true });
}

const randomName = () => {
    return [
        clouds[Math.floor(Math.random() * clouds.length)],
        clouds[Math.floor(Math.random() * clouds.length)]
    ].join(` `);
}

const sluggIsh = (name) => {
    return name.toLowerCase().replace(/\s/g, '-') + `.yaml`;
}

const write = async (file, contents) => {
    await fs.promises.mkdir(path.dirname(file), {recursive: true});
    await fs.promises.writeFile(file, contents);
}

const generateDataFiles = async (count, dir) => {
    if (!/^\.\/example.+\/.+/.test(dir)) return;
    clean(dir);

    const writingFiles = [];

    for (let i = 0; i < count; i++) {
        const name = randomName();
        const file = path.join(dir, sluggIsh(name));

        writingFiles.push(write(file, `title: ${name}\nprice: ${(Math.random() * 100).toFixed(2)}`));
    }

    await Promise.all(writingFiles);
    console.log(`Done generating ${count} data files in ${dir}`);
}

const generateDataFile = async (count, dir) => {
    if (!/^\.\/example.+\/.+/.test(dir)) return;
    clean(dir);

    const file = path.join(dir, `data.yaml`);
    let contents = [];

    for (let i = 0; i < count; i++) {
        const name = randomName();
        contents.push(
`- title: ${name}
  price: ${(Math.random() * 100).toFixed(2)}`
        )
    }

    await write(file, contents.join(`\n`));
    console.log(`Done generating ${count} data items in ${file}`);
}

generateDataFiles(100, './example-100-data-files/_data');
generateDataFiles(1000, './example-1000-data-files/_data');

generateDataFile(100, './example-100-data-file/_data');
generateDataFile(1000, './example-1000-data-file/_data');
