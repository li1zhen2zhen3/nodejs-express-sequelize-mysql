module.exports = app => {
  const tutorials = require('../controller/tutorial.controller.js');
  var router = require('express').Router();
  const excelController = require('../controller/tutorial/excel.controller');
  const uploadExcelController = require('../controller/tutorial/upload.excel.controller');
  const upload = require('../middlewares/upload');
  router.post('/', tutorials.create);
  router.get('/', tutorials.findAll);
  router.get('/published', tutorials.findAllPublished);
  router.get('/:id', tutorials.findOne);
  router.put('/:id', tutorials.update);
  router.delete('/:id', tutorials.delete);
  router.delete('/', tutorials.deleteAll);
  router.get('/excel/download', excelController.download);
  router.post('/excel/upload', upload.single('file'), uploadExcelController.upload);
  router.get('/excel/tutorials', uploadExcelController.getTutorials);
  app.use('/api/tutorials', router);
};