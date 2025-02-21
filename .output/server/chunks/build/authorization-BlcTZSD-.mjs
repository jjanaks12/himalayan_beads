import { b as useAuth } from './server.mjs';
import { computed } from 'vue';

const useAuthorization = () => {
  const { data } = useAuth();
  const permissions = computed(() => {
    var _a;
    return ((_a = data.value) == null ? void 0 : _a.user).role.permissions.map((permission) => permission.name);
  });
  const can = (permission, role = null) => {
    var _a;
    if (role != null)
      return role == ((_a = data.value) == null ? void 0 : _a.user).role.name;
    if (Array.isArray(permission)) {
      let isTrue = false;
      for (const p of permission) {
        isTrue = isTrue || checkPermission(p);
      }
      return isTrue;
    } else {
      return checkPermission(permission);
    }
  };
  const checkPermission = (permission) => {
    const [access, resource] = permission.split("_");
    return access === "*" ? true : access === "manage" ? permissions.value.filter((permission2) => permission2.includes(resource)).length === 4 : permissions.value.includes(permission);
  };
  return { can };
};

export { useAuthorization as u };
//# sourceMappingURL=authorization-BlcTZSD-.mjs.map
