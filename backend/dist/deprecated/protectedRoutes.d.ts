declare const router: import("express-serve-static-core").Router;
export default router;
/**
 * @swagger
 * tags:
 *   name: Rotas Protegidas
 *   description: Endpoints que requerem autenticação JWT
 */
/**
 * @swagger
 * /protected:
 *   get:
 *     summary: Testa o acesso à rota protegida
 *     tags: [Rotas Protegidas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso autorizado à rota protegida
 *       401:
 *         description: Token não fornecido ou inválido
 */ 
