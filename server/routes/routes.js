const express = require('express');
const {check, body} = require("express-validator")

const controller = require('../controllers/authController');
const productController = require('../controllers/templateController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Registration
router.post(
  '/register',
  body('email').isEmail(),
  check('password', 'Пароль должен быть длиной от 4 до 10 символов.').isLength({ min: 4, max: 10 }),
  controller.register,
);
// Login
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/refresh', controller.refresh);

// Templates
router.post('/template', authMiddleware, uploadMiddleware.single('image'), productController.createTemplate);
router.put('/template/:id', authMiddleware, uploadMiddleware.single('image'), productController.editTemplate);
router.get('/templates', productController.getTemplates);
router.get('/template/:id', productController.getTemplate);
router.delete('/template/:id', authMiddleware, productController.deleteTemplate);
router.get('/user-templates', authMiddleware, productController.getUserTemplates);
router.post('/publish-template/:id', productController.publishTemplate);
router.post('/clone-template/:id', authMiddleware, productController.cloneTemplate);

router.get('/myapp', function(req, res){
  res.send("Hello from the root application URL");
});

module.exports = router;