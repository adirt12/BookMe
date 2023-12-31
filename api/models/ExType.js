const mongoose = require('mongoose');

const ExSchema = new mongoose.Schema({
    NameTypeEx: {
        type: String,
        required: true,
        unique: true,
    },
})

const ExType = mongoose.model("ExType", ExSchema);

module.exports = ExType;

  
