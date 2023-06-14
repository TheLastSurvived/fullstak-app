const templateService = require('../service/template');
const userService = require('../service/user');

class TemplateControler {
  async createTemplate(req, res, next) {
    try {
      const templateData = {
        title: req.body.title,
        data: req.body.data,
        isPublished: false,
        author: req.user.id,
        imageFileName: req.file.filename,
        description: req.body.description,
      }
      console.log('templateData: ', templateData);

      const template = await templateService.createTemplate(templateData);

      return res.status(200).json({
        message: 'Шаблон успешно добавлен',
        data: {
          templateId: template._id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async editTemplate(req, res, next) {
    try {
      const id = req.params.id;

      const templateData = {}

      if (req.body.title) {
        templateData["title"] = req.body.title;
      }
      if (req.body.description) {
        templateData["description"] = req.body.description;
      }
      if (req.body.data) {
        templateData["data"] = req.body.data;
      }
      if (req.file?.filename) {
        templateData["imageFileName"] = req.file.filename;
      }

      const template = await templateService.editTemplate(id, templateData);

      return res.status(200).json({
        message: 'Шаблон успешно обновлен',
        data: {
          templateId: template._id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getTemplates(req, res, next) {
    try {
      const filters = { isPublished: true };
      
      const products = await templateService.getTemplates(filters);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getTemplate(req, res, next) {
    try {
      const id = req.params.id;
      
      const products = await templateService.getTemplate(id);

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getUserTemplates(req, res, next) {
    try {
      const id = req.user.id;
      const products = await templateService.getTemplates({ author: id });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }


  async publishTemplate(req, res, next) {
    try {
      const id = req.params.id;
      const templates = await templateService.publishTemplate(id);

      return res.status(200).json(templates);
    } catch (error) {
      next(error);
    }
  }

  async cloneTemplate(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      const newTemplate = await templateService.cloneTemplate(id, userId);

      return res.status(200).json(newTemplate);
    } catch (error) {
      next(error);
    }
  }

  async deleteTemplate(req, res, next) {
    try {
      const id = req.params.id;

      const newTemplate = await templateService.deleteTemplate(id);

      return res.status(200).json(newTemplate);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TemplateControler();
