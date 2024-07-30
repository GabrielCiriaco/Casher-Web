import { Router } from 'express';
import UsersController from '../controllers/usersController';

const router = Router();
const usersController = new UsersController();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com as informações fornecidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 username:
 *                   type: string
 *                   description: Nome de usuário
 *                 email:
 *                   type: string
 *                   description: Endereço de e-mail
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/createUser', usersController.createUser.bind(usersController));

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     description: Retorna uma lista de todos os usuários cadastrados.
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário
 *                   username:
 *                     type: string
 *                     description: Nome de usuário
 *                   email:
 *                     type: string
 *                     description: Endereço de e-mail
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/users', usersController.getAllUsers.bind(usersController));

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     description: Retorna os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 username:
 *                   type: string
 *                   description: Nome de usuário
 *                 email:
 *                   type: string
 *                   description: Endereço de e-mail
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/users/:id', usersController.getUserById.bind(usersController));

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     description: Atualiza os detalhes de um usuário específico com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               email:
 *                 type: string
 *                 description: Endereço de e-mail
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário
 *                 username:
 *                   type: string
 *                   description: Nome de usuário
 *                 email:
 *                   type: string
 *                   description: Endereço de e-mail
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/users/:id', usersController.updateUser.bind(usersController));

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID
 *     description: Remove um usuário específico com base no ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/users/:id', usersController.deleteUser.bind(usersController));

export default router;
