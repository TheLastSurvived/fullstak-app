const TemplateModel = require('../models/template');

class TemplateService {
  async createTemplate(data) {
    return await TemplateModel.create(data);
  }

  async editTemplate(id, data) {
    const template = await TemplateModel.findByIdAndUpdate(id, data);

    return template;
  }

  async getTemplates(filter = {}) {
    const templates = await TemplateModel.find(filter);

    return templates;
  }

  async getTemplate(id) {
    const template = await TemplateModel.findById(id);

    return template;
  }

  async publishTemplate(id) {
    const template = await TemplateModel.findByIdAndUpdate(id, { isPublished: true });

    return template;
  }

  async cloneTemplate(id, userId) {
    const template = await this.getTemplate(id);

    let obj = template.toObject();
    delete obj._id;

    obj.author = userId;
    obj.isPublished = false;

    const newTemplate = this.createTemplate(obj);

    return newTemplate;
  }

  async deleteTemplate(id) {
    const template = await TemplateModel.deleteOne({ _id: id });

    return template;
  }
}

module.exports = new TemplateService();
