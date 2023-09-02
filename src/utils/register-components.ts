const components = import.meta.glob("../components/**/*.ts");

for (const path in components) {
  components[path]();
}
