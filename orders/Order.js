const mongoose = require('mongoose')

mongoose.model("Order", {
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        requires: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true

    },
    initialDate: {
        type: Date,
        required: true

    },
    deliveryDate: {
        type: Date,
        required: true
    }
})