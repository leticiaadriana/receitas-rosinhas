import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "E-mail ou Senha inválidos!" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "E-mail ou Senha inválidos!" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      firstAccess: user.firstAccess,
    });
  } catch (err) {
    console.error("Erro ao entrar:", err);
    return res.status(500).json({ error: "Erro interno do servidor!" });
  }
}

export async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstAccess: true,
    });
    res.status(201).json({ message: "Usuário criado", id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "A senha deve ter ao menos 8 caracteres!" });
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    user.password = newPassword;
    user.firstAccess = false;
    await user.save();

    return res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (err) {
    console.error("Erro ao redefinir a senha", err);
    return res.status(500).json({ error: "Erro interno do servidor!" });
  }
}
