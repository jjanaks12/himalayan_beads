import { ref } from 'vue';

function useFileStorage() {
  const files = ref([]);
  const serializeFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a;
        files.value.push({
          ...file,
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          content: (_a = e.target) == null ? void 0 : _a.result
        });
        resolve();
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleFileInput = async (event) => {
    files.value.splice(0);
    const promises = [];
    for (const file of event.target.files) {
      promises.push(serializeFile(file));
    }
    await Promise.all(promises);
  };
  return {
    files,
    handleFileInput
  };
}

export { useFileStorage as u };
//# sourceMappingURL=useFileStorage-CqYlcvQI.mjs.map
