import { c as createError } from '../runtime.mjs';
import { g as getServerSession } from './nuxtAuthHandler.mjs';

const authCheck = async (event) => {
  const session = await getServerSession(event);
  if (!session)
    throw createError({
      statusMessage: "Unauthenticated",
      statusCode: 403
    });
};

export { authCheck as a };
//# sourceMappingURL=authCheck.mjs.map
