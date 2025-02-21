import { d as defineStore } from './server.mjs';
import { ref } from 'vue';

const usePermissionStore = defineStore("permission", () => {
  const permissionList = ref([]);
  const fetch = () => {
    $fetch("/api/permission", {
      method: "GET"
    }).then((response) => {
      if (response.status == "success")
        permissionList.value = response.data;
    });
  };
  return { permissionList, fetch };
});

export { usePermissionStore as u };
//# sourceMappingURL=permission-BOmgRbhH.mjs.map
