import * as Yup from 'yup';

const permissionSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description")
});
const roleSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  permissions: Yup.array().of(Yup.string()).min(1).required().label("Permission")
});

export { permissionSchema as p, roleSchema as r };
//# sourceMappingURL=settings.schema-EnYZLrMs.mjs.map
