export function filterProducts(items, category = "", query = "") {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(
    (item) =>
      (!category || item.category === category) &&
      `${item.name} ${item.category} ${item.imageAlt} ${item.summary} ${item.detail} ${item.highlights.join(" ")}`
        .toLocaleLowerCase()
        .includes(term),
  );
}
export function validateBusiness(business) {
  if (
    business.email !== null &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email)
  )
    throw new Error("Invalid contact email");
}

export function enquiryHref(email, productName = "") {
  if (!email) return "#contact";
  const recipient = encodeURIComponent(email).replace(/%40/g, "@");
  const subject = productName
    ? `?subject=${encodeURIComponent(productName)}`
    : "";
  return `mailto:${recipient}${subject}`;
}
