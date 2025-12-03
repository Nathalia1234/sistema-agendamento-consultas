declare const router: import("express-serve-static-core").Router;
export default router;
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints relacionados aos usuários
 */
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obter dados do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso
 *       401:
 *         description: Token ausente ou inválido
 */ 
