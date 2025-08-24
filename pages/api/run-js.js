export default async function handler(req, res) {
  try {
    const { code } = req.body;
    let result = eval(code); // ⚠️ solo educativo, no en producción real
    res.json({ output: String(result) });
  } catch (err) {
    res.json({ output: "Error: " + err.message });
  }
}
