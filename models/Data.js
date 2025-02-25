const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    CLUS_ID: { type: Number, required: true },
    CLUS_NM: { type: String, required: true },
    SAM_ID: { type: Number, required: true },
    SAM_NM: { type: String, required: true },
    LOK_ID: { type: Number, required: true },
    LOK_NM: { type: String, required: true },
    VID_ID: { type: Number, required: true },
    VID_NM: { type: String, required: true }
});

module.exports = mongoose.model('Data', DataSchema);
