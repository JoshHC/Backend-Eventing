import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    id: {
        type: String
    },
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    inicio: {
        type: String
    },
    fin: {
        type: String
    },
    boletos: {
        type: String
    },
    fotografia: {
        type: String
    },
    ubicacion: {
        type: String
    }
})

export default mongoose.model('Event', EventSchema);

