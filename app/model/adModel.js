module.exports = (schema, sequelize, type) => {
    return sequelize.define('advertisement', {
      idx: { type: type.BIGINT, primaryKey: true, autoIncrement: true },
      owner: { type: type.STRING(500) },
      x: { type: type.INTEGER },
      y: { type: type.INTEGER },
      width: { type: type.INTEGER },
      height: { type: type.INTEGER },
      created: { type: type.DATE },
      enabled: { type: type.BOOLEAN },
      title: { type: type.STRING(500) },
      link: { type: type.STRING(500) },
      generated_address: { type: type.STRING(500) },
      generated_pk: { type: type.STRING(500) },
      image_base_64: { type: type.TEXT },
      wallet: { type: type.STRING(500) },
    },
    {
      schema: schema,
      timestamps: false,
      tableName: 'advertisement'
    })
  }