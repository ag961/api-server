'use strict';

const express = require('express');
const router = express.Router();
const { Movies } = require('../models/index.js');

router.post('/', createRecord)
router.get('/', getRecords);
router.get('/:id', getOneRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

async function createRecord(req, res){
  let newObj = req.body
  const addedRecord = await Movies.create(newObj);  
  res.status(200).json(addedRecord);
}

async function getRecords (req, res){
  const allRecords = await Movies.read();
  res.status(200).json(allRecords);
}

async function getOneRecord(req, res){
  let id = req.params.id;
  const oneRecord = await Movies.read(id);
  res.status(200).json(oneRecord);
}

async function updateRecord(req, res){
  let id = req.params.id;
  let updateObj = req.body;
  const updatedRecord = await Movies.update(id, updateObj);
  res.status(200).json(updatedRecord);
}

async function deleteRecord(req, res){
  let id = req.params.id;
  const deletedRecord= await Movies.delete(id);
  res.status(200).json(deletedRecord);
}

module.exports = router;