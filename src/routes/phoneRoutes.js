'use strict';

const express = require('express');
const router = express.Router();
const { Phones } = require('../models/index.js')

router.post('/', createRecord);
router.get('/', getRecords);
router.get('/:id', getOneRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

async function createRecord(req, res){
  let newObj = req.body
  const addedRecord = await Phones.create(newObj);  
  res.status(200).json(addedRecord);
}

async function getRecords (req, res){
  const allRecords = await Phones.read();
  res.status(200).json(allRecords);
}

async function getOneRecord(req, res){
  let id = req.params.id;
  const oneRecord = await Phones.read(id);
  res.status(200).json(oneRecord);
}

async function updateRecord(req, res){
  let id = req.params.id;
  let updateObj = req.body;
  const updatedRecord = await Phones.update(id, updateObj);
  res.status(200).json(updatedRecord);
}

async function deleteRecord(req, res){
  let id = req.params.id;
  const deletedRecord= await Phones.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;