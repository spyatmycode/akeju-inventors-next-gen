import { Joi, Segments } from "celebrate";


export default {

    addTask:{
        [Segments.BODY]:{
            title: Joi.string().required(),
            description: Joi.string().required()
        }
    },

    getTask:{
        [Segments.PARAMS]:{
            id: Joi.string().required()
        }
    }

}