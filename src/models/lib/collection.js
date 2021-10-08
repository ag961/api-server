'use strict';

class Collection {
  constructor(model) {
    this.model = model
  }

  async create(json) {
    try {
      const record = await this.model.create(json);
      return record;
    }
    catch(error){
      console.log(`Error creating a record in database. Model:${this.model.name}`, error.message)
    }
  }

  async read(id) {
    try {
      if (!id) {
        const records = await this.model.findAll();
        return records;
      }
      else {
        const record = await this.model.findOne({ where: { id } })
        return record;
      }
    }
    catch (error) {
      console.log(`Error reading from database. Model:${this.model.name}`, error.message)
    }
  }

  async update(id, json){
    try{
      const foundRecord = await this.model.findOne( {where: { id } });
      const updatedRecord = await foundRecord.update(json);
      return updatedRecord;
    }
    catch (error){
      console.log(`Error updating a record in database. Model:${this.model.name}`, error.message);
    }
  }

  async delete(id){
    try{
      const deletedRecord = await this.model.destroy( {where: { id }});
      return deletedRecord;
    }
    catch(error){
      console.log(`Error deleting a record in database. Model:${this.model.name}`, error.message);
    }
  }
}

module.exports = Collection;