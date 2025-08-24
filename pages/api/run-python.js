import { exec } from "child_process";
import fs from "fs";

export default async function handler(req, res) {
  const { code } = req.body;
  const filePath = "/tmp/code.py";

  fs.writeFileSync(filePath, code);

  exec(`python3 ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      res.json({ output: stderr || error.message });
    } else {
      res.json({ output: stdout.trim() });
    }
  });
}
