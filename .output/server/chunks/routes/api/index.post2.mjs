import { a as useRuntimeConfig, o as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { mkdir, writeFile } from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'requrl';

const storeFileLocally = async (file, fileNameOrIdLength, filelocation = "") => {
  const { binaryString, ext } = parseDataUrl(file.content);
  const location = useRuntimeConfig().public.fileStorage.mount;
  const originalExt = file.name.toString().split(".").pop() || ext;
  const filename = typeof fileNameOrIdLength == "number" ? `${generateRandomId(fileNameOrIdLength)}.${originalExt}` : `${fileNameOrIdLength}.${originalExt}`;
  await mkdir(`${location}${filelocation}`, { recursive: true });
  await writeFile(`${location}${filelocation}/${filename}`, binaryString, {
    flag: "w"
  });
  return filename;
};
const generateRandomId = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
};
const parseDataUrl = (file) => {
  const arr = file.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid data URL");
  }
  const mime = mimeMatch[1];
  const base64String = arr[1];
  const binaryString = Buffer.from(base64String, "base64");
  const ext = mime.split("/")[1];
  return { binaryString, ext };
};

const prisma = new PrismaClient();
const index_post = defineEventHandler(async (event) => {
  const { files } = await readBody(event);
  const data = [];
  for (const file of files) {
    const name = await storeFileLocally(file, 8);
    await prisma.image.create({
      data: {
        name,
        url: "/uploads/" + name
      }
    }).then((image) => {
      data.push(image);
    });
  }
  return data;
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
