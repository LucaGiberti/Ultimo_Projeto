import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

// teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando com SQLite' });
});

// listar usuários
app.get('/usuarios', (req, res) => {
  try {
    const usuarios = db.prepare(`
      SELECT * FROM usuarios
    `).all();

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// listar solicitações
app.get('/solicitacoes', (req, res) => {
  try {
    const solicitacoes = db.prepare(`
      SELECT * FROM solicitacoes
    `).all();

    res.json(solicitacoes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// criar solicitação
app.post('/solicitacoes', (req, res) => {
  try {
    const {
      protocolo,
      titulo,
      descricao,
      usuario_id,
      departamento_id,
      categoria_id,
      prioridade_id,
      status_id,
      responsavel_id
    } = req.body;

    const stmt = db.prepare(`
      INSERT INTO solicitacoes (
        protocolo,
        titulo,
        descricao,
        usuario_id,
        departamento_id,
        categoria_id,
        prioridade_id,
        status_id,
        responsavel_id,
        data_abertura,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
    `);

    const result = stmt.run(
      protocolo,
      titulo,
      descricao,
      usuario_id,
      departamento_id,
      categoria_id,
      prioridade_id,
      status_id,
      responsavel_id
    );

    res.status(201).json({
      mensagem: 'Solicitação criada com sucesso',
      id: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});