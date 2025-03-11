import Joi from "joi";

const authSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .strip(),
});

const userSchema = Joi.object({
  firstname: Joi.string().min(3).max(100).required(),
  name: Joi.string().min(3).max(100).required(),
  mail: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .strip(),
  role: Joi.string().valid("benevole", "association"),
});
// le .strip permet de ne pas faire apparaitre le mot de passe quand on utilise le schéma

const associationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(null, "").max(500),
});

const missionSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(null, "").max(500),
  idAssociation: Joi.guid().required(),
});

const candidatureSchema = Joi.object({
  idMission: Joi.guid().required(),
});

export {
  authSchema,
  userSchema,
  associationSchema,
  missionSchema,
  candidatureSchema,
};
