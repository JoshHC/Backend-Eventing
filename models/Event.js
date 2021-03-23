import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    inicio: {
        type: String,
        required: true
    },
    fin: {
        type: String,
        required: true
    },
    boletos: {
        type: String,
        required: true
    },
    fotografia: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    }
})

export default mongoose.model('Event', EventSchema);

