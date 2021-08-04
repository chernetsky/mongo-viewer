// const { log } = require('./utils');

class Log {
  constructor(db, module) {
    // Свойство _db не enumerable, чтобы оно не выводилось при логировании объекта
    Object.defineProperty(this, '_db', {
      enumerable: false,
      writable: true,
    });
    this._db = db;

    this._module = module;
    this._baseFields = {};
    this._fields = {};
    this._hideFields = {};

    this._limit = 2;
    this._offset = 0;

    this._updateBaseFields();
  }

  _updateFieldsObject(fieldsObject, newValues) {
    if (newValues) {
      Object.entries(newValues).forEach(([k, v]) => {
        if (v == null) {
          delete fieldsObject[k];
        } else {
          fieldsObject[k] = v;
        }
      });
    }
    return this;
  }

  _updateBaseFields() {
    this._baseFields.module = this._module;
    return this;
  }

  module(module) {
    this._module = module;
    return this._updateBaseFields();
  }

  limit(limit) {
    this._limit = limit || 1;
    return this;
  }

  offset(offset) {
    this._offset = offset >= 0 ? offset : 0;
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  field(key, value, or = false) {
    // if (Array.isArray(value) || or && this._fields[key]) {
    //   // todo: Реализовать логику or
    // }
    return this._updateFieldsObject(this._fields, { [key]: value });
  }

  fields(fields) {
    return this._updateFieldsObject(this._fields, fields);
  }

  hide(fieldNames) {
    fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const fields = {};
    fieldNames.forEach((f) => { fields[f] = 0; });
    return this._updateFieldsObject(this._hideFields, fields);
  }

  show(fieldNames) {
    fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const fields = {};
    fieldNames.forEach((f) => { fields[f] = null; });
    return this._updateFieldsObject(this._hideFields, fields);
  }

  find(fieldsOrAccount) {
    if (fieldsOrAccount) {
      if (Number.isNaN(Number(fieldsOrAccount))) {
        this.fields(fieldsOrAccount);
      } else {
        this.acc(fieldsOrAccount);
      }
    }

    return this._db.find({ ...this._fields, ...this._baseFields }, this._hideFields)
      .sort({ _id: -1 })
      .skip(this._offset)
      .limit(this._limit)
      .pretty();
  }

  // Сахар
  acc(accountId) {
    return this.field('_ctx.accountId', accountId);
  }
}

module.exports = Log;
