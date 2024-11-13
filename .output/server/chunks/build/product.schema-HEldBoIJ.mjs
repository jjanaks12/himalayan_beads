import * as Yup from 'yup';

const productSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  category_id: Yup.string().required().label("Category")
});
const productPriceSchema = Yup.object().shape({
  amount: Yup.number().required().label("Amount"),
  product_id: Yup.string().required().label("Product")
});

export { productSchema as a, productPriceSchema as p };
//# sourceMappingURL=product.schema-HEldBoIJ.mjs.map
