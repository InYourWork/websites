export function getValue(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}
export function expandPages(content, registry) {
  return registry.flatMap((definition) => {
    const records = definition.collection
      ? getValue(content, definition.collection)
      : [null];
    if (!Array.isArray(records))
      throw new Error(`Invalid collection: ${definition.collection}`);
    return records.map((record) => {
      const title = getValue(record ?? content, definition.title);
      const description = definition.description
        ? getValue(record ?? content, definition.description)
        : content.meta.description;
      if (typeof title !== "string" || typeof description !== "string")
        throw new Error(`Missing page metadata: ${definition.id}`);
      return {
        page: definition.id,
        id: record?.id ?? "",
        title:
          definition.id === "home" ? title : `${title} | ${content.meta.title}`,
        description,
      };
    });
  });
}
