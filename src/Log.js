class Log {
  constructor(module) {
    this._module = module;
    this._baseFields = {};
    this._fields = {};
    this._hideFields = {};

    this._limit = 2;
    this._offset = 0;

    this.dev(false);
  }

  _updateFieldsObject(fieldsObject, newValues) {
    if (newValues) {
      Object.entries(newValues).forEach(([k, v]) => {
        if (v == null) { delete fieldsObject[k]; } else { fieldsObject[k] = v; }
      });
    }
    return this;
  }

  _updateBaseFields() {
    this._baseFields.module = `${this._isDev && 'dev-' || ''}${this._module}`;
    return this;
  }

  limit(limit) {
    this._limit = limit || 1;
    return this;
  }

  offset(offset) {
    this._offset = offset >= 0 ? offset : 0;
    return this;
  }

  dev(isDev) {
    this._isDev = Boolean(isDev);
    return this._updateBaseFields();
  }

  field(key, value, or = false) {
    if (Array.isArray(value) || or && this._fields[key]) {
      // todo: Реализовать логику or
    }
    return this._updateFieldsObject(this._fields, { [key]: value });
  }

  fields(fields) {
    return this._updateFieldsObject(this._fields, fields);
  }

  hide(fieldNames) {
    fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const fields = {};
    fieldNames.forEach((f) => fields[f] = 0 );
    return this._updateFieldsObject(this._hideFields, fields);
  }

  show(fieldNames) {
    fieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    const fields = {};
    fieldNames.forEach((f) => fields[f] = null );
    return this._updateFieldsObject(this._hideFields, fields);
  }

  find(fieldsOrAccount) {
    if (fieldsOrAccount) {
      if (isNaN(Number(fieldsOrAccount))) {
        this.fields(fieldsOrAccount);
      } else {
        this.acc(fieldsOrAccount);
      }
    }

    log(`Module '${this._baseFields.module}'`);

    return db.logs.find(
      { ...this._fields, ...this._baseFields },
      this._hideFields,
    )
      .sort({ _id: -1 })
      .skip(this._offset)
      .limit(this._limit)
      .pretty();
  }

  // Сахар
  acc(accountId) {
    return this.field('_ctx.accountId', String(accountId));
  }
}

module.exports = Log;
